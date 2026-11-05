import shutil
from pathlib import Path

def get_ffmpeg_binary() -> str:
    """Find system FFmpeg binary or fallback to imageio-ffmpeg bundled binary."""
    # 1. Check if ffmpeg is in PATH
    system_ffmpeg = shutil.which("ffmpeg")
    if system_ffmpeg:
        return system_ffmpeg

    # 2. Check bundled imageio_ffmpeg
    try:
        import imageio_ffmpeg
        exe = imageio_ffmpeg.get_ffmpeg_exe()
        if exe and Path(exe).exists():
            return exe
    except ImportError:
        pass

    raise RuntimeError("FFmpeg executable could not be found in PATH or imageio-ffmpeg package.")
