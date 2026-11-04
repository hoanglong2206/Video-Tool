# ARCHITECTURE DECISION RECORDS (ADRs)

> **Document Version:** 2.0.0  
> **Status:** Active / Accepted Standards  
> **Parent Context:** [PROJECT.md](../../PROJECT.md)

---

## 1. Index of Decisions

*   [ADR-001: Bun Workspaces as Unified Package Manager & Runtime](#adr-001-bun-workspaces-as-unified-package-manager--runtime)
*   [ADR-002: Next.js 16 with Feature-Sliced Architecture](#adr-002-nextjs-16-with-feature-sliced-architecture)
*   [ADR-003: File-Based Project Workspaces over Heavyweight PostgreSQL](#adr-003-file-based-project-workspaces-over-heavyweight-postgresql)
*   [ADR-004: Remotion with Headless Chromium & NVIDIA NVENC for Synthesis](#adr-004-remotion-with-headless-chromium--nvidia-nvenc-for-synthesis)
*   [ADR-005: Zero-Auth Direct Studio Model (No Login Friction)](#adr-005-zero-auth-direct-studio-model-no-login-friction)
*   [ADR-006: Declarative Scene DSL for Programmatic Video](#adr-006-declarative-scene-dsl-for-programmatic-video)
*   [ADR-007: Dual-Editor Architecture (Scene & Timeline Modes)](#adr-007-dual-editor-architecture-scene--timeline-modes)
*   [ADR-008: AI Image-to-Image & Transparent Cutout Pipeline for Customer Assets](#adr-008-ai-image-to-image--transparent-cutout-pipeline-for-customer-assets)

---

## ADR-001: Bun Workspaces as Unified Package Manager & Runtime

### Status
**Accepted**

### Context
Node.js and traditional package managers (npm, pnpm) introduce multi-second package installation overhead and require complex transpilation setups for TypeScript packages across monorepo boundaries.

### Decision
Adopt **Bun (v1.1+)** as the universal workspace package manager and TypeScript runtime across `apps/web`, `apps/render`, and `packages/*`.

### Consequences
*   **Positive:** Near-instantaneous dependency installation; native TypeScript execution without prior compilation; unified toolchain for dev and testing (`bun run dev`, `bun test`).
*   **Negative:** Requires Bun runtime installed on developer workstations and CI runners.

---

## ADR-002: Next.js 16 with Feature-Sliced Architecture

### Status
**Accepted**

### Context
Large non-linear video editing UIs can become unmaintainable when components, hooks, and business logic are mixed into monolithic page files or arbitrary component folders.

### Decision
Upgrade to **Next.js 16 (React 19)** using Turbopack and enforce a strict **Feature-Sliced Architecture**:
*   Every feature resides in `app/features/<feature-name>/` with `<FeatureName>.tsx`, `index.ts`, `types.ts`, `hooks/`, and `components/`.
*   All client-side external I/O resides in `app/services/`.

### Consequences
*   **Positive:** Clear public APIs per feature; isolated testing; fast Turbopack compilation; zero component spaghetti.
*   **Negative:** Developers must follow standard feature directory conventions rather than dumping loose files.

---

## ADR-003: File-Based Project Workspaces over Heavyweight PostgreSQL

### Status
**Accepted**

### Context
The platform is designed as a pro-grade internal tool for creating Apple-style product intro trailers. Setting up PostgreSQL 16, pgvector, Alembic migrations, and S3 object servers introduces substantial infrastructure friction, Docker resource overhead, and maintenance burden.

### Decision
Eliminate external database servers in favor of **File-Based Project Workspaces** (`projects/<project-id>/`).
*   `project.json` stores project settings and brief data.
*   `scenes.json` stores the complete Scene DSL AST.
*   `assets/` and `renders/` hold local files.

### Consequences
*   **Positive:** Zero database server maintenance; zero Docker overhead; projects can be zipped, backed up, and moved across machines instantly; local NVMe disk access yields 0ms asset retrieval during rendering.
*   **Negative:** Cross-project analytical SQL queries require an in-memory or SQLite index.

---

## ADR-004: Remotion with Headless Chromium & NVIDIA NVENC for Synthesis

### Status
**Accepted**

### Context
Pure text-to-video AI models lack precise typography kerning, predictable camera sweeps, and exact frame timing. CPU-based video rendering is excessively slow for 4K60 video.

### Decision
Execute **Remotion** inside headless Chromium to render Three.js 3D models and CSS typography, directly piping uncompressed RGBA frames into **NVIDIA NVENC hardware encoders (`h264_nvenc`)** via FFmpeg.

### Consequences
*   **Positive:** Pixel-identical match between browser preview and final export; $3\times$ to $10\times$ faster-than-realtime 4K encoding.
*   **Negative:** Requires NVIDIA GPU hardware.

---

## ADR-005: Zero-Auth Direct Studio Model (No Login Friction)

### Status
**Accepted**

### Context
Authentication layers (OAuth2, JWT tokens, RBAC roles) add unnecessary friction for an internal desktop/web studio tool operated directly by the creator.

### Decision
Eliminate authentication. The studio runs locally or within a private studio network with direct access.

### Consequences
*   **Positive:** Instant access; zero login barriers; simplified backend routers; reduced latency.
*   **Negative:** Must run behind a firewall or reverse proxy if exposed to the public internet.

---

## ADR-006: Declarative Scene DSL for Programmatic Video

### Status
**Accepted**

### Context
Traditional imperative video scripts (FFmpeg commands, python scripts) are difficult to inspect, edit in browser UIs, or safely generate via AI models.

### Decision
Model all compositions as a **Declarative Abstract Syntax Tree (Scene DSL)** serialized as JSON (`scenes.json`), specifying cameras, lights, kinetic typography, and spring physics.

### Consequences
*   **Positive:** Fully serializable; easily updated by both AI models and human UI editors; deterministic.
*   **Negative:** Requires Remotion compiler to transform AST nodes into React component trees.

---

## ADR-007: Dual-Editor Architecture (Scene & Timeline Modes)

### Status
**Accepted**

### Context
Video authoring requires both spatial staging (3D object placement, lighting angles, typography kerning) and temporal sequencing (keyframe curves, transition spans, audio alignment).

### Decision
Provide two synchronized editing viewports backed by a unified Zustand state store:
*   **Scene Editor:** Focuses on spatial layout, 3D viewport, inspector panels, and lighting.
*   **Timeline Editor:** Focuses on multi-track sequencing, spring keyframe curves, transition spans, and audio tracks.

### Consequences
*   **Positive:** Tailored UX for spatial vs temporal design tasks; matches professional NLE workflows.
*   **Negative:** Requires fine-grained Zustand store management to maintain synchronization without lag.

---

## ADR-008: AI Image-to-Image & Transparent Cutout Pipeline for Customer Assets

### Status
**Accepted**

### Context
Clients frequently provide existing product photos that have amateur lighting, cluttered backgrounds, or incorrect camera angles. The tool must convert these into sleek Apple-style keynote assets.

### Decision
Implement a hybrid asset pipeline:
1.  **Image-to-Image Restyling:** Use diffusion models with ControlNet conditioning to restyle customer photos with dramatic rim lighting and pristine backdrops.
2.  **Transparent Cutout Extraction:** Run `BiRefNet` / `rembg` to isolate product items with clean alpha channels for 3D spatial compositing.

### Consequences
*   **Positive:** Turns standard customer photos into broadcast-ready hero presentation items.
*   **Negative:** Requires diffusion inference step and alpha matting passes.

---

## 2. Cross-Document References

*   [PROJECT.md](../../PROJECT.md)
*   [SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md)
*   [RENDERING_PIPELINE.md](RENDERING_PIPELINE.md)
*   [API_CONTRACTS.md](../api/API_CONTRACTS.md)
