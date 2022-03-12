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
      <SEO title="Network e Carriere nel Farmaceutico" />
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
                        <BlogIcon className="h-10 w-auto text-sky-600 sm:h-14" />
                        <span className="ml-2 text-sky-600 md:text-lg ">
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
                <span className="block xl:inline">Network e Carriere nel</span>{" "}
                <span className="block text-sky-400 xl:inline">
                  Farmaceutico
                </span>
              </h1>
              <p className="mt-4 text-lg font-semibold text-gray-700">
                {" "}
                17 Marzo 2022 - Ore 19:00
              </p>
              <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Evento Online gratuito per conoscere i profili più diffusi del
                farmaceutico e accrescere il tuo network!
              </p>
              <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc14I3eUurmHoClh4PCCEeLNuyW5hKBf2fAA-QzV4ubd712-Q/viewform?usp=send_form"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-400 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 md:py-4 md:px-10 md:text-lg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Iscriviti Subito!
                  </a>
                </div>
              </div>
              <div className="m-auto mt-10 w-full">
                <img
                  className="m-auto rounded-xl shadow-lg"
                  src="https://res.cloudinary.com/dbdvy5b2z/image/upload/c_scale,w_580/v1646570021/fy/events/17-03-2022_kmjqld.jpg"
                  alt="Evento"
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <Relators />
      <Footer />
    </>
  );
}

const people = [
  {
    name: "Maurizio Cuocolo",
    role: "Head of Quality Management Unit",
    imageUrl: "/v1641589898/fy/authors/maurizio_avi6ll.jpg",
  },
  {
    name: "Irene Carnovale",
    role: "Business Support Scientist",
    imageUrl: "/v1641520587/fy/authors/irenecarnovale_cdet9r.jpg",
  },
  {
    name: "Simone Cossari",
    role: "PhD student",
    imageUrl: "/v1646595447/fy/authors/simone-cossari_zijf0d.jpg",
  },
  {
    name: "Viviana Riccardi",
    role: "Quality Assurance Representative",
    imageUrl: "/v1646595447/fy/authors/valentina-ricciardi_fy2cuk.jpg",
  },
  {
    name: "Giorgia Bottello",
    role: "Quality Control Specialist",
    imageUrl: "/fy/authors/giorgia_ixtzta.jpg",
  },
  {
    name: "Roberta Cocomazzi",
    role: "Medical Writer & Regulatory Affairs",
    imageUrl: "/v1646595447/fy/authors/roberta-cocomazzi_fokmkd.jpg",
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
              Incontra i relatori
            </h2>
            <p className="text-xl text-gray-500">
              Durente la diretta sarà possibile confrontarsi con diverse figure
              provenienti dal mondo dell&apos;industria farmaceutica.
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
                      <p className="text-base text-cyan-600">{person.role}</p>
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
