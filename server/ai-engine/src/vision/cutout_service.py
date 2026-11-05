import asyncio
import io
from rembg import remove, new_session
from server.ai_engine.src.core.config import ai_settings
from server.ai_engine.src.domain.interfaces.vision_processor import (
    CutoutResult,
    IVisionProcessor,
)
from server.ai_engine.src.vision.image_utils import (
    feather_alpha_edges,
    load_image_from_bytes,
    normalize_contrast_and_center,
    save_image_to_png_bytes,
)


class CutoutProcessor(IVisionProcessor):
    """Computer Vision background removal processor using local rembg ONNX models."""

    def __init__(self, model_name: str | None = None) -> None:
        self.model_name = model_name or ai_settings.REMBG_MODEL
        self._session = None

    def _get_session(self):
        if self._session is None:
            self._session = new_session(self.model_name)
        return self._session

    def _sync_remove_background(self, input_bytes: bytes) -> bytes:
        """Synchronous CPU/GPU rembg execution."""
        session = self._get_session()
        # Remove background using rembg
        output_bytes = remove(
            input_bytes,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=5,
        )
        # Soften alpha edges
        img = load_image_from_bytes(output_bytes)
        feathered = feather_alpha_edges(img, radius=1)
        return save_image_to_png_bytes(feathered)

    async def remove_background(self, input_bytes: bytes) -> CutoutResult:
        """Asynchronously isolate foreground object from image bytes."""
        try:
            output_bytes = await asyncio.to_thread(
                self._sync_remove_background, input_bytes
            )
            return CutoutResult(
                success=True,
                image_bytes=output_bytes,
                format="Transparent PNG",
                is_transparent=True,
            )
        except Exception as e:
            return CutoutResult(
                success=False,
                image_bytes=input_bytes,
                format="Original",
                is_transparent=False,
                error=str(e),
            )

    async def normalize_product_image(
        self, input_bytes: bytes, target_size: tuple[int, int] = (2048, 2048)
    ) -> bytes:
        """Center and normalize product on transparent canvas."""
        def _process():
            img = load_image_from_bytes(input_bytes)
            normalized = normalize_contrast_and_center(img, target_size=target_size)
            return save_image_to_png_bytes(normalized)

        return await asyncio.to_thread(_process)
