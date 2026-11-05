import React from "react";
import { Composition } from "remotion";
import { MainTrailer } from "./compositions/MainTrailer";
import { defaultTrailerProps } from "./types";

export const Root: React.FC = () => {
  const fps = 60;
  const totalSeconds = defaultTrailerProps.scenes.reduce(
    (acc, s) => acc + s.durationSeconds,
    0
  );
  const durationInFrames = Math.round(totalSeconds * fps);

  return (
    <>
      <Composition
        id="MainTrailer"
        component={MainTrailer}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={defaultTrailerProps}
      />
      <Composition
        id="MainTrailerVertical"
        component={MainTrailer}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={defaultTrailerProps}
      />
    </>
  );
};
