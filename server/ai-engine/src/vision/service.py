from server.ai_engine.src.domain.interfaces.vision_processor import (
    CutoutResult,
    IVisionProcessor,
)
from server.ai_engine.src.vision.cutout_service import CutoutProcessor


class VisionProcessingService:
    """High-level vision orchestration service."""

    def __init__(self, processor: IVisionProcessor | None = None) -> None:
        self.processor = processor or CutoutProcessor()

    async def isolate_product(self, raw_bytes: bytes) -> CutoutResult:
        """Run transparent background isolation on product photo."""
        return await self.processor.remove_background(raw_bytes)

    async def standardize_asset(
        self, transparent_bytes: bytes, target_size: tuple[int, int] = (2048, 2048)
    ) -> bytes:
        """Center and normalize product on transparent canvas."""
        return await self.processor.normalize_product_image(
            transparent_bytes, target_size=target_size
        )


vision_service = VisionProcessingService()
