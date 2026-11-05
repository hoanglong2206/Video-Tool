# ENVIRONMENT VARIABLES REFERENCE

> **Document Version:** 1.0.0  
> **Status:** Specification Complete / Greenfield Repository  
> **Parent Context:** [SYSTEM_ARCHITECTURE.md](../architecture/SYSTEM_ARCHITECTURE.md) | [LOCAL_SETUP.md](LOCAL_SETUP.md)

---

## 1. Overview & Configuration Strategy

The **AI Motion Studio** adheres to the [Twelve-Factor App](https://12factor.net/config) methodology for configuration management. All operational behaviors, secrets, service endpoints, and resource paths are managed via environment variables.

### 1.1 Configuration Files
* **`.env.example`**: Tracked in git; contains safe default development values and documentation.
* **`.env`**: Local workstation overrides; strictly ignored in `.gitignore`.
* **`.env.test`**: Test execution parameters used by pytest and bun test suites.

---

## 2. Global Application & Security Variables

| Variable Name | Type | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `APP_ENV` | `string` | No | `development` | Deployment environment: `development`, `staging`, `production`, `test`. |
| `DEBUG` | `boolean` | No | `true` | Enables verbose stack traces and reload mode in development. |
| `LOG_LEVEL` | `string` | No | `INFO` | Logging severity threshold: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`. |
| `SECRET_KEY` | `string` | **Yes (Prod)**| `dev-secret-change-in-production-32bytes` | Cryptographic secret for signing session tokens and internal payloads. |
| `ALLOWED_ORIGINS` | `string` | No | `http://localhost:3000,http://localhost:8000` | Comma-separated list of allowed CORS origins for FastAPI. |

---

## 3. Database Configuration (PostgreSQL & SQLAlchemy)

| Variable Name | Type | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `DATABASE_URL` | `string` | **Yes** | `postgresql+asyncpg://postgres:postgres@localhost:5432/video_ai` | Primary async connection URI for SQLAlchemy 2.0. |
| `POSTGRES_USER` | `string` | No | `postgres` | Superuser username for local Docker PostgreSQL. |
| `POSTGRES_PASSWORD` | `string` | No | `postgres` | Password for local Docker PostgreSQL. |
| `POSTGRES_DB` | `string` | No | `video_ai` | Target relational database name. |
| `POSTGRES_HOST` | `string` | No | `localhost` | Database network host address. |
| `POSTGRES_PORT` | `integer`| No | `5432` | Database TCP listener port. |
| `POSTGRES_POOL_SIZE` | `integer`| No | `10` | Maximum number of persistent connections in the async pool. |
| `POSTGRES_MAX_OVERFLOW`| `integer`| No | `20` | Allowed temporary overflow connections during spike traffic. |

---

## 4. Cache & Session Store (Valkey)

| Variable Name | Type | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `VALKEY_URL` | `string` | **Yes** | `valkey://localhost:6379/0` | Primary connection URI for Valkey (compatible with Redis protocol). |
| `VALKEY_HOST` | `string` | No | `localhost` | Valkey network host address. |
| `VALKEY_PORT` | `integer`| No | `6379` | Valkey TCP listener port. |
| `VALKEY_PASSWORD` | `string` | No | *(empty)* | Optional authentication password for Valkey. |
| `VALKEY_DB` | `integer`| No | `0` | Logical database index (0–15). |

---

## 5. Workflow Orchestration (Temporal)

| Variable Name | Type | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `TEMPORAL_HOST` | `string` | **Yes** | `localhost:7233` | Host and gRPC port for the Temporal Cluster. |
| `TEMPORAL_NAMESPACE` | `string` | No | `default` | Multi-tenancy namespace in Temporal. |
| `TEMPORAL_TASK_QUEUE` | `string` | No | `video-production-queue` | Target task queue polled by the worker daemon. |
| `TEMPORAL_TLS_ENABLED`| `boolean`| No | `false` | Enables mTLS connection when connecting to Temporal Cloud. |
| `TEMPORAL_CERT_PATH` | `string` | No | *(empty)* | Path to client certificate file (for Temporal Cloud mTLS). |
| `TEMPORAL_KEY_PATH` | `string` | No | *(empty)* | Path to client private key file (for Temporal Cloud mTLS). |

---

## 6. Media & Asset Storage (Local / S3 Provider)

| Variable Name | Type | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `STORAGE_TYPE` | `string` | No | `local` | Storage provider adapter: `local` or `s3`. |
| `LOCAL_STORAGE_DIR` | `string` | No | `./storage/projects` | Absolute or relative path for local asset persistence. |
| `S3_ENDPOINT_URL` | `string` | No | *(empty)* | Custom S3 endpoint URL (for MinIO or Cloudflare R2). |
| `S3_BUCKET_NAME` | `string` | If S3 | `motion-studio-assets` | Target bucket name for video and asset storage. |
| `S3_ACCESS_KEY_ID` | `string` | If S3 | *(empty)* | S3 / MinIO access credential. |
| `S3_SECRET_ACCESS_KEY`| `string` | If S3 | *(empty)* | S3 / MinIO secret credential. |
| `S3_REGION` | `string` | No | `us-east-1` | AWS S3 region designation. |
| `S3_USE_SSL` | `boolean`| No | `true` | Enforces HTTPS communication with S3 endpoints. |

---

## 7. AI Engines & Provider Adapters

| Variable Name | Type | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `AI_PROVIDER` | `string` | No | `local` | Active AI provider adapter: `local` (Ollama/ComfyUI) or `cloud`. |
| `OLLAMA_BASE_URL` | `string` | No | `http://localhost:11434` | Network endpoint for local Ollama instance. |
| `OLLAMA_MODEL` | `string` | No | `llama3:8b` | Default LLM model name used for brief analysis & scene planning. |
| `COMFYUI_BASE_URL` | `string` | No | `http://localhost:8188` | Network endpoint for local ComfyUI API. |
| `OPENAI_API_KEY` | `string` | If Cloud| *(empty)* | OpenAI API key (used if `AI_PROVIDER=cloud` or hybrid fallback). |
| `ANTHROPIC_API_KEY` | `string` | No | *(empty)* | Anthropic API key for Claude 3.5 Sonnet storyboard generation. |

---

## 8. 3D & Media Rendering Engines

| Variable Name | Type | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `BLENDER_PATH` | `string` | No | `blender` | Path to Blender 4.x executable binary on the host machine. |
| `FFMPEG_PATH` | `string` | No | `ffmpeg` | Path to FFmpeg executable binary. |
| `FFPROBE_PATH` | `string` | No | `ffprobe` | Path to FFprobe multimedia stream analyzer. |
| `NVENC_ENABLED` | `boolean`| No | `true` | Enables NVIDIA hardware encoding (`h264_nvenc`). Set `false` for CPU fallback. |
| `GPU_CONCURRENCY_LIMIT`| `integer`| No | `1` | Maximum parallel GPU-intensive tasks per worker to avoid CUDA OOM. |
| `REMOTION_OUTPUT_DIR` | `string` | No | `./storage/renders` | Working directory for Remotion bundle artifacts and frame sequences. |

---

## 9. Frontend Studio (`apps/web`)

| Variable Name | Type | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `string` | **Yes** | `http://localhost:8000` | Backend API base URL accessible by browser clients. |
| `NEXT_PUBLIC_WS_URL` | `string` | **Yes** | `ws://localhost:8000/ws` | WebSocket URL for real-time progress and approval events. |
| `NEXT_PUBLIC_TEMPORAL_WEB_URL`| `string` | No | `http://localhost:8233` | Link to the Temporal Web UI dashboard for workflow debugging. |

---

## 10. Security & Secret Hygiene

1. **Never Commit Secrets:** `.env` files containing production passwords, AWS keys, or AI tokens must never be staged or committed to git.
2. **Secret Rotation:** API keys and database credentials should be rotatable without requiring source code modifications.
3. **Production Validation:** On startup in `APP_ENV=production`, FastAPI raises an immediate fatal configuration error if `SECRET_KEY` matches the default placeholder.

---

## 11. Cross-Document Sitemap

* **System Architecture:** [SYSTEM_ARCHITECTURE.md](../architecture/SYSTEM_ARCHITECTURE.md)
* **Local Setup Guide:** [LOCAL_SETUP.md](LOCAL_SETUP.md)
* **Testing Strategy:** [TESTING_STRATEGY.md](TESTING_STRATEGY.md)
* **Coding Standards:** [CODING_STANDARDS.md](CODING_STANDARDS.md)
* **Master Specification:** [PROJECT.md](../../PROJECT.md)
