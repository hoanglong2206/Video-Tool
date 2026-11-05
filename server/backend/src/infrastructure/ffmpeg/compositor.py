import asyncio
import os
import subprocess
from pathlib import Path
from server.backend.src.infrastructure.ffmpeg.binary_locator import get_ffmpeg_binary

class FFmpegCompositor:
    """Production-grade FFmpeg compositor for multi-scene stitching and master delivery."""

    def __init__(self) -> None:
        self.ffmpeg_bin = get_ffmpeg_binary()

    async def detect_nvenc(self) -> bool:
        """Check if NVIDIA NVENC hardware acceleration is supported by the current GPU."""
        try:
            proc = await asyncio.create_subprocess_exec(
                self.ffmpeg_bin, "-encoders",
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            stdout, _ = await proc.communicate()
            return b"h264_nvenc" in stdout
        except Exception:
            return False

    async def create_scene_clip(
        self,
        output_path: Path,
        duration_seconds: float = 5.0,
        title: str = "Scene",
        color: str = "#0B0F17",
        width: int = 1920,
        height: int = 1080,
        fps: int = 60,
    ) -> bool:
        """Generate a broadcast-grade styled MP4 clip for a scene using FFmpeg procedural filters."""
        output_path.parent.mkdir(parents=True, exist_ok=True)
        escaped_title = title.replace(":", "\\:").replace("'", "\\'")
        
        # Draw elegant dark gradient with centered typographic headline
        filter_graph = (
            f"color=c={color}:s={width}x{height}:d={duration_seconds}:r={fps},"
            f"drawbox=y=ih-8:color=0x3B82F6@0.8:width=iw:height=8:t=fill,"
            f"drawtext=text='{escaped_title}':fontcolor=white:fontsize=52:x=(w-text_w)/2:y=(h-text_h)/2-30:font='Segoe UI':shadowcolor=black@0.6:shadowx=2:shadowy=2,"
            f"drawtext=text='AI MOTION STUDIO · 60 FPS':fontcolor=0x94A3B8:fontsize=22:x=(w-text_w)/2:y=(h-text_h)/2+40:font='Segoe UI'"
        )

        # Audio synth: subtle low ambient drone
        audio_filter = f"anoisesrc=d={duration_seconds}:c=pink:r=48000:a=0.01,lowpass=f=200,afade=t=in:ss=0:d=1,afade=t=out:st={duration_seconds - 1}:d=1"

        cmd = [
            self.ffmpeg_bin, "-y",
            "-f", "lavfi", "-i", filter_graph,
            "-f", "lavfi", "-i", audio_filter,
            "-c:v", "libx264", "-preset", "fast", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "192k",
            "-t", str(duration_seconds),
            str(output_path)
        ]

        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        _, stderr = await proc.communicate()
        if proc.returncode != 0:
            print(f"[FFmpeg error] {stderr.decode('utf-8', errors='ignore')}")
            return False
        return True

    async def concatenate_clips(
        self,
        clip_paths: list[Path],
        output_master_path: Path,
        use_nvenc: bool = False,
    ) -> bool:
        """Stitch multiple scene clips into a single master MP4 video."""
        output_master_path.parent.mkdir(parents=True, exist_ok=True)
        concat_txt = output_master_path.parent / "concat_list.txt"
        
        lines = [f"file '{clip.resolve().as_posix()}'" for clip in clip_paths]
        concat_txt.write_text("\n".join(lines), encoding="utf-8")

        vcodec = "h264_nvenc" if use_nvenc else "libx264"

        cmd = [
            self.ffmpeg_bin, "-y",
            "-f", "concat", "-safe", "0",
            "-i", str(concat_txt),
            "-c:v", vcodec, "-preset", "fast", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "256k",
            str(output_master_path)
        ]

        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        _, stderr = await proc.communicate()
        if concat_txt.exists():
            concat_txt.unlink()

        return proc.returncode == 0

ffmpeg_compositor = FFmpegCompositor()
