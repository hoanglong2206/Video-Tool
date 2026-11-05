# AI CODING INSTRUCTIONS & REPOSITORY CONVENTIONS

> **Document Version:** 3.1.0  
> **Target Audience:** AI Coding Assistants (Claude, Antigravity, GitHub Copilot), Software Engineers  
> **Architecture Baseline:** Next.js (TypeScript), FastAPI (Python 3.11+, Pydantic v2), Temporal, PostgreSQL, Valkey, Blender 4.x, Remotion, FFmpeg  
> **Parent Context:** [PROJECT.md](PROJECT.md) | [SYSTEM_ARCHITECTURE.md](docs/architecture/SYSTEM_ARCHITECTURE.md)

---

## 1. Golden Directives for AI Agents

1. **Honesty Regarding Implementation Status:**
   Never state or assume that an unwritten API route, database table, UI view, or worker activity is implemented. The repository is currently in a **greenfield architectural scaffolding** state with directory scaffolds (`apps/web`, `apps/video-engine`, `server/backend`, `server/ai-engine`, `worker`). Treat the codebase on disk as the sole source of truth.
2. **Process Separation Discipline:**
   Do not collapse workloads into a monolithic process.
   * `apps/web`: Pure frontend presentation, WebGL preview, and user state.
   * `server/backend`: Lightweight API gateway, database operations, Alembic migrations, and Temporal workflow client.
   * `server/ai-engine`: Dedicated AI inference abstractions (Ollama LLM client, ComfyUI diffusion wrappers, OpenCV/Pillow image processing).
   * `worker`: Long-running Temporal workflows and activities coordinating calls to `server/ai-engine`, Blender, and FFmpeg.
   * `apps/video-engine`: Remotion compositions and GSAP motion definitions.
3. **Strict Adherence to Technology Choices:**
   Do not introduce alternative or competing frameworks (e.g., do not replace Temporal with Celery, do not replace Valkey/PostgreSQL with ad-hoc flat files, do not replace FastAPI with Flask).
4. **Strict File Length Budget (Max 200–300 Lines):**
   Monolithic files are strictly forbidden. All source files must target $\le 200$ lines with an absolute hard ceiling of **300 lines**. Proactively decompose files into sub-components, custom hooks, or utility modules.
5. **Human-in-the-Loop Workflow Primacy:**
   Production pipelines orchestrated in `worker` must implement Temporal approval signals at critical stages (Storyboard, Assets, Final Master). Never bypass approval gates in production workflows.
6. **Provider Adapter Pattern:**
   External AI models and storage systems must be consumed through abstract interfaces (`IAIProvider`, `IStorageService`) to guarantee zero friction between local and cloud runtimes.

---

## 2. Monorepo Structure & Architectural Boundaries

```text
video-ai-demo/
├── apps/
│   ├── web/                     # Next.js 15+ frontend (TypeScript, Tailwind, shadcn/ui, Remotion Player)
│   └── video-engine/            # Remotion video motion compositions, GSAP springs, WebGL compositions
├── server/
│   ├── backend/                 # FastAPI API Gateway (Pydantic v2, SQLAlchemy 2.0 Async, Alembic, Temporal client)
│   └── ai-engine/               # AI Engine services (Ollama LLM adapter, ComfyUI diffusion, OpenCV/Pillow)
├── worker/                      # Temporal Worker Daemon (Workflows, Activities, Blender CLI, FFmpeg NVENC)
├── packages/                    # Shared contracts, DTO schemas, and helper utilities
├── scripts/                     # Operational, testing, and deployment automation scripts
├── UI Design/                   # 11 Production UI screen specifications & visual studio mockups
├── docs/                        # Architectural, API, and development documentation
├── docker-compose.infra.yml     # Local supporting infrastructure (PostgreSQL, Valkey, Temporal)
├── .env.example                 # Standardized environment configuration template
├── CLAUDE.md                    # Project-level AI coding guidelines (this document)
├── PROJECT.md                   # Master product specification
└── README.md                    # Repository overview & quickstart guide
```

---

## 3. Coding Standards & Conventions

### 3.1 Python Standards (`server/backend`, `server/ai-engine`, `worker`)
* **Python Runtime:** Python 3.11+ using native type hints (`list[str]`, `dict[str, Any]`, `T | None`).
* **Clean Architecture in `server/backend`:** Keep domain entities completely pure (zero framework imports). Routers call Application Use Cases; Use Cases interface with repositories and Temporal clients via abstract ports.
* **AI Abstraction in `server/ai-engine`:** Encapsulate all prompt construction, ComfyUI node graphs, and OpenCV image filters in clean service classes implementing abstract provider interfaces.
* **Database Access:** Always use asynchronous SQLAlchemy 2.0 (`asyncpg`). Manage all schema mutations through Alembic migration scripts in `server/backend/alembic/versions/`.
* **Subprocess Security:** When invoking Blender (`bpy`) or FFmpeg via subprocesses in worker activities:
  * Never pass raw un-sanitized user strings into `shell=True`.
  * Always use list-based arguments: `subprocess.run(["blender", "-b", "-P", script_path, "--", ...], check=True)`.
  * Guard all file system paths against directory traversal (`Path(file_path).resolve()`).

