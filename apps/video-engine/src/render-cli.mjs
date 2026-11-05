import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

async function main() {
  const args = process.argv.slice(2);
  let propsFile = null;
  let outputFile = "out/trailer.mp4";
  let compId = "MainTrailer";

  for (const arg of args) {
    if (arg.startsWith("--props=")) propsFile = arg.split("=")[1];
    if (arg.startsWith("--out=")) outputFile = arg.split("=")[1];
    if (arg.startsWith("--composition=")) compId = arg.split("=")[1];
  }

  let inputProps = {};
  if (propsFile && fs.existsSync(propsFile)) {
    inputProps = JSON.parse(fs.readFileSync(propsFile, "utf-8"));
  }

  const entryPoint = path.resolve(import.meta.dirname, "index.ts");
  console.log(`[Remotion Renderer] Bundling entry point: ${entryPoint}`);
  const bundleLocation = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });

  console.log(`[Remotion Renderer] Selecting composition: ${compId}`);
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compId,
    inputProps,
  });

  const resolvedOutput = path.resolve(outputFile);
  fs.mkdirSync(path.dirname(resolvedOutput), { recursive: true });

  console.log(`[Remotion Renderer] Rendering to: ${resolvedOutput}`);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: resolvedOutput,
    inputProps,
    onProgress: ({ progress }) => {
      process.stdout.write(`\r[Rendering] ${(progress * 100).toFixed(1)}%`);
    },
  });

  console.log(`\n[Remotion Renderer] Finished render successfully.`);
}

main().catch((err) => {
  console.error("\n[Remotion Renderer Error]:", err);
  process.exit(1);
});
