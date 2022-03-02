import { Layout } from "components/layout";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import { db } from "services/db";
import slugify from "slugify";

const Map = dynamic(() => import("components/phamaitaly/map"), {
  ssr: false,
});

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const FarmaInItaly = ({ companies, provinces }: PageProps) => {
  const title = `📍 Farma in Italy - ${companies[0].region}`;

  return (
    <Layout>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <div className="mt-20 mx-1 md:mx-0">
        <div className="text-lg max-w-prose mx-auto mb-6">
          <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            {title}
          </h1>
        </div>
      </div>

      <div>
        <Map companies={companies} />
      </div>

      <div className="mt-20 mx-1 md:mx-0">
        <article className="relative py-16 bg-white overflow-hidden">
          <div className="max-w-4xl text-gray-500 mx-auto">
            {provinces.map((prov) => {
              const cs = companies.filter((c) => c.province === prov.province);
              return (
                <div key={prov.province} className="mb-20">
                  <h3 className="text-xl font-bold">{prov.province}</h3>
                  {cs.map((c) => (
                    <Azienda key={c.id} company={c} />
                  ))}
                </div>
              );
            })}
          </div>
          <div>
            <Banner />
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default FarmaInItaly;

type Company = PageProps["companies"][number];

const Azienda = ({ company }: { company: Company }) => {
  const gmapLink = `http://www.google.com/maps/place/${company.latitude},${company.longitude}`;
  return (
    <div>
      <p className="mt-4">
        💊 <span className="font-semibold"> {company.companyName}</span> (
        {company.city}) <span className="ml-3"></span> 📍{" "}
        <a className="text-pink-600 underline" href={gmapLink}>
          Apri in google maps
        </a>
      </p>
      <p className="mt-0">{company.description}</p>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="bg-pink-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          <span className="block">Ci siamo persi qualche azienda?</span>
          <span className="block text-pink-600">
            Segnalacelo compilando il form
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSedH0QbJyrTCrtSXT5Jh1pUmlHnrLghUnwEjaAbjZ3ZLSysyA/viewform?usp=sf_link"
              target="_blank"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
            >
              Compila il form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const regions = await db.pharmaItaly.groupBy({
    by: ["region"],
    where: {
      public: true,
    },
  });
  const paths = regions.map((r) => ({
    params: { region: slugify(r.region, { lower: true }) },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ region: string }>) => {
  const region = params?.region!.replaceAll("-", " ");
  const companies = await db.pharmaItaly.findMany({
    where: {
      region: {
        equals: region,
        mode: "insensitive",
      },
      public: true,
    },
  });

  const provinces = await db.pharmaItaly.groupBy({
    by: ["province"],
    where: {
      region: {
        equals: region,
        mode: "insensitive",
      },
      public: true,
    },
  });
  return {
    props: {
      companies,
      provinces,
    },
  };
};
