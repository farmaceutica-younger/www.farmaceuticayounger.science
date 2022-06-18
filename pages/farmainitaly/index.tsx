import { Layout } from "components/layout";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { db } from "services/db";
import slugify from "slugify";
import { resizeCloudinaryImage } from "utils/cloudinary-url";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
type Region = PageProps["regions"][number];

const SectionPage = ({ regions }: PageProps) => {
  return (
    <Layout>
      <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3"></div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-pink-600  sm:text-4xl sm:leading-10">
              #FarmaInItaly
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl leading-7 text-gray-500 sm:mt-4">
              La rubrica che ti porterà a scoprire regione dopo regione tutte le
              eccellenze presenti sul nostro territorio nazionale del settore
              Life Science
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
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
  const regionSlug = slugify(region.region, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
  const href = `/farmainitaly/${regionSlug}`;
  const image = `https://res.cloudinary.com/dbdvy5b2z/image/upload/v1646168992/fy/pharmainitaly/${imageMap[regionSlug]}`;

  return (
    <Link href={href}>
      <div className="mt-4 flex max-w-lg flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl">
        <div className="flex flex-1 flex-col justify-between bg-white">
          <div className="flex-1">
            <div className="block">
              <img
                src={resizeCloudinaryImage(image)}
                className="aspect-video w-full"
              />
              <div className="px-3 py-4">
                <h3 className="truncate-2-lines text-xl font-bold leading-7 text-gray-800">
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
