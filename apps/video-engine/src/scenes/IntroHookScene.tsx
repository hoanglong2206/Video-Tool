import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface IntroHookSceneProps {
  headline: string;
  tagline: string;
  accentColor?: string;
}

export const IntroHookScene: React.FC<IntroHookSceneProps> = ({
  headline,
  tagline,
  accentColor = "#3B82F6",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const taglineOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowOpacity = interpolate(frame, [0, 45, 90], [0.2, 0.6, 0.3], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#05070D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, sans-serif",
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle Grid Accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }}
      />

      {/* Main Headline */}
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: 0,
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          textAlign: "center",
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          zIndex: 2,
        }}
      >
        {headline}
      </h1>

      {/* Subtitle / Tagline */}
      <p
        style={{
          color: "#94A3B8",
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: 20,
          opacity: taglineOpacity,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        {tagline}
      </p>

      {/* Bottom Progress Accent Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 6,
          backgroundColor: accentColor,
          width: `${(frame / 180) * 100}%`,
          boxShadow: `0 0 20px ${accentColor}`,
        }}
      />
    </div>
  );
};
