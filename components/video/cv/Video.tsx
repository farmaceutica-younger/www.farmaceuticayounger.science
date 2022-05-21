import { Composition } from "remotion";
import { MyCV, totalLength } from "./mycv";
import qrcode from "./qrcode.png";
import { silvia } from "./silvia";

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="MyCV"
        component={MyCV}
        durationInFrames={totalLength(silvia.positions.length)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ ...silvia, qrcode: qrcode as unknown as string }}
      />
    </>
  );
};
