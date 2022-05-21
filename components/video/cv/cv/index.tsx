import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const CVVideo = (props: CVVideoProps) => {
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
          className="aspect-square h-[400px] rounded-full object-cover"
          src={props.image}
          alt={props.name}
        />
      </div>
      <div
        style={{
          transform: `translateX(${(1 - development) * 800}px)`,
        }}
        className="col-span-2 flex flex-col justify-center text-white"
      >
        <h1 className="text-6xl">Ciao 👋! Sono</h1>
        <h1 className="mt-8 text-8xl font-bold">{props.name}</h1>
        <p className="mt-3 text-6xl font-thin italic text-pink-50">
          {props.bio}
        </p>
        <p className="mt-20 text-6xl font-thin text-pink-50">il mio motto è</p>
        <p className="mt-8 text-7xl italic text-pink-50">{props.motto}</p>
      </div>
    </div>
  );
};

export interface CVVideoProps {
  image: string;
  name: string;
  motto: string;
  bio: string;
}
