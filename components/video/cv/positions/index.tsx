import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export interface PositionProps {
	from: string;
	to: string;
	company: string;
	location: string;
	description: string;
	image: string;
}

export const Position = (props: PositionProps) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const developmentIn = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const developmentOut = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame: frame - 50,
	});

	const development = developmentIn + 2 * developmentOut;

	return (
		<div className="grid grid-cols-3 w-full">
			<div className="w-full grid place-content-center">
				<img
					style={{
						transform: `translateY(${(1 - development) * 800}px)`,
					}}
					className="rounded-full h-[400px] aspect-square object-cover"
					src={props.image}
					alt={props.company}
				/>
			</div>
			<div
				style={{
					transform: `translateX(${(1 - development) * 800}px)`,
				}}
				className="flex flex-col justify-center col-span-2 text-white"
			>
				<h1 className="text-6xl">
					{props.from} - {props.to}
				</h1>
				<h1 className="text-8xl font-bold mt-8">{props.company}</h1>
				<p className="text-7xl font-thin text-pink-50 mt-8">
					{props.description}
				</p>
			</div>
		</div>
	);
};
