import {Composition} from 'remotion';
import {CVVideo} from './cv';
import {Intro} from './Intro';
import {Logo} from './Intro/Logo';
import {Subtitle} from './Intro/Subtitle';
import {Title} from './Intro/Title';
import {MyCV} from './mycv';
import './styles.css';

const silvia = {
	image: 'https://www.farmaceuticayounger.science/silvia.jpg',
	name: 'Silvia Vernotiico',
	descritpion: 'test',
	role: 'CTF Doc',
};

const ludo = {
	image: 'https://www.ludusrusso.dev/ludusrusso.jpg',
	name: 'Ludovico Russo',
	descritpion: 'test',
	role: '🚀 Fullstack Dev',
};

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="MyCV"
				component={MyCV}
				durationInFrames={420}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={silvia}
			/>
			<Composition
				id="Intro"
				component={Intro}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Silvia Vernotico',
					titleColor: 'black',
				}}
			/>

			<Composition
				id="Logo"
				component={Logo}
				durationInFrames={4000}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Title"
				component={Title}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Subtitle"
				component={Subtitle}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
