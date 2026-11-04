# END-TO-END DATA FLOW & SEQUENCE ARCHITECTURE

> **Document Version:** 2.0.0  
> **Toolchain:** Next.js 16 (Bun), FastAPI, Local File-Based Storage, NVIDIA NVENC  
> **Status:** Specification Complete / Greenfield Repository  
> **Parent Context:** [PROJECT.md](../../PROJECT.md)

---

## 1. Executive Summary & Flow Lifecycle

This document specifies the end-to-end data flow for the AI Video Production Studio. The workflow is designed specifically for creating Apple-style cinematic product presentations, promotional videos, and motion graphics based on customer requests.

The pipeline takes customer inputs (creative brief, branding, and customer product photos), processes them through AI image/cutout pipelines, composes them into a declarative Scene DSL, supports interactive dual-mode editing, and renders 4K60 video using NVIDIA NVENC hardware acceleration.

---

## 2. End-to-End Sequence Diagrams

### 2.1 Flow 1: Customer Input & AI Asset Creation (txt2img & img2img)
```mermaid
sequenceDiagram
    autonumber
    actor Creator as Studio Creator
    participant Web as apps/web (Next.js 16)
    participant API as apps/server (FastAPI)
    participant AI as AI Diffusion & Cutout Engine
    participant FS as Local Filesystem (projects/[project-id]/)

    Creator->>Web: Input Brief & Upload Customer Product Photo
    Web->>API: POST /api/projects/{id}/brief
    API->>FS: Save brief to project.json & photo to assets/raw/
    
    Creator->>Web: Select Restyle Mode (Image-to-Image with Apple Lighting)
    Web->>API: POST /api/projects/{id}/assets/generate/img2img
    API->>AI: Execute Diffusion (restyle customer photo with studio rim lighting)
    AI-->>API: Restyled product image
    API->>FS: Save to assets/generated/
    
    API->>AI: Trigger Cutout Extraction (BiRefNet / Rembg)
    AI-->>API: Transparent product alpha PNG
    API->>FS: Save to assets/cutouts/
    API-->>Web: Return 200 OK with local cutout asset path
    Web-->>Creator: Display transparent cutout in Asset Generator preview
```

---

### 2.2 Flow 2: Frame Composition & Declarative Scene DSL
```mermaid
sequenceDiagram
    autonumber
    actor Creator as Studio Creator
    participant Web as apps/web
    participant API as apps/server
    participant FS as Local Filesystem (projects/[project-id]/)

    Creator->>Web: Click "Generate Initial Trailer Frames"
    Web->>API: POST /api/projects/{id}/scenes/synthesize
    API->>API: Compose 6-scene AST (Camera trajectories, lighting rigs, text staggers)
    API->>FS: Write to projects/[project-id]/scenes.json
    API-->>Web: WebSocket 'scene:ready' with SceneCompositionDSL
    Web-->>Creator: Load scenes into Scene Editor & Timeline Editor
```

---

### 2.3 Flow 3: Interactive Dual-Editor Authoring & Local Persistence
```mermaid
sequenceDiagram
    autonumber
    actor Creator as Studio Creator
    participant Editor as Scene & Timeline Editor
    participant Store as Zustand Store (Active AST)
    participant API as apps/server
    participant FS as Local Filesystem

    Creator->>Editor: Drag 3D Model in Viewport & Adjust Spring Easing in Timeline
    Editor->>Store: Instant 60fps local mutation
    Store-->>Editor: Re-render WebGL canvas and timeline curve
    Note over Editor,API: Auto-save debounce (e.g. 500ms)
    Editor->>API: PUT /api/projects/{id}/scenes (JSON AST)
    API->>FS: Overwrite projects/[project-id]/scenes.json
    API-->>Editor: 200 OK (Saved)
```

---

### 2.4 Flow 4: Hardware NVENC Video Synthesis & Export
```mermaid
sequenceDiagram
    autonumber
    actor Creator as Studio Creator
    participant Web as apps/web
    participant API as apps/server
    participant Render as apps/render Worker
    participant FS as Local Filesystem

    Creator->>Web: Click "Export Master MP4" (4K60 Apple Master Preset)
    Web->>API: POST /api/projects/{id}/render
    API->>Render: Dispatch render job with project folder path
    Render->>FS: Read projects/[project-id]/scenes.json and local assets
    loop 180-frame Chunks
        Render->>Render: Headless Chromium WebGL stepping
        Render->>Render: Pipe raw RGBA to FFmpeg NVENC (h264_nvenc)
        Render-->>API: Emit progress { percent: 45.0, fps: 88.2 }
        API-->>Web: WebSocket 'render:progress'
        Web-->>Creator: Update GPU Progress Bar
    end
    Render->>FS: Write final master to projects/[project-id]/renders/master_4k60.mp4
    Render-->>API: Render Completed
    API-->>Web: WebSocket 'render:complete'
    Web-->>Creator: Display master video with download and local play controls
```

---

## 3. Data Transformations Across Boundaries

```mermaid
graph TD
    A["Customer Request & Product Photo"] -->|Local Upload| B["projects/[project-id]/assets/raw/"]
    B -->|AI Restyling & Cutout| C["Transparent Product PNGs & Textures"]
    C -->|Scene Synthesizer| D["projects/[project-id]/scenes.json (Declarative AST)"]
    D -->|Dual Editor Tuning| E["Mutated Scene DSL"]
    E -->|Remotion Compiler| F["Executable React & WebGL DOM"]
    F -->|Chromium Frame Stepping| G["Raw RGBA Byte Stream"]
    G -->|NVIDIA NVENC Hardware Encode| H["projects/[project-id]/renders/master_4k60.mp4"]
```

---

## 4. Cross-Document References

*   [PROJECT.md](../../PROJECT.md)
*   [SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md)
*   [RENDERING_PIPELINE.md](RENDERING_PIPELINE.md)
*   [AI_WORKFLOWS.md](../workflows/AI_WORKFLOWS.md)
*   [API_CONTRACTS.md](../api/API_CONTRACTS.md)
