import { PostsList } from "components/blog";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import YouTube from "react-youtube";
import { db } from "../services/db";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <SEO title="Farmcautica Younger" />

      <Header />
      <main>
        <Silvia image="/silvia.jpg" />
        <NewsFarmaItaly />
        <PostsList posts={posts} title="Gli ultimi articoli" description="" />
      </main>
      <Footer />
    </div>
  );
}

const Silvia = ({ image }: { image: string }) => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="relative max-w-screen-xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 lg:py-20">
        <svg
          className="absolute top-full left-0 transform translate-x-80 -translate-y-24 lg:hidden"
          width="784"
          height="404"
          fill="none"
          viewBox="0 0 784 404"
        >
          <defs>
            <pattern
              id="e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="784"
            height="404"
            fill="url(#e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32)"
          />
        </svg>

        <svg
          className="hidden lg:block absolute right-full top-1/2 transform translate-x-1/2 -translate-y-1/2"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="56409614-3d62-4985-9a10-7ca758a8f4f0"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#56409614-3d62-4985-9a10-7ca758a8f4f0)"
          />
        </svg>

        <div className="relative lg:flex lg:items-center">
          <div className="hidden lg:block lg:flex-shrink-0">
            <img
              className="h-64 w-64 rounded-full xl:h-80 xl:w-80"
              src={image}
              alt=""
            />
          </div>

          <div className="relative lg:ml-10">
            <svg
              className="absolute top-0 left-0 transform -translate-x-8 -translate-y-24 h-36 w-36 text-pink-200 opacity-50"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 144 144"
            >
              <path
                strokeWidth="2"
                d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
              />
            </svg>
            <blockquote className="relative">
              <div className="text-md leading-2 lg:text-xl font-medium text-gray-700 ">
                <p>
                  Benvenuto! Sono Silvia Vernotico, ideatrice e curatrice del
                  blog e presidente dell&apos;associazione{" "}
                  <span className="font-bold"> Farmaceutica Younger</span> : la
                  piattaforma Young tutta italiana rivolta a giovani laureati in
                  discipline scientifiche o appassionati dell&apos;universo
                  farmaceutico, dove conoscere le regole e i meccanismi del
                  mondo Farmaceutico e ampliare il tuo network!
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex">
                  <div className="flex-shrink-0 lg:hidden">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={image}
                      alt=""
                    />
                  </div>
                  <div className="flex">
                    <div className="ml-4 lg:ml-0">
                      <div className="text-base leading-6 font-medium text-gray-900">
                        Silvia Vernotico {"     "}
                      </div>
                      <div className="text-base leading-6 font-medium text-pink-600">
                        Presidente e Founder
                      </div>
                      <div className="mt-4 space-x-2">
                        <a
                          className="bg-pink-200 ring-pink-800 hover:ring-2  transition-all px-4 py-2 text-pink-600 rounded"
                          target="_blank"
                          href="https://www.linkedin.com/in/silvia-vernotico-09b35977/"
                          rel="noreferrer"
                        >
                          <span className="hidden md:inline">
                            Aggiungimi su Linkedin
                          </span>
                          <span className="md:hidden">Linkedin</span>
                        </a>
                        <a
                          className="bg-pink-200 ring-pink-800 hover:ring-2  transition-all px-4 py-2 text-pink-600 rounded"
                          href="https://t.me/silvia_farmaceuticayounger"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="hidden md:inline">
                            Scrivimi su Telegram
                          </span>
                          <span className="md:hidden">Telegram</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

