export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const WS_BASE_URL: string =
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws";

export const API_ENDPOINTS = {
  // System Health
  HEALTH: "/health",
  HEALTH_READY: "/health/ready",

  // Dashboard Overview
  DASHBOARD_STATS: "/api/v1/dashboard/stats",

  // Projects
  PROJECTS: "/api/v1/projects",
  PROJECT_BY_ID: (id: string) => `/api/v1/projects/${id}`,
  BRIEF_CHECK: "/api/v1/projects/brief-check",

  // Workflow Pipeline
  WORKFLOW: (projectId: string) => `/api/v1/projects/${projectId}/workflow`,
  WORKFLOW_START: (projectId: string) =>
    `/api/v1/projects/${projectId}/workflow/start`,
  STAGE_APPROVE: (projectId: string, stageId: string) =>
    `/api/v1/projects/${projectId}/stages/${stageId}/approve`,

  // Storyboard
  STORYBOARD: (projectId: string) =>
    `/api/v1/projects/${projectId}/storyboard`,
  STORYBOARD_GENERATE: (projectId: string) =>
    `/api/v1/projects/${projectId}/storyboard/generate`,
  STORYBOARD_SCENES: (projectId: string) =>
    `/api/v1/projects/${projectId}/storyboard/scenes`,
  STORYBOARD_SCENE: (projectId: string, sceneId: string) =>
    `/api/v1/projects/${projectId}/storyboard/scenes/${sceneId}`,
  STORYBOARD_SCENE_VERSIONS: (projectId: string, sceneId: string) =>
    `/api/v1/projects/${projectId}/storyboard/scenes/${sceneId}/versions`,
  STORYBOARD_SCENE_VERSION: (projectId: string, sceneId: string, versionId: string) =>
    `/api/v1/projects/${projectId}/storyboard/scenes/${sceneId}/versions/${versionId}`,
  STORYBOARD_REORDER: (projectId: string) =>
    `/api/v1/projects/${projectId}/storyboard/reorder`,
  STORYBOARD_APPROVE: (projectId: string) =>
    `/api/v1/projects/${projectId}/storyboard/approve`,

  // Asset Studio
  ASSETS: (projectId: string) => `/api/v1/projects/${projectId}/assets`,
  ASSET_REMOVE_BG: (projectId: string, assetId: string) =>
    `/api/v1/projects/${projectId}/assets/${assetId}/remove-bg`,

  // Global Library & Brand Kit
  LIBRARY_ASSETS: "/api/v1/library/assets",
  BRAND_KIT_APPLY: "/api/v1/library/brand-kit/apply",

  // Kinetic Scene Editor
  SCENE_DETAILS: (projectId: string, sceneId: string) =>
    `/api/v1/projects/${projectId}/scenes/${sceneId}`,

  // 3D Scene Studio
  THREED_SCENE: (projectId: string) => `/api/v1/projects/${projectId}/3d`,

  // Approval Center
  APPROVALS: (projectId: string) => `/api/v1/projects/${projectId}/approvals`,
  APPROVAL_DECISION: (projectId: string, approvalId: string) =>
    `/api/v1/projects/${projectId}/approvals/${approvalId}/decision`,

  // Video Rendering Engine
  RENDER_START: "/api/v1/render/start",
  RENDER_PROGRESS: "/api/v1/render/progress",
  RENDER_DOWNLOAD: (jobId: string) => `/api/v1/render/download/${jobId}`,

  // AI Assistant Copilot
  ASSISTANT_CHAT: "/api/v1/assistant/chat",
  ASSISTANT_APPLY: "/api/v1/assistant/apply",

  // Real-time Server-Sent Events
  EVENTS_STREAM: (projectId: string) => `/api/v1/events/stream/${projectId}`,
} as const;

