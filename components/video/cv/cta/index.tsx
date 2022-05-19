import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import qrcode from './qrcode.png';

export const CTA = () => {
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
		<div className="grid grid-cols-3 w-full">
			<div className="w-full grid place-content-center">
				<img
					style={{
						transform: `translateY(${(1 - development) * 800}px)`,
					}}
					className="rounded-md h-[400px] aspect-square object-cover"
					src={qrcode}
					alt={'QrCode'}
				/>
			</div>
			<div
				style={{
					transform: `translateX(${(1 - development) * 800}px)`,
				}}
				className="flex flex-col justify-center col-span-2 text-white"
			>
				<h1 className="text-6xl">Vuoi generarre il tuo? </h1>
				<h1 className="text-8xl font-bold mt-8">
					Commanta! E segui il mio blog!
				</h1>
				<p className="text-7xl font-thin text-pink-50 mt-8">ludusrusso.dev</p>
			</div>
		</div>
	);
};
