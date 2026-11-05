import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface OutroCtaSceneProps {
  headline: string;
  tagline: string;
  accentColor?: string;
}

export const OutroCtaScene: React.FC<OutroCtaSceneProps> = ({
  headline,
  tagline,
  accentColor = "#3B82F6",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = spring({
    frame,
    fps,
    config: { damping: 15, mass: 1, stiffness: 110 },
  });

  const scale = interpolate(anim, [0, 1], [0.8, 1]);
  const opacity = interpolate(anim, [0, 1], [0, 1]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#030712",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        fontFamily: "'Segoe UI', -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Glow pill */}
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 30,
            background: `${accentColor}22`,
            border: `1px solid ${accentColor}66`,
            color: accentColor,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          AI MOTION STUDIO
        </div>

        <h1
          style={{
            color: "#FFFFFF",
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            color: "#94A3B8",
            fontSize: 22,
            letterSpacing: "0.15em",
            marginTop: 16,
            marginBottom: 40,
          }}
        >
          {tagline}
        </p>

        {/* CTA Button Badge */}
        <div
          style={{
            padding: "16px 48px",
            borderRadius: 12,
            backgroundColor: accentColor,
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.1em",
            boxShadow: `0 0 40px ${accentColor}88`,
          }}
        >
          EXPLORE CATALOG
        </div>
      </div>
    </div>
  );
};
