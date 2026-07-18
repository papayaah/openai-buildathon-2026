import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CannonAttackShort } from "./CannonAttackShort";

const colors = {
  ink: "#0a0d12",
  panel: "#121821",
  line: "#2b3542",
  cream: "#fff1c2",
  cyan: "#45c7ef",
  orange: "#f46d3b",
  muted: "#a8b1bd",
};

const font = "Inter, Avenir Next, Arial, sans-serif";
const display = "Impact, Arial Black, sans-serif";

const Scene: React.FC<React.PropsWithChildren<{ from: number; duration: number }>> = ({
  from,
  duration,
  children,
}) => (
  <Sequence from={from} durationInFrames={duration} premountFor={30}>
    {children}
  </Sequence>
);

const Fade: React.FC<React.PropsWithChildren<{ duration: number }>> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const Eyebrow: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div
    style={{
      color: colors.cyan,
      fontFamily: font,
      fontSize: 25,
      fontWeight: 900,
      letterSpacing: 5,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 110 } });
  return (
    <Fade duration={150}>
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 150px" }}>
        <div style={{ transform: `translateY(${(1 - enter) * 45}px)`, opacity: enter }}>
          <Eyebrow>Codex Build-a-thon · Hero's Bounty</Eyebrow>
          <div
            style={{
              marginTop: 22,
              maxWidth: 1500,
              color: colors.cream,
              fontFamily: display,
              fontSize: 106,
              lineHeight: 0.96,
              letterSpacing: 1,
              textTransform: "uppercase",
              WebkitTextStroke: "2px #1b1710",
              textShadow: "8px 9px 0 #8b3527",
            }}
          >
            From gameplay capture
            <br />
            to YouTube Short
          </div>
          <div style={{ marginTop: 38, color: colors.muted, fontFamily: font, fontSize: 34 }}>
            A repeatable Phaser → Remotion workflow built with Codex
          </div>
        </div>
      </AbsoluteFill>
    </Fade>
  );
};

const VideoCard: React.FC<{ label: string; children: React.ReactNode; accent?: string }> = ({
  label,
  children,
  accent = colors.cyan,
}) => (
  <div
    style={{
      position: "relative",
      height: "100%",
      overflow: "hidden",
      borderRadius: 28,
      border: `3px solid ${colors.line}`,
      background: "#05070a",
      boxShadow: "0 28px 80px rgba(0,0,0,0.42)",
    }}
  >
    {children}
    <div
      style={{
        position: "absolute",
        top: 22,
        left: 22,
        padding: "10px 18px",
        borderRadius: 9,
        background: "rgba(7,10,14,0.88)",
        borderLeft: `6px solid ${accent}`,
        color: "white",
        fontFamily: font,
        fontWeight: 900,
        fontSize: 22,
        letterSpacing: 2,
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
  </div>
);

const RawCapture: React.FC = () => (
  <Fade duration={330}>
    <AbsoluteFill style={{ padding: "76px 110px 72px" }}>
      <Eyebrow>01 · Capture the real game</Eyebrow>
      <div style={{ display: "flex", height: 840, gap: 64, marginTop: 34, alignItems: "center" }}>
        <div style={{ width: 480, height: 840 }}>
          <VideoCard label="Raw Phaser capture">
            <OffthreadVideo
              src={staticFile("video/cannon-attack-capture.mp4")}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: "pixelated" }}
            />
          </VideoCard>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: colors.cream, fontFamily: display, fontSize: 72, lineHeight: 1.02 }}>
            Start with a clean,
            <br />
            deterministic attack
          </div>
          <div style={{ marginTop: 34, color: colors.muted, fontFamily: font, fontSize: 31, lineHeight: 1.5 }}>
            Codex added a dedicated cannon capture route and automated the browser recording at
            1080 × 1920—ready for a vertical edit.
          </div>
          <div style={{ marginTop: 42, color: colors.cyan, fontFamily: "monospace", fontSize: 27 }}>
            npm run video:capture:cannon
          </div>
        </div>
      </div>
    </AbsoluteFill>
  </Fade>
);

