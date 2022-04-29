/* This example requires Tailwind CSS v2.0+ */
import { Popover } from "@headlessui/react";
import { Footer } from "components/footer";
import { BlogIcon } from "components/icon";
import { SEO } from "components/seo";
import Image from "next/image";
import Link from "next/link";

export default function Example() {
  return (
    <>
      <SEO
        title="Brunch in GxP - Sabato 7 Maggio 2022"
        image="https://res.cloudinary.com/dbdvy5b2z/image/upload/v1649005232/fy/photo_2022-04-03_18.59.54_y42ihn.jpg"
        description="Il primo evento di Farmaceutica Younger dal Vivo per conoscerci e fare network!"
      />
      <div className="relative overflow-hidden bg-gray-50">
        <div
          className="hidden sm:absolute sm:inset-y-0 sm:block  sm:w-full"
          aria-hidden="true"
        >
          <div className="mx-auto max-w-7xl">
            <svg
              className="absolute right-full translate-y-1/4 translate-x-1/4 transform lg:translate-x-1/2"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute left-full -translate-y-3/4 -translate-x-1/4 transform md:-translate-y-1/2 lg:-translate-x-1/2"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
              />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24">
          <Popover>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <nav
                className="relative flex items-center justify-between sm:h-10 md:justify-center"
                aria-label="Global"
              >
                <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
                  <div className="flex w-full items-center justify-between md:w-auto">
                    <Link href="/">
                      <a className="flex items-center">
                        <span className="sr-only">Farmaceutica Younger</span>
                        <BlogIcon className="h-10 w-auto text-teal-600 sm:h-14" />
                        <span className="ml-2 text-teal-600 md:text-lg ">
                          Scopri il blog di Farmaceutica Younger
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </Popover>

          <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Brunch in </span>{" "}
                <span className="block text-teal-500 xl:inline">GxP</span>
              </h1>
              <p className="mt-4 text-lg font-semibold text-gray-700">
                {" "}
                Sabato 7 Maggio 2022 - Ore 11:00
              </p>
              <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Il primo evento di Farmaceutica Younger dal Vivo per conoscerci
                e fare network!
              </p>
              <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                L’evento è GRATUITO ma affrettati perché i posti sono LIMITATI!
              </p>

              <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="https://forms.gle/hpii4dGUroREaFFf7"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-400 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 md:py-4 md:px-10 md:text-lg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Prenota il tuo posto!
                  </a>
                </div>
              </div>

              <div className="m-auto mt-10 w-full">
                <img
                  className="m-auto w-full max-w-lg rounded-xl shadow-lg"
                  src="https://res.cloudinary.com/dbdvy5b2z/image/upload/v1649005232/fy/photo_2022-04-03_18.59.54_y42ihn.jpg"
                  alt="Evento"
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="prose prose-indigo mx-auto mt-6 mb-10 px-2 text-gray-500 md:prose-lg lg:prose-xl">
        <p>
          Il primo evento dal vivo con i professionisti del farmaceutico sbarca
          a Milano con l’evento BRUNCH in GxP firmato da Farmaceutica Younger!
        </p>
        <p>
          {" "}
          Sarà una imperdibile occasione per fare una carrellata sulle
          principali figure professionali del farmaceutico, giocare a suon di
          GxP con tutta la Crew di Farmaceutica Younger per allenarti a capire
          quanto ne sai del mondo del farmaceutico.
        </p>
        <p>
          Ci saremo noi di FY e un sacco di giovani afferenti dall’industria
          farmaceutica ciascuno pronto a condividere le proprie esperienze
          professionali con chi vorrà essere dei nostri!
        </p>
      </div>

      <Relators />
      <Footer />
    </>
  );
}

const people = [
  {
    name: "Maurizio Cuocolo",
    role: "Quality Assurance Auditor",
    imageUrl: "/v1641589898/fy/authors/maurizio_avi6ll.jpg",
  },
  {
    name: "Irene Carnovale",
    role: "R&D - Business Support Scientist",
    imageUrl: "/v1641520587/fy/authors/irenecarnovale_cdet9r.jpg",
  },
  {
    name: "Simone Cossari",
    role: "Laboratory System & Data Integrity Specialist",
    imageUrl: "/v1646595447/fy/authors/simone-cossari_zijf0d.jpg",
  },
  {
    name: "Domenico Di Vincenzo",
    role: "Quality Control Specialist",
    imageUrl: "/fy/authors/giorgia_ixtzta.jpg",
  },
  {
    name: "Silvia Garau",
    role: "Brand Manager",
    imageUrl: "/fy/authors/silvia-garau_klhyxe.jpg",
  },
  {
    name: "Carola Rivaletto",
    role: "Change Control & Regulatory Affairs",
    imageUrl: "/fy/authors/carola_pfcadc.jpg",
  },
  {
    name: "Antonino Barbera",
    role: "Technology Transfer",
    imageUrl: "/fy/authors/antonino_hwpf6a.jpg",
  },
  {
    name: "Filippo Maria Di Dona",
    role: "Clinical Research Associate & Pharmacovigilance Consultant",
    imageUrl: "/v1646595447/fy/authors/filippo-di-dona_rqkouy.jpg",
  },
];

const Relators = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-5 sm:space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tutti gli Speaker
            </h2>
            <p className="text-xl text-gray-500">
              Durente l&apos;evento sarà possibile confrontarsi con diverse
              figure provenienti dal mondo dell&apos;industria farmaceutica.
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <div className="aspect-square h-16 w-16 ">
                      <Image
                        width="64px"
                        height="64px"
                        className="h-16 w-16 flex-1 rounded-full lg:h-20 lg:w-20"
                        src={person.imageUrl}
                        alt={person.name}
                      />
                    </div>
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h3>{person.name}</h3>
                      <p className="text-base text-teal-600">{person.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
