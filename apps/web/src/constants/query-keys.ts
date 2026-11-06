export const QUERY_KEYS = {
  health: {
    live: ["health", "live"] as const,
    ready: ["health", "ready"] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    stats: () => [...QUERY_KEYS.dashboard.all, "stats"] as const,
  },
  projects: {
    all: ["projects"] as const,
    list: () => [...QUERY_KEYS.projects.all, "list"] as const,
    detail: (id: string) => [...QUERY_KEYS.projects.all, "detail", id] as const,
    briefCheck: (brief: string) =>
      [...QUERY_KEYS.projects.all, "brief-check", brief] as const,
  },
  workflow: {
    all: ["workflow"] as const,
    byProject: (projectId: string) =>
      [...QUERY_KEYS.workflow.all, projectId] as const,
  },
  storyboard: {
    all: ["storyboard"] as const,
    byProject: (projectId: string) =>
      [...QUERY_KEYS.storyboard.all, projectId] as const,
    scene: (projectId: string, sceneId: string) =>
      [...QUERY_KEYS.storyboard.byProject(projectId), "scene", sceneId] as const,
  },
  assets: {
    all: ["assets"] as const,
    byProject: (projectId: string) =>
      [...QUERY_KEYS.assets.all, projectId] as const,
  },
  library: {
    all: ["library"] as const,
    assets: () => [...QUERY_KEYS.library.all, "assets"] as const,
  },
  scene: {
    all: ["scene"] as const,
    detail: (projectId: string, sceneId: string) =>
      [...QUERY_KEYS.scene.all, projectId, sceneId] as const,
  },
  threed: {
    all: ["threed"] as const,
    byProject: (projectId: string) =>
      [...QUERY_KEYS.threed.all, projectId] as const,
  },
  approvals: {
    all: ["approvals"] as const,
    byProject: (projectId: string) =>
      [...QUERY_KEYS.approvals.all, projectId] as const,
  },
  render: {
    all: ["render"] as const,
    progress: () => [...QUERY_KEYS.render.all, "progress"] as const,
  },
  assistant: {
    all: ["assistant"] as const,
  },
} as const;

