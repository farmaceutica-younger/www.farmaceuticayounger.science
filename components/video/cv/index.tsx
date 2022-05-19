import { Player } from "@remotion/player";
import { MyCV } from "./mycv";

const Video = () => {
  return (
    <Player
      component={MyCV}
      durationInFrames={420}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      inputProps={silvia}
      controls
      loop
      style={{
        width: 640,
        height: 480,
      }}
    />
  );
};

const silvia = {
  image: "https://www.farmaceuticayounger.science/silvia.jpg",
  name: "Silvia Vernotico",
  descritpion: "test",
  role: "CTF Doc",
};

export default Video;