### 3.2 TypeScript & Next.js Standards (`apps/web`, `apps/video-engine`)
* **Strict Typing:** `"strict": true`, `"noImplicitAny": true`. Zero use of `any`.
* **Feature-Sliced Architecture:** Organize all UI features under `apps/web/src/features/<feature-name>/`:
  * `<FeatureName>.tsx`: Container component only wiring hooks to layouts ($\le 150$ lines).
  * `index.ts`: Public API export.
  * `hooks/`: Isolated business logic and state hooks.
  * `components/`: Modular presentation components ($\le 200$ lines).
* **Zustand Selectors:** Never destructure entire stores. Use atomic selectors (`useTimelineStore(s => s.currentFrame)`) to maintain 60fps playback performance.
* **UI Design Fidelity:** Align component structures with the 11 design blueprints in `UI Design/` (Dashboard, Storyboard Studio, Asset Studio, 3D Scene Studio, Scene & Motion Editor, Approval Center, Render & Export Center).

---

## 4. Testing Requirements for Generated Code

Whenever creating or updating codebase features, follow these testing rules:
1. **Unit Tests (Pytest / Bun Test):**
   * Every new domain entity or use case must have accompanying unit tests in `server/backend/tests/unit/`, `server/ai-engine/tests/unit/`, or `worker/tests/unit/`.
   * Unit tests must run fast ($< 5\text{s}$) with zero external network or database calls.
2. **Temporal Workflow Tests:**
   * Test workflow choreography and approval signals using `temporalio.testing.WorkflowEnvironment.start_time_skipping()`.
   * Test both approval and rejection-with-feedback code paths.
3. **Render Determinism Verification:**
   * Any change to Scene DSL compilers or shader logic must pass the OpenCV SSIM verification test ($\text{SSIM} \ge 0.999$).
4. **No Live External AI Calls in CI:**
   * Always use mocked adapter fixtures for Ollama and ComfyUI in automated tests to prevent GPU resource contention and test flakiness.

---

## 5. Security & Hygiene Rules

1. **Zero Secret Leakage:**
   * Never hardcode API keys, database passwords, or JWT secrets. Always read from environment variables via Pydantic Settings (`server/backend/src/core/config.py`).
2. **Local Storage Sandboxing:**
   * Media assets must be written exclusively within designated directories (`storage/projects/{project_id}/...`).
   * Validate that all user-supplied filenames are sanitized and do not contain relative traversal paths (`../`).
3. **Resource Guardrails:**
   * Guard GPU-intensive activity execution with concurrency semaphores to prevent CUDA Out-Of-Memory system crashes.

---

## 6. Rules for Modifying Existing Code & Documentation

1. **Preserve Documentation Integrity:**
   * When modifying existing files, preserve all unrelated comments, docstrings, and license headers.
   * If an architectural decision changes, update all cross-referenced documents simultaneously.
2. **Avoid Overengineering & Premature Abstraction:**
   * Do not introduce micro-libraries, extra RPC protocols, or bespoke state machines when standard tools (FastAPI, Pydantic, SQLAlchemy, Temporal, Zustand) natively solve the problem.
3. **Maintain Valid Relative Links:**
   * All markdown links must be valid relative paths (e.g. `[SYSTEM_ARCHITECTURE.md](docs/architecture/SYSTEM_ARCHITECTURE.md)`).

---

## 7. Essential Development Commands Quick Reference

```bash
# Start local infrastructure dependencies (Postgres, Valkey, Temporal)
docker compose -f docker-compose.infra.yml up -d

# Backend API server (FastAPI in server/backend)
cd server/backend && uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

# Run Alembic migrations
cd server/backend && alembic upgrade head

# Run Temporal worker daemon
cd worker && python -m src.main

# Frontend studio (Next.js)
cd apps/web && bun run dev

# Standalone Remotion motion preview
cd apps/video-engine && bun run preview

# Run backend & worker test suites
pytest server/backend/tests server/ai-engine/tests worker/tests -v
```

---

## 8. Cross-Document Architecture Sitemap

* **Master Specification:** [PROJECT.md](PROJECT.md)
* **System Architecture & Data Flow:** [SYSTEM_ARCHITECTURE.md](docs/architecture/SYSTEM_ARCHITECTURE.md)
* **Technology Stack & Rationale:** [TECH_STACK.md](docs/architecture/TECH_STACK.md)
* **Coding Standards & Limits:** [CODING_STANDARDS.md](docs/development/CODING_STANDARDS.md)
* **Local Setup Guide:** [LOCAL_SETUP.md](docs/development/LOCAL_SETUP.md)
* **Environment Variables Reference:** [ENVIRONMENT_VARIABLES.md](docs/development/ENVIRONMENT_VARIABLES.md)
* **Testing Strategy:** [TESTING_STRATEGY.md](docs/development/TESTING_STRATEGY.md)
* **Repository Readme:** [README.md](README.md)
