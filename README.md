# MiniDefense YouTube Short — OpenAI Build-a-thon 2026

This project shows how I used Codex to turn a real gameplay moment from my Phaser game, MiniDefense, into a polished vertical YouTube Short with Remotion.

Codex helped me create a repeatable workflow for capturing a deterministic cannon attack, formatting it for a 1080 × 1920 canvas, iterating on timing in Remotion Studio, adding comic-book impact words, and rendering the finished video.

## Videos

- **Finished YouTube Short:** [`out/cannon-attack-short.mp4`](out/cannon-attack-short.mp4)
- **Raw gameplay capture:** [`public/video/cannon-attack-capture.mp4`](public/video/cannon-attack-capture.mp4)
- **Build-a-thon showcase:** the `BuildathonShowcase` Remotion composition explains the workflow and presents the final result.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run preview
```

Open either composition in Remotion Studio:

- `CannonAttackShort` — the 11-second vertical video
- `BuildathonShowcase` — the 53-second submission walkthrough

## Render

```bash
npm run render:short
npm run render:showcase
```

Rendered videos are written to `out/`.

## Workflow

1. Capture the cannon attack from MiniDefense as portrait gameplay footage.
2. Load the capture into a frame-accurate Remotion composition.
3. Time comic action words to firing and impact moments.
4. Preview changes instantly in Remotion Studio.
5. Render the finished YouTube Short and build-a-thon presentation from code.

## Built with

- OpenAI Codex
- Remotion
- React and TypeScript
- Phaser gameplay footage from MiniDefense
