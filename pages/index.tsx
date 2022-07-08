import { PostsList } from "components/blog";
import { EventCTA } from "components/cta/event";
import { Footer } from "components/footer";
import { GmpCta } from "components/gmp-cta";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import YouTube from "react-youtube";
import { resizeCloudinaryImage } from "utils/cloudinary-url";
import { db } from "../services/db";

export default function Home({
  posts,
  nextEvent,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <SEO title="Farmaceutica Younger" />
      <Header />
      <main>
        <Silvia image="/silvia.jpg" />
        {nextEvent && <EventCTA event={nextEvent} />}
        <Interviews />
        <GmpCta />
        <div className="relative sm:max-h-[2200px] sm:overflow-hidden">
          <PostsList posts={posts} title="Gli ultimi articoli" description="" />
          <div className="absolute left-0 right-0 bottom-0 z-10  hidden h-40 justify-center bg-gradient-to-t from-slate-100/[0.9] to-slate-100/[0] pt-10 md:flex">
            <div>
              <Link href="/blog">
                <a className="focus:shadow-outline-pink flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-pink-500 focus:border-pink-700 focus:outline-none md:py-4 md:px-10 md:text-lg">
                  Vedi tutti gli articoli
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="sm:hidden">
          <Link href="/blog">
            <a className="focus:shadow-outline-pink m-auto flex w-full max-w-sm items-center justify-center rounded-md border border-transparent bg-pink-600 px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-pink-500 focus:border-pink-700 focus:outline-none md:py-4 md:px-10 md:text-lg">
              Vedi tutti gli articoli
            </a>
          </Link>
        </div>
        <Associazione />
      </main>
      <Footer />
    </div>
  );
}