const Help = () => {
  return (
    <div className="bg-gray-50 overflow-hidden">
      <div className="relative max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <svg
          className="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
          />
        </svg>
        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h3 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              <span className="text-pink-600">Sostieni</span> Farmaceutica
              Younger
            </h3>
          </div>
          <div className="mt-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:col-span-2 lg:mt-0">
            <div>
              <span className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </span>
              <div className="mt-5 flex flex-col h-48">
                <h4 className="text-lg leading-6 font-medium text-gray-900">
                  La Community
                </h4>
                <p className="mt-2 text-base leading-6 text-gray-500 flex-grow">
                  Siamo un gruppo di giovani appassionati come te del mondo
                  Farmaceutico! Con la voglia di scambiarsi idee, spunti e
                  opinioni per accrescere professionalmente.
                </p>

                <a
                  href="https://t.me/lacommunitydiFarmaceuticaYounger"
                  target="_blank"
                  className="block text-center rounded text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-white border-2 mt-2 px-4 py-2"
                  rel="noreferrer"
                >
                  Entra in Telegram
                </a>
              </div>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 576 512"
                  stroke="currentColor"
                >
                  <path
                    fill="currentColor"
                    d="M296 464h-56V338.78l168.74-168.73c15.52-15.52 4.53-42.05-17.42-42.05H24.68c-21.95 0-32.94 26.53-17.42 42.05L176 338.78V464h-56c-22.09 0-40 17.91-40 40 0 4.42 3.58 8 8 8h240c4.42 0 8-3.58 8-8 0-22.09-17.91-40-40-40zM432 0c-62.61 0-115.35 40.2-135.18 96h52.54c16.65-28.55 47.27-48 82.64-48 52.93 0 96 43.06 96 96s-43.07 96-96 96c-14.04 0-27.29-3.2-39.32-8.64l-35.26 35.26C379.23 279.92 404.59 288 432 288c79.53 0 144-64.47 144-144S511.53 0 432 0z"
                  ></path>
                </svg>
              </div>
              <div className="mt-5 flex flex-col h-48">
                <h4 className="text-lg leading-6 font-medium text-gray-900">
                  L&apos;Aperitivo
                </h4>
                <p className="mt-2 text-base leading-6 text-gray-500 flex-grow">
                  Se ti piace il progetto e vuoi aiutarci concretamente puoi
                  fare una piccola donazione simbolica offrendoci un aperitivo!
                </p>
                <a
                  href="https://www.paypal.com/paypalme/farmaceuticayounger"
                  target="_blank"
                  className="block text-center rounded text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-white border-2 mt-2 px-4 py-2 "
                  rel="noreferrer"
                >
                  Dona con PayPal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Associazione = () => (
  <div className="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
    <div>
      <main className="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20 xl:mt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base"></div>
            <h2 className="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
              L&apos;associazione
              <br />
              <span className="text-pink-600">Farmaceutica Younger</span>
            </h2>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Il <span className="font-semibold ">18 settembre 2020</span>{" "}
              prende vita l&apos;associazione{" "}
              <span className="font-bold text-pink-600">
                Farmaceutica Younger
              </span>{" "}
              nata con l&apos;obiettivo di tendere una mano ai giovani che hanno
              voglia di conoscere sempre di più sul mondo del farmaceutico.
            </p>

            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfUpTiuoEwR0b9uFjjKiQYprxNm7CalPCPvdPYNV3_W-YCaUw/viewform"
                  target="_blank"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  rel="noreferrer"
                >
                  Diventa Socio
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="/associazione">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-pink-700 bg-pink-100 hover:text-pink-600 hover:bg-pink-50 focus:outline-none focus:shadow-outline-pink focus:border-pink-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                    Scopri di più
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:shadow-outline">
                <YouTube
                  className="w-full"
                  opts={{
                    host: "https://www.youtube-nocookie.com",
                  }}
                  videoId="8FcD_v-EiVI"
                ></YouTube>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

const NewsFarmaItaly = () => (
  <div className="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
    <div>
      <main className="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20 xl:mt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
              {" "}
              Sostieni l&apos;associazione
            </div>
            <h2 className="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
              Acquista il
              <br />
              <span className="text-pink-600">#GMP PocketBook</span>
            </h2>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Il{" "}
              <span className="text-pink-600 font-semibold italic">
                GMP PocketBook
              </span>{" "}
              è una traduzione delle Good Manufacturing Practice Volume 4, Parte
              I che tratta dei Requisiti base che deve avere un prodotto
              medicinale per essere fabbricato. Fondamentali per mettere in
              piedi un sistema di qualità che garantisca che il farmaco sia di
              qualità, sicuro ed efficace.
            </p>

            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start sm:space-x-2 space-y-2 sm:space-y-0">
              <div className="rounded-md shadow">
                <Link href="/ecommerce">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                    Acquista
                  </a>
                </Link>
              </div>
              <div className="rounded-md shadow">
                <Link href="/associazione">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-stone-600 hover:bg-stone-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                    Scopri l&apos;Associazione
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <Link href="/farmainitaly/veneto">
                <a className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:shadow-outline">
                  <img
                    src="https://res.cloudinary.com/dbdvy5b2z/image/upload/c_scale,w_600/v1646564506/fy/ecommerce/book_bjsonl.jpg"
                    alt="GMP Pocket Book"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

export const getStaticProps = async () => {
  const posts = await db.post.findMany({
    take: 18,
    where: {
      path: {
        startsWith: "/",
      },
    },
    orderBy: {
      publishedTime: "desc",
    },
    select: {
      body: false,
      author: true,
      description: true,
      featuredImage: true,
      id: true,
      path: true,
      publishedTime: true,
      tags: true,
      title: true,
    },
  });
  return {
    props: {
      posts,
    },
    revalidate: 10 * 60,
  };
};
