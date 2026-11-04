# API CONTRACTS & PROTOCOL SPECIFICATIONS

> **Document Version:** 2.0.0  
> **Protocols:** REST (HTTP/1.1 & HTTP/2), WebSockets (WSS)  
> **Auth:** None (Internal Studio Direct Access)  
> **Storage Target:** Local File-Based Workspaces (`projects/<id>/`)  
> **Status:** Specification Complete / Greenfield Repository  
> **Parent Context:** [PROJECT.md](../../PROJECT.md)

---

## 1. Protocol Architecture & Overview

All communication between the frontend studio (`apps/web`) and backend service (`apps/server`) operates via typed REST and WebSocket contracts:
*   **REST API:** Project creation, customer asset upload, AI text-to-image and img2img restyling, cutout extraction, Scene DSL saving, and NVENC render dispatch.
*   **WebSocket API:** Real-time push updates for AI generation progress and NVENC frame encoding metrics (`render:progress`, `render:complete`).

---

## 2. Standard Error Envelope (RFC 7807)

```json
{
  "type": "https://api.video-ai.studio/errors/file-not-found",
  "title": "Project Workspace Not Found",
  "status": 404,
  "detail": "Project workspace 'iphone16-trailer' does not exist in local projects directory.",
  "instance": "/api/projects/iphone16-trailer",
  "trace_id": "0af7651916cd43dd8448eb211c80319c"
}
```

---

## 3. REST Endpoint Specifications

### 3.1 Project Workspace Endpoints

#### `POST /api/projects`
Initializes a new self-contained project folder on the local filesystem.
*   **Request Body:**
```json
{
  "id": "iphone16-cinematic-intro",
  "title": "iPhone 16 Pro Cinematic Reveal",
  "targetFps": 60,
  "aspectRatio": "16:9",
  "durationSeconds": 30
}
```
*   **Response (201 Created):**
```json
{
  "id": "iphone16-cinematic-intro",
  "title": "iPhone 16 Pro Cinematic Reveal",
  "workspacePath": "projects/iphone16-cinematic-intro",
  "createdAt": "2026-11-04T12:00:00Z"
}
```

---

#### `POST /api/projects/{projectId}/brief`
Saves customer requirements, product USPs, and brand tone.
*   **Request Body:**
```json
{
  "brandName": "Apple Inc.",
  "productName": "iPhone 16 Pro",
  "keySellingPoints": [
    "Grade 5 titanium design with micro-blasted finish",
    "Camera Control with tactile haptic switch",
    "A18 Pro silicon with hardware-accelerated ray tracing"
  ],
  "visualTone": "apple-minimal-dark",
  "primaryColorHex": "#000000",
  "accentColorHex": "#2997FF"
}
```
*   **Response (200 OK):**
```json
{
  "status": "SAVED",
  "message": "Brief saved to projects/iphone16-cinematic-intro/project.json"
}
```

---

### 3.2 Customer Asset & AI Generation Endpoints

#### `POST /api/projects/{projectId}/assets/upload`
Uploads raw customer product photos or logos into `assets/raw/`.
*   **Content-Type:** `multipart/form-data`
*   **Payload:** `file: <binary_image_file>`
*   **Response (201 Created):**
```json
{
  "filename": "customer_iphone_photo.jpg",
  "localPath": "assets/raw/customer_iphone_photo.jpg",
  "width": 3024,
  "height": 4032,
  "sizeBytes": 3481920
}
```

---

#### `POST /api/projects/{projectId}/assets/generate/img2img`
Restyles a customer photo into an Apple-style studio presentation visual using diffusion.
*   **Request Body:**
```json
{
  "sourceAssetPath": "assets/raw/customer_iphone_photo.jpg",
  "prompt": "macro product photography of titanium smartphone, volumetric rim lighting, deep black studio background, octane render, 8k",
  "stylePreset": "apple-dark-studio",
  "denoisingStrength": 0.45
}
```
*   **Response (200 OK):**
```json
{
  "generatedAssetPath": "assets/generated/restyled_hero_01.png",
  "previewUrl": "/static/projects/iphone16-cinematic-intro/assets/generated/restyled_hero_01.png"
}
```

---

#### `POST /api/projects/{projectId}/assets/cutout`
Executes AI background removal (`BiRefNet` / `rembg`) on an image to create an alpha-cutout item.
*   **Request Body:**
```json
{
  "assetPath": "assets/generated/restyled_hero_01.png"
}
```
*   **Response (200 OK):**
```json
{
  "cutoutPath": "assets/cutouts/restyled_hero_01_alpha.png",
  "hasAlphaChannel": true
}
```

---

### 3.3 Scene DSL AST Management

#### `GET /api/projects/{projectId}/scenes`
Loads the declarative Scene DSL AST from `projects/<projectId>/scenes.json`.
*   **Response (200 OK):** Returns the complete `SceneCompositionDSL` JSON.

#### `PUT /api/projects/{projectId}/scenes`
Saves updated Scene DSL AST after modifications in Scene or Timeline Editor.
*   **Request Body:** `SceneCompositionDSL` JSON.
*   **Response (200 OK):**
```json
{
  "status": "SAVED",
  "timestamp": "2026-11-04T12:15:30Z"
}
```

---

### 3.4 Render Dispatch & Progress

#### `POST /api/projects/{projectId}/render`
Triggers hardware-accelerated NVENC video synthesis.
*   **Request Body:**
```json
{
  "resolution": "3840x2160",
  "fps": 60,
  "codec": "h264_nvenc",
  "preset": "apple-master-p7"
}
```
*   **Response (202 Accepted):**
```json
{
  "jobId": "8f3b2a10-4c5e-4f1d-9e2a-001122334455",
  "status": "RENDERING",
  "outputPath": "projects/iphone16-cinematic-intro/renders/master_4k60.mp4"
}
```

---

## 4. Real-Time WebSocket Events

*   **Endpoint:** `ws://localhost:8000/ws/projects/{projectId}`

### 4.1 Event: `render:progress`
```json
{
  "event": "render:progress",
  "currentFrame": 720,
  "totalFrames": 1800,
  "percent": 40.0,
  "fps": 86.4,
  "vramUsedMb": 4120
}
```

### 4.2 Event: `render:complete`
```json
{
  "event": "render:complete",
  "outputPath": "projects/iphone16-cinematic-intro/renders/master_4k60.mp4",
  "durationSeconds": 30.0,
  "fileSizeBytes": 168420194
}
```

---

## 5. Cross-Document References

*   [PROJECT.md](../../PROJECT.md)
*   [apps/web/ARCHITECTURE.md](../../apps/web/ARCHITECTURE.md)
*   [apps/server/ARCHITECTURE.md](../../apps/server/ARCHITECTURE.md)
