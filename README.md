# AI Video Production Studio (`video-ai-demo`)

> **Cinematic Product Presentation & Motion Graphics Platform**  
> *Inspired by Apple Keynote & iPhone Launch Trailer Aesthetics*

---

## 🌟 Executive Overview

The **AI Video Production Studio** is a specialized, pro-grade internal desktop/web studio tool engineered to generate high-end, cinematic product presentation videos, promotional trailers, brand teasers, and motion graphics inspired by the minimalist, ultra-sleek aesthetic of **Apple iPhone and Mac launch trailers**.

The studio enables creators and motion designers to transform customer requests, brand requirements, and raw product photos into broadcast-quality 4K60 video:
*   **AI Image & Asset Creation:** Text-to-image from scratch, image-to-image restyling from customer photos (with Apple studio lighting), transparent background cutouts (`BiRefNet`/`rembg`), and 3D product mockups.
*   **Declarative Scene DSL:** Structured JSON representation of camera trajectories, studio lights, kinetic typography, and spring physics.
*   **Dual-Editor Studio Suite:**
    *   **Scene Editor:** Spatial 3D/2D canvas inspector, transform gizmos, lighting rig controls.
    *   **Timeline Editor:** Multi-track temporal sequencer, spring keyframe curves, transition spans, and audio waveforms.
*   **NVIDIA GPU NVENC Acceleration:** Headless Chromium WebGL frame stepping piped directly into **NVIDIA NVENC hardware encoders** (`h264_nvenc`) for $3\times$ to $10\times$ faster-than-realtime 4K60 export.
*   **Lean, File-Based Workspace Architecture:** No heavyweight external database servers (PostgreSQL/pgvector) or cloud object stores required. Projects live in portable directories under `projects/<id>/`.

---

## 📚 Technical Documentation System

This repository maintains a comprehensive technical documentation suite reflecting the verified greenfield implementation baseline:

| Document | Description | Path |
| :--- | :--- | :--- |
| **Project Master Specification** | Core vision, Apple motion math, domain models, constraints | [PROJECT.md](PROJECT.md) |
| **Agent Coding Directives** | Actionable rules, boundaries, and commands for AI agents | [CLAUDE.md](CLAUDE.md) |
| **Frontend Architecture** | Next.js 16, Feature Slices (`app/features/`), Services, Remotion | [apps/web/ARCHITECTURE.md](apps/web/ARCHITECTURE.md) |
| **Backend Architecture** | FastAPI Clean Architecture, File-based workspace repository | [apps/server/ARCHITECTURE.md](apps/server/ARCHITECTURE.md) |
| **Render Engine Architecture** | Scene DSL compiler, Chromium WebGL runner, NVENC pipeline | [apps/render/ARCHITECTURE.md](apps/render/ARCHITECTURE.md) |
| **Shared Packages** | Bun workspaces, `@video-ai/contracts`, `@video-ai/scene-dsl` | [packages/ARCHITECTURE.md](packages/ARCHITECTURE.md) |
| **System Overview** | Service topology, container model, zero-auth direct studio | [docs/architecture/SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) |
| **Data Flow & Sequences** | End-to-end customer photo, asset gen, and render lifecycles | [docs/architecture/DATA_FLOW.md](docs/architecture/DATA_FLOW.md) |
| **Rendering Pipeline** | Headless frame capture, named pipe IPC, NVENC encode parameters | [docs/architecture/RENDERING_PIPELINE.md](docs/architecture/RENDERING_PIPELINE.md) |
| **Architecture Decisions (ADRs)**| ADR-001 through ADR-008 technical decisions | [docs/architecture/ARCHITECTURE_DECISIONS.md](docs/architecture/ARCHITECTURE_DECISIONS.md) |
| **API Contracts** | REST endpoints, WebSocket events, and RFC 7807 error envelopes | [docs/api/API_CONTRACTS.md](docs/api/API_CONTRACTS.md) |
| **AI Workflows** | Customer photo restyling, img2img, asset cutouts, trailer anatomy | [docs/workflows/AI_WORKFLOWS.md](docs/workflows/AI_WORKFLOWS.md) |
| **Coding Standards** | TypeScript strict, Python Clean Architecture, determinism tests | [docs/development/CODING_STANDARDS.md](docs/development/CODING_STANDARDS.md) |

---

## 🗂️ Monorepo Structure

```text
video-ai-demo/
├── apps/
│   ├── web/                    # Next.js 16 frontend (Bun, Feature-Sliced UI, Remotion Player)
│   ├── server/                 # FastAPI backend (File-based workspace repo, AI orchestration)
│   └── render/                 # Remotion headless worker + Chromium + NVENC encoder
├── packages/
│   ├── contracts/              # Shared TypeScript types, Zod schemas, DTOs
│   ├── scene-dsl/              # Declarative Scene DSL specification & AST parser
│   ├── animation/              # Spring physics solvers, bezier curves, camera math
│   └── preset-apple/           # Apple-style typography presets, lighting rigs, shaders
├── projects/                   # Local file-based project workspaces (<id>/project.json, assets/)
├── docs/                       # Comprehensive architectural & API documentation
├── CLAUDE.md                   # AI agent operational guidelines
├── PROJECT.md                  # Central project specification
└── README.md                   # Quickstart guide & repository index
```

---

## 🚀 Quickstart Commands (Bun)

```bash
# Install dependencies across all Bun workspaces
bun install

# Run frontend development server (Next.js 16 + Turbopack)
cd apps/web && bun run dev

# Run backend API server (FastAPI)
cd apps/server && uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

# Run Remotion standalone preview
cd apps/render && bun run preview
```
