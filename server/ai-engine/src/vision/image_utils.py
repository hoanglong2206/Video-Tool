import io
from PIL import Image, ImageEnhance, ImageFilter


def load_image_from_bytes(data: bytes) -> Image.Image:
    """Load and return an RGBA PIL Image from bytes."""
    img = Image.open(io.BytesIO(data))
    return img.convert("RGBA")


def save_image_to_png_bytes(img: Image.Image) -> bytes:
    """Encode PIL Image into PNG bytes."""
    buf = io.BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return buf.getvalue()


def feather_alpha_edges(img: Image.Image, radius: int = 1) -> Image.Image:
    """Smooth out raw cutout edges to prevent harsh fringes on dark studio backdrops."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    r, g, b, a = img.split()
    blurred_a = a.filter(ImageFilter.GaussianBlur(radius=radius))
    return Image.merge("RGBA", (r, g, b, blurred_a))


def normalize_contrast_and_center(
    img: Image.Image, target_size: tuple[int, int] = (2048, 2048)
) -> Image.Image:
    """Crop to foreground bounding box, enhance contrast slightly, and pad onto target square canvas."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    # Get bounding box of non-zero alpha
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
    else:
        cropped = img

    # Fit into target_size with proportional scaling
    cropped.thumbnail((target_size[0] - 80, target_size[1] - 80), Image.Resampling.LANCZOS)

    # Slight contrast boost for Apple keynote crispness
    enhancer = ImageEnhance.Contrast(cropped)
    cropped = enhancer.enhance(1.05)

    # Create target transparent canvas and center product
    canvas = Image.new("RGBA", target_size, (0, 0, 0, 0))
    offset_x = (target_size[0] - cropped.width) // 2
    offset_y = (target_size[1] - cropped.height) // 2
    canvas.paste(cropped, (offset_x, offset_y), mask=cropped)

    return canvas
