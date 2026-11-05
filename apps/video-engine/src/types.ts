export interface ScenePayload {
  sceneNumber: number;
  title: string;
  durationSeconds: number;
  cameraMovement?: string;
  description?: string;
  headline?: string;
  tagline?: string;
  accentColor?: string;
}

export interface MainTrailerProps {
  projectName: string;
  brandTagline: string;
  primaryColor: string;
  scenes: ScenePayload[];
}

export const defaultTrailerProps: MainTrailerProps = {
  projectName: "Aurora X1",
  brandTagline: "Precision Engineered Motion",
  primaryColor: "#3B82F6",
  scenes: [
    {
      sceneNumber: 1,
      title: "Dark Intro & Silhouette",
      durationSeconds: 3,
      headline: "INTRODUCING AURORA X1",
      tagline: "Redefining cinematic motion",
      accentColor: "#3B82F6",
    },
    {
      sceneNumber: 2,
      title: "Macro Reveal",
      durationSeconds: 4,
      headline: "ANODIZED TITANIUM CHASSIS",
      tagline: "Unmatched craftsmanship & precision",
      accentColor: "#60A5FA",
    },
    {
      sceneNumber: 3,
      title: "Core Performance",
      durationSeconds: 4,
      headline: "60 FPS FLUID DYNAMICS",
      tagline: "Sub-millisecond frame rendering",
      accentColor: "#38BDF8",
    },
    {
      sceneNumber: 4,
      title: "Outro & Call To Action",
      durationSeconds: 4,
      headline: "EXPERIENCE THE FUTURE",
      tagline: "Available Now · Limited Edition",
      accentColor: "#3B82F6",
    },
  ],
};
