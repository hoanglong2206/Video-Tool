# AI Motion Studio (`video-ai-demo`)

> **Automated Cinematic Video Production Platform**  
> *Transforming Client Briefs & Product Imagery into Broadcast-Quality 4K60 Product Launch Trailers*

---

## 🌟 Executive Overview

**AI Motion Studio** is an open-source, local-first video production platform designed to automate end-to-end commercial video production for real client briefs. Inspired by the sleek, minimalist aesthetics of **Apple keynote announcements and hardware launch trailers**, the studio combines modern AI reasoning, local image diffusion, programmatic 3D raytracing, and code-driven motion design.

The platform streamlines what traditionally required a multidisciplinary agency team into an integrated, human-steered software pipeline:
* **Client Brief Analysis & Creative Direction:** Automated expansion of unstructured client requests, target audiences, and brand palettes into actionable creative concepts.
* **AI-Generated Storyboard & Scene Planning:** Intelligent generation of multi-scene plans, camera trajectories, typography copy, and visual timing.
* **Image Synthesis & Asset Processing:** Text-to-image and image-to-image product restyling via **ComfyUI** (Flux/SDXL), transparent cutouts via **OpenCV**, and color-curve matching with **Pillow**.
* **Scene Composition & Layer Management:** Declarative Scene DSL managing 3D models, raster cutouts, kinetic typography, and studio lighting rigs.
* **Organic Motion Design & Visual Effects:** Second-order physical spring physics ($F = -kx - c\dot{x}$), micro-staggered typography reveals, and camera parallax powered by **GSAP** and **Remotion**.
* **3D Production Using Blender:** Automated 3D scene staging, material physics (metallic, glass, anodized aluminum), and specular rim light sweeps executed via headless **Blender 4.x Python API (`bpy`)**, with real-time **Three.js** in-browser preview.
* **Sound Design & Audio Synchronization:** Beat-aligned scene transition cuts, multi-track audio sequencing, and automated voiceover ducking.
* **Hardware-Accelerated Video Rendering:** Compositing 3D and 2D passes and encoding master 4K60 MP4 deliverables using **FFmpeg** and **NVIDIA NVENC** (`h264_nvenc`).
* **Human-in-the-Loop (HITL) Governance:** Mandatory human review, editing, and approval gates at critical milestones (Storyboard, Assets, Final Master).

---

## 🏗️ Architecture & Core Principles

The platform is designed around three architectural pillars and one operational discipline:

```mermaid
graph TD
    subgraph Principles ["Architectural Principles"]
        LF["1. Local-First<br>Runs completely offline on local workstation / private GPU"]
        OS["2. Open-Source-First<br>Postgres, Valkey, Temporal, Ollama, ComfyUI, Blender, FFmpeg"]
        CR["3. Cloud-Ready<br>Provider Adapter Pattern for S3, Cloud LLMs, and distributed workers"]
    end

    subgraph ProcessSeparation ["Process Separation Model"]
        Web["apps/web<br>Next.js Studio UI & Remotion Player"]
        API["server/backend<br>FastAPI REST / WS Gateway & Postgres"]
        AIEngine["server/ai-engine<br>Ollama & ComfyUI Diffusion Services"]
        Orch["Temporal Cluster<br>Durable Workflow Orchestrator"]
        Worker["worker<br>Temporal Background Worker Daemon"]
        Engine["apps/video-engine<br>Remotion & GSAP Motion Engine"]
    end

    Web -->|HTTP / WS| API
    API -->|Workflow Trigger| Orch
    Orch -->|Dispatch Activities| Worker
    Worker -->|Inference / Vision| AIEngine
    Worker -->|Subprocess| Engine
    Worker -->|Subprocess| Blender["Blender 4.x CLI"]
    Worker -->|Subprocess| FFmpeg["FFmpeg NVENC"]
```

