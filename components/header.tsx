import { faHotjar, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faMap,
  faNewspaper,
  faQuoteRight,
  faTablets,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, MenuIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import { Banner } from "./banner";
import { BlogIcon } from "./icon";

const blogMenuSections = [
  {
    name: "Articoli",
    description:
      "Leggi gli articoli scritti dalla crew di Farmaceutica Younger",
    to: "/blog",
    icon: <FontAwesomeIcon className="h-6 w-6" icon={faNewspaper} />,
  },
  {
    name: "Hot This Week",
    description: "Le novità più frizzanti del mondo farmaceutico",
    to: "/hotthisweek",
    icon: <FontAwesomeIcon className="h-6 w-6" icon={faHotjar} />,
  },
  {
    name: "Farma Acronimi",
    description: "Gli acronimi più bizzarri del mondo farmaceutico",
    to: "/pharmacronimi",
    icon: <FontAwesomeIcon className="h-6 w-6" icon={faTablets} />,
  },
  {
    name: "Farma Quotes",
    description: "Le citazioni dei più grandi scienziati di fama mondiale",
    to: "/pharmaquotes",
    icon: <FontAwesomeIcon className="h-6 w-6" icon={faQuoteRight} />,
  },
  {
    name: "Farma In Italy",
    description:
      "Scopri dove sono distribuite le aziende del settore Life Science",
    to: "/farmainitaly",
    icon: <FontAwesomeIcon className="h-6 w-6" icon={faMap} />,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BlogMenu = () => (
  <Popover className="relative">
    {({ open }) => (
      <>
        <Popover.Button
          className={classNames(
            open ? "text-pink-800" : "text-white ",
            "group inline-flex items-center rounded-md px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-pink-800 focus:bg-white focus:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          )}
        >
          <span>Blog</span>
          <ChevronDownIcon
            className={classNames("ml-2 h-5 w-5")}
            aria-hidden="true"
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-30 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
            <div className="absolute z-30 -ml-4 mt-3 w-screen max-w-md transform md:max-w-3xl lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
              <div className="rounded-lg shadow-lg">
                <div className="shadow-xs overflow-hidden rounded-lg">
                  <div className="relative z-20 grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                    {blogMenuSections.map((menu) => (
                      <Link key={menu.to} href={menu.to}>
                        <a className="-m-3 flex items-start space-x-4 rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-pink-500 p-3 text-white sm:h-12 sm:w-12">
                            {menu.icon}
                          </div>
                          <div className="space-y-1">
                            <p className="text-base font-medium leading-6 text-gray-900">
                              {menu.name}
                            </p>
                            <p className="text-sm leading-5 text-gray-500">
                              {menu.description}
                            </p>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

const otherSections = [
  {
    name: "Associazione",
    href: "/associazione",
  },
  {
    name: "cGMP",
    href: "/cgmp",
  },
  {
    name: "GMP book",
    href: "/ecommerce",
  },
];

interface MobileMenuProps {
  close: () => void;
}

const MobileMenu = () => (
  <Popover className="relative">
    {({ open }) => (
      <>
        <Popover.Button
          className={classNames(
            open ? "text-white" : "text-white",
            "group inline-flex items-center rounded-md p-2 text-base font-medium hover:bg-white hover:text-pink-800"
          )}
        >
          {open ? (
            <XIcon className="h-8 w-8" />
          ) : (
            <MenuIcon className="h-8 w-8" aria-hidden="true" />
          )}
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute right-0 z-10 mt-3  w-screen max-w-xs transform px-2 sm:px-0">
            <div className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition lg:hidden">
              <div className="rounded-lg shadow-lg">
                <div className="shadow-xs divide-y-2 divide-gray-50 rounded-lg bg-white">
                  <div className="space-y-6 px-5 pt-5 pb-6">
                    <div>
                      <nav className="grid grid-cols-1 gap-7">
                        {blogMenuSections.map((menu) => (
                          <Link key={menu.to} href={menu.to}>
                            <a className="-m-3 flex items-center space-x-4 rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50">
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-pink-500 p-3 text-white">
                                {menu.icon}
                              </div>
                              <div className="text-base font-medium leading-6 text-gray-900">
                                {menu.name}
                              </div>
                            </a>
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <div className="space-y-6 py-6 px-5">
                    <div className="grid grid-cols-2 gap-4">
                      {otherSections.map(({ href, name }, idx) => (
                        <Link href={href} key={idx}>
                          <a className="text-base font-medium leading-6 text-gray-900 transition duration-150 ease-in-out hover:text-gray-700">
                            {name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

export const Header = () => {
  return (
    <div>
      <div className="relative bg-pink-500">
        <div className="flex items-center justify-between px-4 py-2 sm:py-4 sm:px-6 lg:justify-start lg:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <Link href="/">
              <a className="flex">
                <BlogIcon className="h-10 w-10 text-white sm:h-14 sm:w-14" />
              </a>
            </Link>
          </div>
          <div className="-my-2 -mr-2 lg:hidden">
            <MobileMenu />
          </div>
          <nav className="hidden space-x-10 lg:flex">
            <Link href="/">
              <a className="rounded-md px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-white hover:text-pink-800 focus:bg-white focus:text-pink-300">
                Home
              </a>
            </Link>
            <BlogMenu />
            {otherSections.map(({ href, name }, idx) => (
              <Link key={idx} href={href}>
                <a className="rounded-md px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-white hover:text-pink-800 focus:bg-white focus:text-pink-300">
                  {name}
                </a>
              </Link>
            ))}
          </nav>
          <div className="hidden items-center justify-end space-x-8 md:flex-1 lg:flex lg:w-0">
            <span className="inline-flex rounded-md shadow-sm">
              <a
                href="https://www.youtube.com/channel/UCBzcNd6Z480lWkchyanC4_A"
                target="_blank"
                className="whitespace-no-wrap focus:shadow-outline-pink inline-flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-pink-500 focus:border-pink-700 focus:outline-none active:bg-pink-700"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="h-6 w-6" icon={faYoutube} />
                <span className="ml-2">YouTube</span>
              </a>
            </span>
          </div>
        </div>
      </div>
      <Banner
        long="Big News! Il prossimo evento live di Farmaceutica Younger sta per arrivare!"
        short="Il prossimo evento live di Farmaceutica Younger!"
        btn="Partecipa!"
        Icon={SpeakerphoneIcon}
        href="/events/network-e-carriere-farmaceutico"
      />
    </div>
  );
};
