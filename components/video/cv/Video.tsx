import { Composition } from "remotion";
import { MyCV } from "./mycv";
import { silvia } from "./silvia";

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="MyCV"
        component={MyCV}
        durationInFrames={180 + silvia.positions.length * 90 + 120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={silvia}
      />
    </>
  );
};