1. **Local-First:** Full end-to-end functionality on a single workstation without mandatory cloud accounts or subscription APIs.
2. **Open-Source-First:** Eliminates proprietary vendor lock-in by utilizing community-backed open-source engines (**Valkey** over Redis, **Blender** for 3D, **Ollama** and **ComfyUI** for AI, **Temporal** for orchestration).
3. **Cloud-Ready:** Standardized Provider Adapter interfaces allow instant migration to AWS S3, Cloudflare R2, cloud GPUs, and managed container clusters.
4. **Decoupled Process Separation:** Lightweight API handling (`server/backend`) is strictly separated from AI processing adapters (`server/ai-engine`), long-running Temporal workflows, background worker daemons (`worker`), and GPU-intensive rendering workloads (`apps/video-engine`).

---

## 📊 Implementation Status: Truth in Documentation

The repository is currently an **architecturally scaffolded greenfield project**. All documentation reflects the authoritative target implementation.

| Subsystem / Component | Technology Baseline | Current Repository Status | Path / Location |
| :--- | :--- | :--- | :--- |
| **Monorepo Structure** | Multi-workspace directory layout | **Scaffolded** | Root directory |
| **Frontend Studio** | Next.js 15+, Tailwind, shadcn/ui, Remotion | **Planned (Specification Complete)** | `apps/web/` |
| **Motion Engine** | Remotion v4, GSAP 3.12+, Three.js | **Planned (Specification Complete)** | `apps/video-engine/` |
| **Backend API Gateway** | FastAPI, Pydantic v2, SQLAlchemy 2.0, Alembic | **Scaffolded (Empty Directory)** | `server/backend/` |
| **AI Engine Services** | Ollama, ComfyUI, OpenCV, Pillow | **Scaffolded (Empty Directory)** | `server/ai-engine/` |
| **Worker Daemon** | Temporal Python Worker, Blender CLI, FFmpeg | **Scaffolded (Empty Directory)** | `worker/` |
| **UI Design System** | 11 High-Fidelity Studio Screen Mockups | **Reference Artifacts Present** | `UI Design/` |
| **Supporting Infra** | Docker Compose (PostgreSQL 16, Valkey 7, Temporal) | **Configured** | `docker-compose.infra.yml` |
| **Configuration** | Environment variable specification & template | **Configured** | `.env.example` |
| **Technical Documentation**| Complete architectural, development & testing guides | **Complete & Verified** | `docs/`, `PROJECT.md`, `CLAUDE.md` |

---

## 🗂️ Repository Structure

```text
video-ai-demo/
├── apps/
│   ├── web/                    # Next.js frontend (App Router, Tailwind, shadcn/ui, Remotion Player)
│   └── video-engine/           # Remotion video motion compositions, GSAP spring curves, shaders
├── server/
│   ├── backend/                # FastAPI backend (Pydantic v2, SQLAlchemy 2.0 Async, Alembic, Temporal client)
│   └── ai-engine/              # AI Engine services (Ollama LLM adapter, ComfyUI diffusion, OpenCV/Pillow)
├── worker/                     # Temporal worker daemon (Workflows, Activities, Blender CLI, FFmpeg NVENC)
├── packages/                   # Shared DTO contracts, Scene DSL schemas, and common utilities
├── scripts/                    # Automation, render testing, and environment setup scripts
├── UI Design/                  # 11 Production UI screen specifications & visual studio mockups
├── docs/
│   ├── architecture/           # System architecture, topology, and technology stack rationalizations
│   └── development/            # Coding standards, local setup, environment variables, testing strategy
├── docker-compose.infra.yml    # Docker Compose for PostgreSQL, Valkey, and Temporal Cluster
├── .env.example                # Canonical template for environment configurations
├── CLAUDE.md                   # AI agent instructions, coding constraints, and rules
├── PROJECT.md                  # Master product specification and workflow details
└── README.md                   # Repository overview & quickstart index (this document)
```

---

## 🎨 UI Design System & Studio Views (`UI Design/`)

The platform's frontend experience is grounded in 11 comprehensive UI mockups located in the `UI Design/` directory:

