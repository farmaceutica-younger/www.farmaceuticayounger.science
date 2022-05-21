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
		frame: frame - 80,
	});

	const development = developmentIn + 2 * developmentOut;

	return (
		<div className="grid w-full grid-cols-3">
			<div className="grid w-full place-content-center">
				<img
					style={{
						transform: `translateY(${(1 - development) * 800}px)`,
					}}
					className="aspect-square h-[400px] rounded-full object-cover"
					src={props.image}
					alt={props.company}
				/>
			</div>
			<div
				style={{
					transform: `translateX(${(1 - development) * 800}px)`,
				}}
				className="col-span-2 flex flex-col justify-center text-white"
			>
				<h1 className="text-6xl">
					{props.from} - {props.to}
				</h1>
				<p className="mt-8 text-8xl font-bold">{props.company}</p>
				{props.description.split(',').map((line, i) => (
					<p key={i} className="mt-8 text-7xl font-thin text-pink-50">
						{line}
					</p>
				))}
			</div>
		</div>
	);
};
