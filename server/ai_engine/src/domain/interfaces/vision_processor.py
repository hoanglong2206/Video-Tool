from abc import ABC, abstractmethod
from pydantic import BaseModel


class CutoutResult(BaseModel):
    success: bool
    image_bytes: bytes
    format: str = "PNG"
    is_transparent: bool = True
    error: str | None = None


class IVisionProcessor(ABC):
    """Abstract interface for computer vision, background isolation, and image normalization."""

    @abstractmethod
    async def remove_background(self, input_bytes: bytes) -> CutoutResult:
        """Isolate foreground product and generate transparent PNG cutout."""
        pass

    @abstractmethod
    async def normalize_product_image(
        self, input_bytes: bytes, target_size: tuple[int, int] = (2048, 2048)
    ) -> bytes:
        """Center product, normalize contrast, and crop to bounding canvas."""
        pass
