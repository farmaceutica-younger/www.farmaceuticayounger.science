import {
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	VideoConfig,
} from 'remotion';
import {FYLogo} from '../logo';
import {Arc} from './Arc';

interface Position {
	startFrame: number;
	scale: number;
	position: {
		x: number;
		y: number;
	};
}

const positions: Position[] = [
	{
		startFrame: 0,
		scale: 1,
		position: {
			x: 0,
			y: 0,
		},
	},
	{
		startFrame: 20,
		scale: 1,
		position: {
			x: 0,
			y: 0,
		},
	},
	{
		startFrame: 30,
		scale: 1,
		position: {
			x: 0,
			y: -0.4,
		},
	},
	{
		startFrame: 60,
		scale: 1,
		position: {
			x: 0,
			y: -0.4,
		},
	},
	{
		startFrame: 110,
		scale: 1,
		position: {
			x: 0,
			y: -0.4,
		},
	},
	{
		startFrame: 120,
		scale: 0.2,
		position: {
			x: -0.9,
			y: -0.86,
		},
	},
];

export const Logo: React.FC<{
	transitionStart: number;
}> = ({transitionStart}) => {
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

	const rotationDevelopment = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const scaleIn = spring({
		frame,
		config: {
			mass: 0.5,
		},
		fps: videoConfig.fps,
	});

	let scale = frame < 50 ? scaleIn : 1;

	const {scale: s, tx, ty} = getInterpolation(positions, frame, videoConfig);
	scale = scale * s;

	const logoRotation = interpolate(frame, [0, 120], [0, 360]);

	return (
		<div className="h-full w-full">
			<div
				style={{
					position: 'absolute',
					width: videoConfig.width,
					height: videoConfig.height,
					transform: `scale(${scale}) translateX(${tx}px) translateY(${ty}px) rotate(${logoRotation}deg)`,
				}}
			>
				<Arc
					rotateProgress={rotationDevelopment}
					progress={development}
					rotation={30}
				/>
				<Arc
					rotateProgress={rotationDevelopment}
					rotation={90}
					progress={development}
				/>
				<Arc
					rotateProgress={rotationDevelopment}
					rotation={-30}
					progress={development}
				/>
			</div>
			<div
				style={{
					position: 'absolute',
					width: videoConfig.width,
					height: videoConfig.height,
					transform: `scale(${scale}) translateX(${tx}px) translateY(${ty}px) rotate(${-logoRotation}deg)`,
				}}
			>
				<FYLogo scale={1} />
			</div>
		</div>
	);
};

const getCurrentPosition = (pos: Position[], frame: number) => {
	for (let i = 0; i < pos.length; i++) {
		const curr = pos[i];
		const next = pos[i + 1];
		const start = curr.startFrame;
		const stop = next?.startFrame || 10000000000;
		if (frame >= start && frame < stop) {
			return [pos[i - 1] || pos[0], pos[i], pos[i + 1] || pos[pos.length - 1]];
		}
	}
	const i = pos.length - 1;
	return [pos[i - 1] || pos[0], pos[i], pos[i + 1] || pos[pos.length - 1]];
};

const getInterpolation = (
	positions: Position[],
	frame: number,
	videoConfig: VideoConfig
) => {
	const [prev, current, next] = getCurrentPosition(positions, frame);

	const scale = interpolateWithPos(
		frame,
		[current.startFrame, next.startFrame],
		[current.scale, next.scale]
	);
	let tx = interpolateWithPos(
		frame,
		[current.startFrame, next.startFrame],
		[current.position.x, next.position.x]
	);
	let ty = interpolateWithPos(
		frame,
		[current.startFrame, next.startFrame],
		[current.position.y, next.position.y]
	);

	tx = (tx * videoConfig.width) / 2 / scale;
	ty = (ty * videoConfig.height) / 2 / scale;

	return {scale, tx, ty};
};

const interpolateWithPos = (
	frame: number,
	input: [number, number],
	output: [number, number]
) => {
	if (input[0] === input[1]) {
		return output[0];
	}
	return interpolate(frame, input, output);
};
