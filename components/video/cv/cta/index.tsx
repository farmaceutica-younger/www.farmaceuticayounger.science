import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const CTA = ({ qrcode }: { qrcode: string }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();
  const development = spring({
    config: {
      damping: 100,
      mass: 0.5,
    },
    fps: videoConfig.fps,
    frame,
  });

  return (
    <div className="grid w-full grid-cols-3">
      <div className="grid w-full place-content-center">
        <img
          style={{
            transform: `translateY(${(1 - development) * 800}px)`,
          }}
          className="aspect-square h-[400px] rounded-md object-cover"
          src={qrcode}
          alt={"QrCode"}
        />
      </div>
      <div
        style={{
          transform: `translateX(${(1 - development) * 800}px)`,
        }}
        className="col-span-2 flex flex-col justify-center text-white"
      >
        <h1 className="text-6xl">Vuoi generarre un video CV come il mio? </h1>
        <h1 className="mt-8 text-8xl font-bold">
          Commenta questo post e seguimi su Linkedin!
        </h1>
        <p className="mt-8 text-7xl font-thin text-pink-50">
          farmaceuticayounger.science
        </p>
      </div>
    </div>
  );
};
