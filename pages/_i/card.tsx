import { BlogIcon } from "components/icon";
import { string } from "zod";

const CardPage = () => {
  return (
    <div className="flex h-screen grid-cols-2 place-content-center space-x-2 pt-10">
      {Object.entries(colors).map(([v, c]) => (
        <div key={v} className="space-y-2">
          <Front colors={c} />
          <Back colors={c} />
        </div>
      ))}
    </div>
  );
};

const categories = [
  "r&d",
  "production",
  "marketing",
  "quality",
  "regolatorio",
  "clinical",
];
const colors: { [k: string]: Colors } = {
  amber: {
    bg: "bg-amber-400",
    ring: "ring-amber-400",
    text: "text-amber-400",
  },
  blue: {
    bg: "bg-blue-400",
    ring: "ring-blue-400",
    text: "text-blue-400",
  },
  emerald: {
    bg: "bg-emerald-400",
    ring: "ring-emerald-400",
    text: "text-emerald-400",
  },
  pink: {
    bg: "bg-pink-400",
    ring: "ring-pink-400",
    text: "text-pink-400",
  },
  gray: {
    bg: "bg-gray-400",
    ring: "ring-gray-400",
    text: "text-gray-400",
  },
  red: {
    bg: "bg-red-400",
    ring: "ring-red-400",
    text: "text-red-400",
  },
};

const cardInfo = {
  word: "Kaizen",
  taboos: ["Miglioramento", "Produzione", "Sprechi", "Qualità", "Giapponese"],
};

export default CardPage;

interface Colors {
  bg: string;
  text: string;
  ring: string;
}

const Front = ({ colors }: { colors: Colors }) => {
  return (
    <div
      className={`h-96 w-64 rounded-lg text-center shadow-2xl ring-2 ${colors.ring}`}
    >
      <div className="pt-8">
        <p className="text-4xl font-bold">{cardInfo.word}</p>
        <div className="mx-4 mt-6 overflow-hidden rounded-full">
          <div className={`h-2 w-full ${colors.bg}`}></div>
        </div>
      </div>
      <div className="mt-6 space-y-1">
        {cardInfo.taboos.map((t) => (
          <p className="text-xl">{t}</p>
        ))}
      </div>
      <div className="mt-4 grid place-content-center">
        <BlogIcon className={`${colors.text}`} />
      </div>
    </div>
  );
};

const Back = ({ colors }: { colors: Colors }) => {
  return (
    <div
      className={`h-96 w-64 rounded-lg ${colors.bg} text-center shadow-2xl ring-2 ${colors.ring}`}
    >
      <div className=" grid h-full place-content-center">
        <BlogIcon className="h-28 w-28 text-white" />
        <div className="mt-2 text-white">
          <h2 className="text-lg font-bold">Farmaceutica</h2>
          <p>Younger </p>
        </div>
      </div>
    </div>
  );
};
