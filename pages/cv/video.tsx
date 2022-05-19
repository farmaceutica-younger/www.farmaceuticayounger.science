import { Footer } from "components/footer";
import { Header } from "components/header";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("components/video/cv/index"), {
  ssr: false,
});

const CVPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-sm">
        <Video />
      </div>

      <Footer />
    </>
  );
};

export default CVPage;
