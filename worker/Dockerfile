FROM python:3.12-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Install system dependencies (curl, ffmpeg, nodejs, bun)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ffmpeg \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY server/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY server ./server
COPY worker ./worker
COPY apps/video-engine ./apps/video-engine
COPY storage ./storage

CMD ["python", "-m", "worker.main"]
