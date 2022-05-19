import { Audio, Sequence } from "remotion";
import { CVVideo, CVVideoProps } from "./cv";
import { Intro } from "./Intro";
import { Logo } from "./Intro/Logo";
import { Position, PositionProps } from "./positions";
import { CTA } from "./cta";

export const MyCV = (props: CVVideoProps) => {
  return (
    <div className="h-full w-full bg-pink-400">
      {/* <Audio
        src={audio}
        startFrom={0} // if composition is 30fps, then it will start at 2s
      /> */}
      <Sequence from={0}>
        <Logo transitionStart={0} />
      </Sequence>
      <Sequence from={0} durationInFrames={120}>
        <Intro titleText={props.name} titleColor="" />
      </Sequence>
      <Sequence from={120} durationInFrames={60}>
        <CVVideo {...props} />
      </Sequence>
      {positions.map((p, idx) => (
        <Sequence key={idx} from={180 + 60 * idx} durationInFrames={60}>
          <Position {...p} />
        </Sequence>
      ))}
      <Sequence from={180 + 60 * positions.length} durationInFrames={60}>
        <CTA />
      </Sequence>
    </div>
  );
};

const positions: PositionProps[] = [
  {
    from: "Ottobre 2007",
    to: "Maggio 2013",
    company: "👩🏻‍🎓 Unversità di Perugia",
    description: "Laurea in CFT 💊",
    location: "Perugia, Italia",
    image:
      "https://www.secondamanoitalia.it/wp-content/uploads/2021/09/universita-perugia.jpg",
  },
  {
    from: "Febbraio 2014",
    to: "Febbraio 2015",
    company: "👩🏻‍🎓 Unversità di Perugia",
    description: "Master 2° Livello in CFT 💊",
    location: "Perugia, Italia",
    image:
      "https://www.secondamanoitalia.it/wp-content/uploads/2021/09/universita-perugia.jpg",
  },
  {
    from: "Ottobre 2014",
    to: "Febbraio 2015",
    company: "Sanofi S.p.A.",
    description: "Stage Quality System ",
    location: "L'Aquila, Italia",
    image:
      "https://forbes.it/wp-content/uploads/2020/12/guna-100-eccellenze-forbes-csr-.jpg",
  },
  {
    from: "Giugno 2013",
    to: "Dicembre 2021",
    company: "Guna S.p.A.",
    description: "Production Manager 💊",
    location: "Milano, Italia",
    image:
      "https://forbes.it/wp-content/uploads/2020/12/guna-100-eccellenze-forbes-csr-.jpg",
  },
  {
    from: "Gennaio 2022",
    to: "in corso",
    company: "Eli Lilly S.p.A.",
    description: "Production Supervisor 💊",
    location: "Sesto Fiorentino, Firenze, Italia",
    image: "https://www.fedaiisf.it/wp-content/uploads/2015/01/Lilly.jpg",
  },
];

const ludoPositions: PositionProps[] = [
  {
    from: "Gennaio 2008",
    to: "Ottobre 2013",
    company: "Politecnico di Torino",
    description: "Laurea in Ingegneria Meccatronica 🦾",
    location: "Torino, Italia",
    image: "https://s3.eu-central-1.amazonaws.com/media.tutored/7101",
  },
  {
    from: "Giugno 2013",
    to: "Dicembre 2017",
    company: "Politecnico di Torino",
    description: "PhD in Cloud Robotics 🤖",
    location: "Torino, Italia",
    image:
      "https://www.repstatic.it/content/localirep/img/rep-torino/2018/02/17/115557060-0969393a-dcc8-47b7-a5e9-90d63916aece.jpg",
  },
  {
    from: "Gennaio 2018",
    to: "in corso",
    company: "Me stesso",
    description: "Cloud Developer Consultant ☁",
    location: "Milano, Italia",
    image:
      "https://www.scopriremilano.it/wp-content/uploads/2021/09/panorama_milano-scaled.jpg",
  },
];
