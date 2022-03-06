/* This example requires Tailwind CSS v2.0+ */
import { Popover } from "@headlessui/react";
import { Footer } from "components/footer";
import { BlogIcon } from "components/icon";
import { SEO } from "components/seo";
import Link from "next/link";

export default function Example() {
  return (
    <>
      <SEO title="Network e Carriere nel Farmaceutico" />
      <div className="relative bg-gray-50 overflow-hidden">
        <div
          className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
          aria-hidden="true"
        >
          <div className="relative h-full max-w-7xl mx-auto">
            <svg
              className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
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
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <nav
                className="relative flex items-center justify-between sm:h-10 md:justify-center"
                aria-label="Global"
              >
                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link href="/">
                      <a className="flex items-center">
                        <span className="sr-only">Farmaceutica Younger</span>
                        <BlogIcon className="text-sky-600 h-10 w-auto sm:h-14" />
                        <span className="text-sky-600 md:text-lg ml-2 ">
                          Scopri il blog di Farmaceutica Younger
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </Popover>

          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Network e Carriere nel</span>{" "}
                <span className="block text-sky-400 xl:inline">
                  Farmaceutico
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Evento Online gratuito per conoscere i profili più diffusi del
                farmaceutico e accrescere il tuo network!
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc14I3eUurmHoClh4PCCEeLNuyW5hKBf2fAA-QzV4ubd712-Q/viewform?usp=send_form"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-400 hover:bg-orange-700 md:py-4 md:text-lg md:px-10"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Iscriviti Subito!
                  </a>
                </div>
              </div>
              <div className="w-full m-auto mt-10">
                <img
                  className="m-auto rounded-xl shadow-lg"
                  src="https://res.cloudinary.com/dbdvy5b2z/image/upload/c_scale,w_580/v1646570021/fy/events/17-03-2022_kmjqld.jpg"
                  alt="Evento"
                />
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
