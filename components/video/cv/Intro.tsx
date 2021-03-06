import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Subtitle } from "./Intro/Subtitle";
import { Title } from "./Intro/Title";

export const Intro: React.FC<{
  titleText: string;
  titleColor: string;
}> = ({ titleText, titleColor }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const transitionStart = 25;

  return (
    <div style={{ flex: 1 }}>
      <div>
        <Sequence from={transitionStart + 10}>
          <Title titleText={titleText} titleColor={titleColor} />
        </Sequence>
        <Sequence from={transitionStart + 50}>
          <Subtitle />
        </Sequence>
      </div>
    </div>
  );
};
