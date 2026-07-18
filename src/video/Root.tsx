import React from "react";
import { Composition, registerRoot } from "remotion";
import { BuildathonShowcase } from "./BuildathonShowcase";
import { CannonAttackShort } from "./CannonAttackShort";

const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="CannonAttackShort"
      component={CannonAttackShort}
      durationInFrames={330}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="BuildathonShowcase"
      component={BuildathonShowcase}
      durationInFrames={1590}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);

registerRoot(RemotionRoot);
