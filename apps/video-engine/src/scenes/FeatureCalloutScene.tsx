import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface FeatureCalloutSceneProps {
  headline: string;
  tagline: string;
  accentColor?: string;
}

export const FeatureCalloutScene: React.FC<FeatureCalloutSceneProps> = ({
  headline,
  tagline,
  accentColor = "#3B82F6",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stagger = (delay: number) =>
    spring({
      frame: frame - delay,
      fps,
      config: { damping: 12, mass: 0.8, stiffness: 100 },
    });

  const p1 = stagger(0);
  const p2 = stagger(10);
  const p3 = stagger(20);

  const specs = [
    { label: "LATENCY", value: "< 1.2ms", progress: p1 },
    { label: "ACCURACY", value: "99.8%", progress: p2 },
    { label: "FRAME RATE", value: "60.0 FPS", progress: p3 },
  ];

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#050811",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        fontFamily: "'Segoe UI', -apple-system, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#F8FAFC",
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {headline}
      </h2>
      <p
        style={{
          color: "#64748B",
          fontSize: 20,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 50,
        }}
      >
        {tagline}
      </p>

      {/* 3 Metric Badges */}
      <div style={{ display: "flex", gap: 32 }}>
        {specs.map((s, idx) => {
          const scale = interpolate(s.progress, [0, 1], [0.7, 1]);
          const opacity = interpolate(s.progress, [0, 1], [0, 1]);
          return (
            <div
              key={idx}
              style={{
                width: 200,
                padding: "24px 20px",
                borderRadius: 16,
                background: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5)`,
                textAlign: "center",
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: "#94A3B8",
                  marginBottom: 8,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: accentColor,
                  fontFamily: "monospace",
                }}
              >
                {s.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
