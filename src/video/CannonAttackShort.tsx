import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";

interface ActionWord {
  start: number;
  duration: number;
  text: string;
  x: number;
  y: number;
  color: string;
  burst: string;
  rotate: number;
  scale?: number;
}

const AIM_SOURCE_FRAMES = 18;
const AIM_OUTPUT_FRAMES = 36;
const AIM_EXTENSION = AIM_OUTPUT_FRAMES - AIM_SOURCE_FRAMES;
const afterSlowAim = (sourceFrame: number) => sourceFrame + AIM_EXTENSION;

const actionWords: ActionWord[] = [
  { start: afterSlowAim(31), duration: 22, text: "THOOM!", x: 670, y: 190, color: "#ffef83", burst: "#d9552f", rotate: -8, scale: 0.78 },
  { start: afterSlowAim(56), duration: 28, text: "KABOOM!", x: 565, y: 610, color: "#ff4a2f", burst: "#fff09a", rotate: 6 },
  { start: afterSlowAim(124), duration: 22, text: "BLAM!", x: 680, y: 190, color: "#fff1a1", burst: "#d45a31", rotate: 8, scale: 0.76 },
  { start: afterSlowAim(207), duration: 28, text: "WHUMP!", x: 520, y: 1010, color: "#f16431", burst: "#ffe997", rotate: -5, scale: 0.92 },
  { start: afterSlowAim(217), duration: 22, text: "KRAK!", x: 665, y: 190, color: "#fff0a0", burst: "#c94a2d", rotate: -7, scale: 0.76 },
  { start: afterSlowAim(282), duration: 30, text: "KRA-KOOM!", x: 555, y: 1430, color: "#f0442b", burst: "#fff09a", rotate: 5, scale: 1.05 },
];

const ComicWord: React.FC<ActionWord & { frame: number }> = ({
  frame,
  start,
  duration,
  text,
  x,
  y,
  color,
  burst,
  rotate,
  scale = 1,
}) => {
  const age = frame - start;
  if (age < 0 || age > duration) return null;

  const pop = interpolate(age, [0, 4, 10, duration], [0.12, 1.18, 1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(age, [0, 3, duration - 8, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wobble = Math.sin(age * 0.9) * 2;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 330,
        height: 180,
        transform: `translate(-50%, -50%) rotate(${rotate + wobble}deg) scale(${scale * pop})`,
        opacity,
        zIndex: 4,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: burst,
          border: "8px solid #19140f",
          clipPath:
            "polygon(50% 0%, 59% 14%, 74% 5%, 79% 24%, 98% 25%, 86% 43%, 100% 57%, 80% 65%, 85% 86%, 65% 79%, 55% 100%, 44% 82%, 26% 94%, 23% 73%, 3% 70%, 17% 53%, 0% 39%, 21% 33%, 15% 13%, 37% 20%)",
          filter: "drop-shadow(0 14px 10px rgba(0,0,0,0.48))",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          fontFamily: "Impact, Arial Black, sans-serif",
          fontSize: text.length > 7 ? 55 : 66,
          fontWeight: 950,
          letterSpacing: 1,
          WebkitTextStroke: "6px #19140f",
          textShadow: "5px 6px 0 rgba(255,255,255,0.75)",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const CannonAttackShort: React.FC = () => {
  const frame = useCurrentFrame();
  const aimingOpacity = interpolate(frame, [0, 5, 28, AIM_OUTPUT_FRAMES], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#05070b", overflow: "hidden" }}>
      <Sequence durationInFrames={AIM_OUTPUT_FRAMES}>
        <OffthreadVideo
          src={staticFile("video/cannon-attack-capture.mp4")}
          playbackRate={0.5}
          volume={0}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            imageRendering: "pixelated",
          }}
        />
      </Sequence>
      <Sequence from={AIM_OUTPUT_FRAMES}>
        <OffthreadVideo
          src={staticFile("video/cannon-attack-capture.mp4")}
          trimBefore={AIM_SOURCE_FRAMES}
          volume={0}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            imageRendering: "pixelated",
          }}
        />
      </Sequence>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(4,7,8,0.62) 0%, transparent 17%, transparent 78%, rgba(4,7,8,0.58) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          opacity: aimingOpacity,
          color: "#fff3bd",
          textAlign: "center",
          fontFamily: "Impact, Arial Black, sans-serif",
          fontSize: 54,
          letterSpacing: 4,
          WebkitTextStroke: "4px #17120d",
          textShadow: "4px 5px 0 #9d452a, 0 10px 22px rgba(0,0,0,0.7)",
          zIndex: 3,
        }}
      >
        KRRR-CLANK!
      </div>

      {actionWords.map((word) => (
        <ComicWord key={`${word.start}-${word.text}`} frame={frame} {...word} />
      ))}

    </AbsoluteFill>
  );
};