const CodeWorkflow: React.FC = () => {
  const frame = useCurrentFrame();
  const cursor = Math.floor(frame / 12) % 2 === 0 ? "▋" : "";
  return (
    <Fade duration={330}>
      <AbsoluteFill style={{ padding: "82px 110px" }}>
        <Eyebrow>02 · Iterate live with Codex + Remotion</Eyebrow>
        <div style={{ display: "flex", gap: 56, marginTop: 48, height: 780 }}>
          <div
            style={{
              flex: 1.1,
              borderRadius: 24,
              border: `3px solid ${colors.line}`,
              background: "#0b1017",
              overflow: "hidden",
              boxShadow: "0 28px 80px rgba(0,0,0,0.38)",
            }}
          >
            <div style={{ padding: "18px 24px", background: "#171e28", color: colors.muted, fontFamily: font, fontSize: 21 }}>
              CannonAttackShort.tsx
            </div>
            <pre
              style={{
                margin: 0,
                padding: "38px 42px",
                color: "#d9e2ec",
                fontFamily: "SFMono-Regular, Consolas, monospace",
                fontSize: 25,
                lineHeight: 1.65,
              }}
            >
              <span style={{ color: "#c792ea" }}>const</span> actionWords = [{"\n"}
              {"  "}<span style={{ color: colors.orange }}>"THOOM!"</span>,{"\n"}
              {"  "}<span style={{ color: "#ffcc66" }}>"KABOOM!"</span>,{"\n"}
              {"  "}<span style={{ color: colors.orange }}>"BLAM!"</span>,{"\n"}
              {"  "}<span style={{ color: "#ffcc66" }}>"KRA-KOOM!"</span>,{"\n"}
              ];{"\n\n"}
              <span style={{ color: "#82aaff" }}>&lt;ComicWord</span>{"\n"}
              {"  "}frame={'{'}frame{'}'}{"\n"}
              {"  "}timing={'{'}impactFrame{'}'}{"\n"}
              <span style={{ color: "#82aaff" }}>/&gt;</span>{cursor}
            </pre>
          </div>
          <div style={{ width: 438 }}>
            <div style={{ color: colors.cream, fontFamily: display, fontSize: 62, lineHeight: 1.04 }}>
              Preview changes
              <br />
              without rendering
            </div>
            <div style={{ marginTop: 32, color: colors.muted, fontFamily: font, fontSize: 29, lineHeight: 1.48 }}>
              Timing, typography, portrait framing, and comic impact words update instantly inside
              Remotion Studio.
            </div>
            <div style={{ marginTop: 40, color: colors.cyan, fontFamily: "monospace", fontSize: 25 }}>
              npm run video:preview
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Fade>
  );
};

const BeforeAfter: React.FC = () => (
  <Fade duration={270}>
    <AbsoluteFill style={{ padding: "66px 96px" }}>
      <Eyebrow>03 · One source, polished output</Eyebrow>
      <div style={{ display: "flex", gap: 40, height: 850, marginTop: 34, justifyContent: "center" }}>
        <div style={{ width: 478 }}>
          <VideoCard label="Before · Game capture">
            <OffthreadVideo
              src={staticFile("video/cannon-attack-capture.mp4")}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: "pixelated" }}
            />
          </VideoCard>
        </div>
        <div style={{ alignSelf: "center", color: colors.orange, fontFamily: display, fontSize: 74 }}>→</div>
        <div style={{ width: 478 }}>
          <VideoCard label="After · Remotion Short" accent={colors.orange}>
            <CannonAttackShort />
          </VideoCard>
        </div>
        <div style={{ width: 480, alignSelf: "center", paddingLeft: 20 }}>
          <div style={{ color: colors.cream, fontFamily: display, fontSize: 58, lineHeight: 1.06 }}>
            Repeatable,
            <br />
            code-driven editing
          </div>
          <div style={{ marginTop: 30, color: colors.muted, fontFamily: font, fontSize: 27, lineHeight: 1.5 }}>
            Re-capture the game, adjust the composition, then render the finished social video with
            one command.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  </Fade>
);

const FinalShort: React.FC = () => (
  <Fade duration={360}>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", left: 118, top: 124, width: 430 }}>
        <Eyebrow>The result</Eyebrow>
        <div style={{ marginTop: 22, color: colors.cream, fontFamily: display, fontSize: 76, lineHeight: 1 }}>
          A game moment,
          <br />
          ready to share
        </div>
        <div style={{ marginTop: 30, color: colors.muted, fontFamily: font, fontSize: 28, lineHeight: 1.48 }}>
          The final 1080 × 1920 YouTube Short, rendered directly from the composition.
        </div>
      </div>
      <div style={{ width: 552, height: 982, marginLeft: 530 }}>
        <VideoCard label="Final YouTube Short" accent={colors.orange}>
          <CannonAttackShort />
        </VideoCard>
      </div>
    </AbsoluteFill>
  </Fade>
);

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [0, 22], [30, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ transform: `translateY(${rise}px)` }}>
        <Eyebrow>Built with Codex</Eyebrow>
        <div style={{ marginTop: 22, color: colors.cream, fontFamily: display, fontSize: 88 }}>
          Capture. Iterate. Render.
        </div>
        <div style={{ marginTop: 24, color: colors.muted, fontFamily: font, fontSize: 31 }}>
          Hero's Bounty cannon showcase · Phaser + Remotion
        </div>
        <div style={{ marginTop: 44, color: colors.cyan, fontFamily: "monospace", fontSize: 27 }}>
          npm run video:render:buildathon
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const BuildathonShowcase: React.FC = () => (
  <AbsoluteFill
    style={{
      overflow: "hidden",
      background: `radial-gradient(circle at 80% 15%, #202b35 0%, ${colors.ink} 47%, #06080c 100%)`,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.16,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    <Scene from={0} duration={150}><Intro /></Scene>
    <Scene from={150} duration={330}><RawCapture /></Scene>
    <Scene from={480} duration={330}><CodeWorkflow /></Scene>
    <Scene from={810} duration={270}><BeforeAfter /></Scene>
    <Scene from={1080} duration={360}><FinalShort /></Scene>
    <Scene from={1440} duration={150}><Outro /></Scene>
  </AbsoluteFill>
);
