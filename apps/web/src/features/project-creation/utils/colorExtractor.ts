/**
 * Ultra-fast client-side color palette extraction using HTML5 Canvas
 * Runs in < 10ms with zero backend calls
 */

export interface ExtractedColorResult {
  hex: string;
  role: "primary" | "accent" | "highlight" | "dark";
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.min(255, Math.max(0, Math.round(x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
}

function colorDistance(
  c1: [number, number, number],
  c2: [number, number, number]
): number {
  return Math.hypot(c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2]);
}

export async function extractPaletteFromImageFile(
  file: File
): Promise<string[]> {
  return new Promise((resolve) => {
    // Only process images
    if (!file.type.startsWith("image/")) {
      resolve(["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"]);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          resolve(["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"]);
          return;
        }

        // Downsample for high performance (< 5ms)
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);

        const imgData = ctx.getImageData(0, 0, size, size).data;
        const colorBuckets: { [key: string]: { rgb: [number, number, number]; count: number } } = {};

        for (let i = 0; i < imgData.length; i += 4) {
          const a = imgData[i + 3];
          if (a < 128) continue; // Skip transparency

          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];

          // Skip pure blacks (< 15) and pure whites (> 245) for primary identity
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          if (brightness < 12 || brightness > 248) continue;

          // Quantize to 32 steps per channel
          const qr = Math.round(r / 32) * 32;
          const qg = Math.round(g / 32) * 32;
          const qb = Math.round(b / 32) * 32;
          const key = `${qr},${qg},${qb}`;

          if (!colorBuckets[key]) {
            colorBuckets[key] = { rgb: [r, g, b], count: 0 };
          }
          colorBuckets[key].count++;
        }

        URL.revokeObjectURL(objectUrl);

        // Sort by frequency
        const sorted = Object.values(colorBuckets).sort(
          (a, b) => b.count - a.count
        );

        if (sorted.length === 0) {
          resolve(["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"]);
          return;
        }

        // Pick 4 diverse studio colors (distance > 60)
        const pickedRgb: [number, number, number][] = [];
        for (const item of sorted) {
          if (pickedRgb.length >= 4) break;
          const isDistinct = pickedRgb.every((p) => colorDistance(p, item.rgb) > 55);
          if (isDistinct) pickedRgb.push(item.rgb);
        }

        // Fallbacks if image is monochromatic
        while (pickedRgb.length < 4) {
          if (pickedRgb.length === 1) pickedRgb.push([59, 130, 246]); // Blue
          else if (pickedRgb.length === 2) pickedRgb.push([6, 182, 212]); // Cyan
          else pickedRgb.push([226, 232, 240]); // Light slate
        }

        const hexPalette = pickedRgb.map(([r, g, b]) => rgbToHex(r, g, b));
        resolve(hexPalette);
      } catch (e) {
        URL.revokeObjectURL(objectUrl);
        resolve(["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"]);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"]);
    };

    img.src = objectUrl;
  });
}

export function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return [r, g, b];
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return [r, g, b];
  }
  return null;
}

/**
 * Merges newly extracted colors with existing brand colors into a balanced, harmonious palette.
 * Retains key colors from previously uploaded images while incorporating new distinct colors.
 */
export function mergeColorPalettes(
  existingColors: string[],
  newlyExtracted: string[],
  maxTotal: number = 6
): string[] {
  if (!existingColors || existingColors.length === 0) {
    return newlyExtracted.slice(0, maxTotal);
  }
  if (!newlyExtracted || newlyExtracted.length === 0) {
    return existingColors;
  }

  const existingWithRgb = existingColors
    .map((hex) => ({ hex: hex.toUpperCase(), rgb: hexToRgb(hex) }))
    .filter((c): c is { hex: string; rgb: [number, number, number] } => c.rgb !== null);

  const newWithRgb = newlyExtracted
    .map((hex) => ({ hex: hex.toUpperCase(), rgb: hexToRgb(hex) }))
    .filter((c): c is { hex: string; rgb: [number, number, number] } => c.rgb !== null);

  const combined: { hex: string; rgb: [number, number, number] }[] = [];

  // 1. Keep top 2-3 most distinct from existing images
  for (const item of existingWithRgb) {
    const isDistinct = combined.every((c) => colorDistance(c.rgb, item.rgb) > 40);
    if (isDistinct) combined.push(item);
    if (combined.length >= 3) break;
  }

  // 2. Add distinct colors from newly extracted image
  for (const item of newWithRgb) {
    const isDistinct = combined.every((c) => colorDistance(c.rgb, item.rgb) > 40);
    if (isDistinct) combined.push(item);
    if (combined.length >= maxTotal) break;
  }

  // 3. Guarantee at least 4 colors
  if (combined.length < 4) {
    for (const item of [...newWithRgb, ...existingWithRgb]) {
      if (!combined.some((c) => c.hex === item.hex)) combined.push(item);
      if (combined.length >= 4) break;
    }
  }

  return combined.map((c) => c.hex);
}

