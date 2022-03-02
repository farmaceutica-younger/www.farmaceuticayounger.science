import { Layout } from "components/layout";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { db } from "services/db";
import slugify from "slugify";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
type Region = PageProps["regions"][number];

const SectionPage = ({ regions }: PageProps) => {
  return (
    <Layout>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-pink-600 text-3xl leading-9 tracking-tight font-extrabold  sm:text-4xl sm:leading-10">
              #FarmaInItaly
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
              La rubrica che ti porterà a scoprire regione dopo regione tutte le
              eccellenze presenti sul nostro territorio nazionale del settore
              Life Science
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {regions.map((region) => (
              <RegionPreview key={region.region} region={region} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SectionPage;

interface RegionProps {
  region: Region;
}

const RegionPreview = ({ region }: RegionProps) => {
  const regionSlug = slugify(region.region, { lower: true });
  const href = `/farmainitaly/${regionSlug}`;
  const image = `https://res.cloudinary.com/dbdvy5b2z/image/upload/v1646168992/fy/pharmainitaly/${imageMap[regionSlug]}`;

  return (
    <Link href={href}>
      <div className="mt-4 max-w-lg flex flex-col rounded-lg hover:shadow-2xl shadow-lg overflow-hidden">
        <div className="flex-1 bg-white flex flex-col justify-between">
          <div className="flex-1">
            <div className="block">
              <img src={image} className="w-full aspect-video" />
              <div className="px-3 py-4">
                <h3 className="text-xl truncate-2-lines leading-7 text-gray-800 font-bold">
                  {region.region}
                </h3>
                <p className="text-gray-600">{region._count} aziende</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const getStaticProps = async () => {
  const res = await db.pharmaItaly.groupBy({
    by: ["region"],
    _count: true,
    where: {
      public: true,
    },
  });
  return {
    props: {
      regions: res,
    },
    revalidate: 60 * 10,
  };
};

const imageMap: { [k: string]: string } = {
  veneto: "veneto_qugm4e",
  abruzzo: "abruzzo_fpsevp",
  "emilia-romagna": "emilia-romagna_vtsmx5",
  piemonte: "piemonte_ug18zr",
  sicilia: "sicilia_lbbbp7",
};