1. **Dashboard (`Dashboard.png`):** Studio overview, recent video projects, pipeline status, and performance metrics.
2. **Project Creation & Client Brief (`Project Creation & Client Brief.png`):** Client intake, USP input, aspect ratio, duration, and brand kit selection.
3. **Storyboard Studio (`Storyboard Studio.png`):** Multi-scene card matrix with visual pacing, camera prompts, and copy editing (HITL Gate 1).
4. **Asset Studio (`Asset Studio.png`):** AI image generation, prompt tuning, ComfyUI diffusion outputs, and transparent cutout controls (HITL Gate 2).
5. **Asset Library & Brand Kit (`Asset Library & Brand Kit.png`):** Reusable logos, product photos, 3D models, fonts, and brand color palettes.
6. **3D Scene Studio (`3D Scene Studio.png`):** WebGL/Three.js spatial viewport for inspecting 3D model orientation, materials, and camera paths.
7. **Scene & Motion Editor (`Scene & Motion Editor.png`):** Multi-track timeline, kinetic typography controls, and GSAP spring curves.
8. **Production Workflow (`Production Workflow.png`):** Visual trace of Temporal workflows, active activities, and execution logs.
9. **Approval Center (`Approval Center.png`):** Centralized Human-in-the-Loop review deck for side-by-side revision approvals.
10. **Render & Export Center (`Render & Export Center.png`):** Hardware NVENC encoding settings, bitrates, audio tracks, and 4K60 export (HITL Gate 3).
11. **Global AI Assistant (`Global AI Assistant.png`):** Persistent creative copilot for conversational brief expansion and styling tips.

---

## 💻 Technology Stack Summary

| Domain | Core Technologies |
| :--- | :--- |
| **Frontend UI** | Next.js 15+, TypeScript Strict, Tailwind CSS, shadcn/ui, Lucide Icons, Zustand |
| **Interactive 3D / Video**| Three.js, React Three Fiber, `@remotion/player` |
| **Backend API Gateway** | Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy 2.0 Async, Alembic (`server/backend`) |
| **AI Engine Services** | Ollama (`llama3:8b`), ComfyUI (Flux.1 / SDXL Diffusion), OpenCV, Pillow (`server/ai-engine`) |
| **Orchestration & Workflow**| Temporal (Python SDK, Temporal Server, Temporal Web UI) |
| **Database & Cache** | PostgreSQL 16 (Relational state), Valkey 7 (Cache, Session store, PubSub) |
| **2D Motion Engine** | Remotion v4, GSAP 3.12+ (organic second-order spring physics) (`apps/video-engine`) |
| **3D Rendering Engine** | Blender 4.1+ (Headless Python API scripting, Cycles raytracing, EEVEE) |
| **Video Compositing** | FFmpeg 6.1+ & FFprobe (NVIDIA NVENC `h264_nvenc` acceleration) |
| **Storage Abstraction** | Local Filesystem provider $\rightarrow$ AWS S3 / MinIO provider |
| **Containerization** | Docker, Docker Compose |

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
Ensure your workstation has the following installed:
* **Docker & Docker Compose** (for PostgreSQL, Valkey, and Temporal)
* **Python 3.11+**
* **Node.js 20+** or **Bun 1.1+**
* **Blender 4.1+** and **FFmpeg 6.1+** on your system `PATH`
* **Ollama** and **ComfyUI** (for local AI features)

### 2. Configure Environment
```bash
# Clone the repository
git clone https://github.com/your-org/video-ai-demo.git
cd video-ai-demo

# Copy environment configuration template
cp .env.example .env
```
*(Review and customize `.env` as detailed in [docs/development/ENVIRONMENT_VARIABLES.md](docs/development/ENVIRONMENT_VARIABLES.md))*

### 3. Start Core Infrastructure (Docker Compose)
Launch PostgreSQL 16, Valkey 7, and Temporal Server:
```bash
docker compose -f docker-compose.infra.yml up -d
```
Verify all containers are healthy:
```bash
docker compose -f docker-compose.infra.yml ps
```

