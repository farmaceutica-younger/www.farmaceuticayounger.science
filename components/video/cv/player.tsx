import { Player } from "@remotion/player";
import { MyCV, MyCVProps, totalLength } from "./mycv";

const Video = (props: MyCVProps) => {
  return (
    <Player
      component={MyCV}
      durationInFrames={totalLength(props.positions.length)}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      inputProps={{ ...props }}
      controls
      loop
      style={{
        width: 640,
        height: 480,
      }}
    />
  );
};

export default Video;
