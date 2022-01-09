import { faHotjar, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faMap,
  faNewspaper,
  faQuoteRight,
  faTablets,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { BlogIcon } from "./icon";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

const Banner = () => {
  const [open, setOpen] = useState(true);
  if (!open) {
    return null;
  }
  return (
    <div className="relative bg-pink-600">
      <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">È nata l&apos;Associazione!</span>
            <span className="hidden md:inline">
              Big news! Siamo lieti di annunciare la nascita
              dell&apos;Associazione.
            </span>
            <span className="block sm:ml-2 sm:inline-block">
              <Link href="/associazione">
                <a className="text-white font-bold underline">
                  Scopri di più &rarr;
                </a>
              </Link>
            </span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
          <button
            type="button"
            className="flex p-2 rounded-md hover:bg-pink-500 focus:outline-none focus:bg-pink-500 transition ease-in-out duration-150"
            aria-label="Dismiss"
            onClick={() => setOpen(false)}
          >
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const blogMenuSections = [
  {
    name: "Articoli",
    description:
      "Leggi gli articoli scritti dalla crew di Farmaceutica Younger",
    to: "/blog",
    icon: <FontAwesomeIcon icon={faNewspaper} />,
  },
  {
    name: "Hot This Week",
    description: "Le novità più frizzanti del mondo farmaceutico",
    to: "/hotthisweek",
    icon: <FontAwesomeIcon icon={faHotjar} />,
  },
  {
    name: "Farma Acronimi",
    description: "Gli acronimi più bizzarri del mondo farmaceutico",
    to: "/pharmacronimi",
    icon: <FontAwesomeIcon icon={faTablets} />,
  },
  {
    name: "Farma Quotes",
    description: "Le citazioni dei più grandi scienziati di fama mondiale",
    to: "/pharmaquotes",
    icon: <FontAwesomeIcon icon={faQuoteRight} />,
  },
  {
    name: "Farma In Italy",
    description:
      "Scopri dove sono distribuite le aziende del settore Life Science",
    to: "/farmainitaly",
    icon: <FontAwesomeIcon icon={faMap} />,
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
            open ? "text-gray-900" : "text-gray-500",
            "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          )}
        >
          <span>Blog</span>
          <ChevronDownIcon
            className={classNames(
              open ? "text-gray-600" : "text-gray-400",
              "ml-2 h-5 w-5 group-hover:text-gray-500"
            )}
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
          <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
            <div className="z-30 absolute -ml-4 mt-3 transform w-screen max-w-md md:max-w-3xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
              <div className="rounded-lg shadow-lg">
                <div className="rounded-lg shadow-xs overflow-hidden">
                  <div className="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                    {blogMenuSections.map((menu) => (
                      <Link key={menu.to} href={menu.to}>
                        <a className="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 p-3 rounded-md bg-pink-500 text-white sm:h-12 sm:w-12">
                            {menu.icon}
                          </div>
                          <div className="space-y-1">
                            <p className="text-base leading-6 font-medium text-gray-900">
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
    name: "eCommerce",
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
            open ? "text-gray-900" : "text-gray-500",
            "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900   "
          )}
        >
          {open ? (
            <XIcon className="text-gray-600 ml-2 h-8 w-8 group-hover:text-gray-500" />
          ) : (
            <MenuIcon
              className="text-gray-400 ml-2 h-8 w-8 group-hover:text-gray-500"
              aria-hidden="true"
            />
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
          <Popover.Panel className="absolute z-10 right-0 transform  mt-3 px-2 w-screen max-w-xs sm:px-0">
            <div className="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div className="rounded-lg shadow-lg">
                <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5 space-y-6">
                    <div>
                      <nav className="grid grid-cols-1 gap-7">
                        {blogMenuSections.map((menu) => (
                          <Link key={menu.to} href={menu.to}>
                            <a className="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 p-3 rounded-md bg-pink-500 text-white">
                                {menu.icon}
                              </div>
                              <div className="text-base leading-6 font-medium text-gray-900">
                                {menu.name}
                              </div>
                            </a>
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <div className="py-6 px-5 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {otherSections.map(({ href, name }, idx) => (
                        <Link href={href} key={idx}>
                          <a className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
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
      <Banner />
      <div className="relative bg-white">
        <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <Link href="/">
              <a className="flex">
                <BlogIcon />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <MobileMenu />
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="/">
              <a className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">
                Home
              </a>
            </Link>
            <BlogMenu />
            {otherSections.map(({ href, name }, idx) => (
              <Link key={idx} href={href}>
                <a className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">
                  {name}
                </a>
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
            <span className="inline-flex rounded-md shadow-sm">
              <a
                href="https://www.youtube.com/channel/UCBzcNd6Z480lWkchyanC4_A"
                target="_blank"
                className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition ease-in-out duration-150"
                rel="noreferrer"
              >
                <FontAwesomeIcon size="lg" icon={faYoutube} />{" "}
                <span className="ml-2">YouTube</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
