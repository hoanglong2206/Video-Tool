import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ProductRevealSceneProps {
  headline: string;
  tagline: string;
  accentColor?: string;
}

export const ProductRevealScene: React.FC<ProductRevealSceneProps> = ({
  headline,
  tagline,
  accentColor = "#3B82F6",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating spring physics for product card / mockup
  const revealProgress = spring({
    frame,
    fps,
    config: { damping: 12, mass: 1, stiffness: 90 },
  });

  const cardY = interpolate(revealProgress, [0, 1], [80, 0]);
  const cardScale = interpolate(revealProgress, [0, 1], [0.9, 1]);
  const floatY = Math.sin((frame / fps) * 2) * 12;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#080B13",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, sans-serif",
      }}
    >
      {/* Dynamic Lighting Beam */}
      <div
        style={{
          position: "absolute",
          top: -150,
          width: 600,
          height: 600,
          background: `conic-gradient(from 180deg at 50% 50%, ${accentColor} 0deg, transparent 60deg, transparent 300deg, ${accentColor} 360deg)`,
          opacity: 0.15,
          filter: "blur(60px)",
        }}
      />

      {/* Hero Product Frame (Simulated 3D Model Viewport / Cutout Stage) */}
      <div
        style={{
          transform: `translateY(${cardY + floatY}px) scale(${cardScale})`,
          width: 580,
          height: 340,
          borderRadius: 24,
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: `0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px ${accentColor}33`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Spec Label Pill */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 28,
            padding: "6px 14px",
            borderRadius: 20,
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: 12,
            color: "#94A3B8",
            letterSpacing: "0.15em",
            fontWeight: 600,
          }}
        >
          STAGE 04 · ASSET STAGING
        </div>

        {/* Center Emblem Graphic */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor} 0%, rgba(15, 23, 42, 0.2) 80%)`,
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 30px ${accentColor}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 44, color: "white" }}>✦</span>
        </div>
      </div>

      {/* Lower Typography */}
      <h2
        style={{
          marginTop: 40,
          color: "#F8FAFC",
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {headline}
      </h2>
      <p
        style={{
          marginTop: 8,
          color: "#94A3B8",
          fontSize: 18,
          letterSpacing: "0.12em",
          textAlign: "center",
        }}
      >
        {tagline}
      </p>
    </div>
  );
};