const Interviews = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 bg-stone-100 p-10 md:flex-row md:space-y-0 md:space-x-2">
      <div className="card w-96 max-w-full bg-base-100 shadow-xl ">
        <div className="asp"></div>
        <figure>
          <img
            className=""
            src={resizeCloudinaryImage(
              "https://res.cloudinary.com/dbdvy5b2z/image/upload/f_auto,w_400/v1656171275/fy/interviste/IMAGE_2022-06-25_17_34_30_izedad.jpg"
            )}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Intervista a Monica Poggio</h2>
          <p>
            L&apos;AD di Bayer si racconta a Farmaceutica Younger con questo
            video: un omaggio alle donne che stanno contribuendo con il loro
            talento al progresso nei campi delle scienze della vita...
          </p>
          <div className="card-actions mt-2 justify-end">
            <a
              href="https://www.youtube.com/watch?v=MB9CdK2BZgc"
              target="_blank"
              className="btn btn-primary btn-sm"
              rel="noreferrer"
            >
              Guarda il Video
            </a>
          </div>
        </div>
      </div>
      <div className="card w-96 max-w-full bg-base-100 shadow-xl ">
        <figure>
          <img
            src={resizeCloudinaryImage(
              "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1656171272/fy/interviste/IMAGE_2022-06-25_17_34_28_v9hldt.jpg",
              500
            )}
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Intervista a Massimo Scaccabarozzi</h2>
          <p>
            Presidente di Janssen Italia, Presidente di Farmindustria, Massimo
            Scaccabarozzi si racconta ai ragazzi di Farmaceutica Younger...
          </p>
          <div className="card-actions mt-2 justify-end">
            <Link href="/blog/2022/2/intervista-massimo-scaccabarozzi">
              <a className="btn btn-primary btn-sm">Leggi</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Silvia = ({ image }: { image: string }) => {
  return (
    <section className="overflow-hidden bg-white">
      <div className="relative mx-auto max-w-screen-xl px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:py-20">
        <svg
          className="absolute top-full left-0 translate-x-80 -translate-y-24 transform lg:hidden"
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
          className="absolute right-full top-1/2 hidden translate-x-1/2 -translate-y-1/2 transform lg:block"
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
              className="absolute top-0 left-0 h-36 w-36 -translate-x-8 -translate-y-24 transform text-pink-200 opacity-50"
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
              <div className="text-md leading-2 font-medium text-gray-700 lg:text-xl ">
                <p>
                  Benvenuto! Sono Silvia Vernotico, ideatrice e curatrice del
                  blog e presidente dell&apos;associazione{" "}
                  <span className="font-bold"> Farmaceutica Younger</span>: la
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
                      <div className="text-base font-medium leading-6 text-gray-900">
                        Silvia Vernotico {"     "}
                      </div>
                      <div className="text-base font-medium leading-6 text-pink-600">
                        Presidente e Founder
                      </div>
                      <div className="mt-4 space-x-2">
                        <a
                          className="rounded bg-pink-200 px-4  py-2 text-pink-600 ring-pink-800 transition-all hover:ring-2"
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
                          className="rounded bg-pink-200 px-4  py-2 text-pink-600 ring-pink-800 transition-all hover:ring-2"
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
    <div className="overflow-hidden bg-gray-50">
      <div className="relative mx-auto max-w-screen-xl py-12 px-4 sm:px-6 lg:px-8">
        <svg
          className="absolute top-0 left-full -translate-x-1/2 -translate-y-3/4 transform lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
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
            <h3 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              <span className="text-pink-600">Sostieni</span> Farmaceutica
              Younger
            </h3>
          </div>
          <div className="mt-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:col-span-2 lg:mt-0">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-pink-500 text-white">
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
              <div className="mt-5 flex h-48 flex-col">
                <h4 className="text-lg font-medium leading-6 text-gray-900">
                  La Community
                </h4>
                <p className="mt-2 flex-grow text-base leading-6 text-gray-500">
                  Siamo un gruppo di giovani appassionati come te del mondo
                  Farmaceutico! Con la voglia di scambiarsi idee, spunti e
                  opinioni per accrescere professionalmente.
                </p>

                <a
                  href="https://t.me/lacommunitydiFarmaceuticaYounger"
                  target="_blank"
                  className="mt-2 block rounded border-2 border-pink-500 px-4 py-2 text-center text-pink-500 hover:bg-pink-500 hover:text-white"
                  rel="noreferrer"
                >
                  Entra in Telegram
                </a>
              </div>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-pink-500 text-white">
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
              <div className="mt-5 flex h-48 flex-col">
                <h4 className="text-lg font-medium leading-6 text-gray-900">
                  L&apos;Aperitivo
                </h4>
                <p className="mt-2 flex-grow text-base leading-6 text-gray-500">
                  Se ti piace il progetto e vuoi aiutarci concretamente puoi
                  fare una piccola donazione simbolica offrendoci un aperitivo!
                </p>
                <a
                  href="https://www.paypal.com/paypalme/farmaceuticayounger"
                  target="_blank"
                  className="mt-2 block rounded border-2 border-pink-500 px-4 py-2 text-center text-pink-500 hover:bg-pink-500 hover:text-white "
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
      <main className="mx-auto mt-8 max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20 xl:mt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base"></div>
            <h2 className="mt-1 text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-6xl sm:leading-none lg:text-5xl xl:text-6xl">
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
                  className="focus:shadow-outline-pink flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-pink-500 focus:border-pink-700 focus:outline-none md:py-4 md:px-10 md:text-lg"
                  rel="noreferrer"
                >
                  Diventa Socio
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="/associazione">
                  <a className="focus:shadow-outline-pink flex w-full items-center justify-center rounded-md border border-transparent bg-pink-100 px-8 py-3 text-base font-medium leading-6 text-pink-700 transition duration-150 ease-in-out hover:bg-pink-50 hover:text-pink-600 focus:border-pink-300 focus:outline-none md:py-4 md:px-10 md:text-lg">
                    Scopri di più
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="focus:shadow-outline relative block w-full overflow-hidden rounded-lg focus:outline-none">
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

const getPosts = () => {
  return db.post.findMany({
    take: 18,
    where: {
      publishedTime: {
        lte: new Date(),
      },
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
};

const getNextEvent = () => {
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);
  return db.event.findFirst({
    orderBy: {
      startDate: "asc",
    },
    where: {
      startDate: {
        gte: startOfToday,
      },
      slug: {
        not: null,
      },
    },
  });
};

export const getStaticProps = async () => {
  const posts = await getPosts();
  const nextEvent = await getNextEvent();
  return {
    props: {
      posts,
      nextEvent,
    },
    revalidate: 10 * 60,
  };
};
