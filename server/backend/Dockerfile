FROM python:3.12-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Install system dependencies (curl, ffmpeg)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY server/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend and ai-engine modules
COPY server ./server
COPY storage ./storage

EXPOSE 8000

CMD ["uvicorn", "server.backend.src.main:app", "--host", "0.0.0.0", "--port", "8000"]
