import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import type { MainTrailerProps } from "../types";
import { IntroHookScene } from "../scenes/IntroHookScene";
import { ProductRevealScene } from "../scenes/ProductRevealScene";
import { FeatureCalloutScene } from "../scenes/FeatureCalloutScene";
import { OutroCtaScene } from "../scenes/OutroCtaScene";

export const MainTrailer: React.FC<MainTrailerProps> = ({
  projectName,
  brandTagline,
  primaryColor,
  scenes,
}) => {
  const { fps } = useVideoConfig();

  let accumulatedFrames = 0;

  return (
    <div style={{ flex: 1, backgroundColor: "#030712", display: "flex" }}>
      {scenes.map((scene, idx) => {
        const durationFrames = Math.max(fps * 2, Math.round(scene.durationSeconds * fps));
        const fromFrame = accumulatedFrames;
        accumulatedFrames += durationFrames;

        const headline = scene.headline || scene.title;
        const tagline = scene.tagline || scene.description || brandTagline;
        const accent = scene.accentColor || primaryColor;

        let SceneComponent: React.ReactNode;
        if (idx === 0) {
          SceneComponent = (
            <IntroHookScene
              headline={headline}
              tagline={tagline}
              accentColor={accent}
            />
          );
        } else if (idx === 1) {
          SceneComponent = (
            <ProductRevealScene
              headline={headline}
              tagline={tagline}
              accentColor={accent}
            />
          );
        } else if (idx === scenes.length - 1) {
          SceneComponent = (
            <OutroCtaScene
              headline={headline}
              tagline={tagline}
              accentColor={accent}
            />
          );
        } else {
          SceneComponent = (
            <FeatureCalloutScene
              headline={headline}
              tagline={tagline}
              accentColor={accent}
            />
          );
        }

        return (
          <Sequence
            key={idx}
            from={fromFrame}
            durationInFrames={durationFrames}
            name={`Scene ${scene.sceneNumber}: ${scene.title}`}
          >
            {SceneComponent}
          </Sequence>
        );
      })}
    </div>
  );
};