### 4. Start Application Services

```bash
# Terminal 1: Backend API Gateway (server/backend)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\Activate.ps1
cd server/backend
pip install -r requirements.txt
alembic upgrade head
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Background Worker Daemon (worker)
source .venv/bin/activate  # On Windows: .venv\Scripts\Activate.ps1
cd worker
pip install -r requirements.txt
python -m src.main

# Terminal 3: Studio Frontend (apps/web)
cd apps/web
bun install && bun run dev

# Terminal 4: Remotion Standalone Motion Preview (apps/video-engine)
cd apps/video-engine
bun install && bun run preview
```

### 5. Access Dashboards & Health Checks
* **Studio Web UI:** [http://localhost:3000](http://localhost:3000)
* **FastAPI Interactive Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **Temporal Workflow Web UI:** [http://localhost:8233](http://localhost:8233)
* **Remotion Standalone Preview:** [http://localhost:3100](http://localhost:3100)
* **Ollama Local LLM Endpoint:** [http://localhost:11434](http://localhost:11434)
* **ComfyUI Interface:** [http://localhost:8188](http://localhost:8188)

---

## 🧪 Testing & Quality Assurance

The codebase enforces a five-tier testing strategy:

```bash
# 1. Run Python unit & integration tests across backend, ai-engine, and worker
pytest server/backend/tests server/ai-engine/tests worker/tests -v

# 2. Run Temporal workflow simulation tests with time-skipping
pytest worker/tests/workflows -v

# 3. Run frontend unit tests
cd apps/web && bun test

# 4. Verify rendering determinism (OpenCV SSIM >= 0.999)
python scripts/test_render_determinism.py --fixture tests/fixtures/sample_scene.json

# 5. Run end-to-end user journey tests (Playwright)
cd apps/web && bun run test:e2e
```

For complete details on test tiers, mock configurations, and CI pipelines, see [docs/development/TESTING_STRATEGY.md](docs/development/TESTING_STRATEGY.md).

---

## 📚 Complete Technical Documentation Index

| Document | Description | Path |
| :--- | :--- | :--- |
| **Master Product Specification** | Vision, Apple motion math, functional requirements, MVP scope | [PROJECT.md](PROJECT.md) |
| **AI Agent Directives** | Actionable guidelines, boundaries, and conventions for AI assistants | [CLAUDE.md](CLAUDE.md) |
| **System Architecture** | Service topology, process boundaries, data flows, and HITL patterns | [SYSTEM_ARCHITECTURE.md](docs/architecture/SYSTEM_ARCHITECTURE.md) |
| **Technology Stack & Decisions** | Technology selection, licensing boundaries (GPL/LGPL), and adapters | [TECH_STACK.md](docs/architecture/TECH_STACK.md) |
| **Coding Standards & Limits** | Clean Architecture, line length budgets, Python & TypeScript standards | [CODING_STANDARDS.md](docs/development/CODING_STANDARDS.md) |
| **Local Setup Guide** | Comprehensive installation guide, Docker Compose, and troubleshooting | [LOCAL_SETUP.md](docs/development/LOCAL_SETUP.md) |
| **Environment Variables** | Detailed reference of all configuration keys, defaults, and requirements | [ENVIRONMENT_VARIABLES.md](docs/development/ENVIRONMENT_VARIABLES.md) |
| **Testing Strategy** | Multi-tier testing methodology, determinism tests, and CI/CD pipelines | [TESTING_STRATEGY.md](docs/development/TESTING_STRATEGY.md) |

---

## 📄 License & Attribution

This project is licensed under the **MIT License**.  
External integrated software engines (Blender, ComfyUI, FFmpeg, PostgreSQL, Valkey, Temporal) operate as independent processes under their respective open-source licenses (GPL-3.0, LGPL, BSD-3-Clause, Apache 2.0). Refer to [docs/architecture/TECH_STACK.md](docs/architecture/TECH_STACK.md) for full licensing boundary analyses.
