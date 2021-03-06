import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { resizeCloudinaryImage } from "utils/cloudinary-url";
import { formatJobDate } from "utils/dates";
import { trpc } from "utils/trpc";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import Link from "next/link";

const PAGE_SIZE = 60;

export default function Home() {
  const [company, setCompany] = useState("");

  return (
    <div className="h-10">
      <SEO
        title="Trova lavoro con Farmaceutica Younger"
        description="Scopri gli ultimi annunci presenti sul mercato del lavoro nel mondo del Life Science in Italia."
        author="Silvia Vernotico"
      />
      <Header />
      <div className="bg-white">
        <Hero />

        <div id="jobs" className="mt-6 grid place-content-center">
          <SelectCompany
            onChange={(value) => {
              setCompany(value);
            }}
          />
        </div>

        <Jobs company={company} />
        <CTA />
      </div>
      <Footer />
    </div>
  );
}

const Jobs = ({ company }: { company: string }) => {
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(0);
  }, [company]);
  const { data, isLoading, error } = trpc.useQuery([
    "jobs.getJobs",
    {
      companieIDs: company !== "" ? [company] : [],
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
    },
  ]);

  if (isLoading) {
    return (
      <div className="m-auto my-10 max-w-7xl">
        <div className="m-x-auto grid grid-cols-1 place-items-center md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <JobsLoading key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div id="jobs" className="m-auto my-20 max-w-md">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Jobs Loading Failed.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="m-auto my-10 max-w-7xl">
        <div className="m-x-auto grid grid-cols-1 place-items-center md:grid-cols-2 xl:grid-cols-3">
          {data.jobs.map((job, id) => (
            <div key={id} className="h-full w-full p-2">
              <div className="card h-full  w-full  shadow-md shadow-pink-100 ring-1 ring-pink-200">
                <div className="card-body flex flex-col justify-between">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        {getLogo(job.companyId) ? (
                          <div>
                            <img
                              className="h-10 w-20 object-contain"
                              src={getLogo(job.companyId)}
                              alt={job.companyId}
                            />
                          </div>
                        ) : (
                          <p className="badge badge-primary badge-outline">
                            {job.companyId}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="badge badge-primary badge-outline">
                          {" "}
                          {formatJobDate(
                            (job.postedAt || new Date()).toISOString()
                          )}
                        </span>
                      </div>
                    </div>

                    <h2 className="card-title mt-5">{job.title}</h2>
                    <div className="mt-4 space-y-3">
                      {/* {job.type && <p>Tipo di contratto: {job.type}</p>} */}
                      <p>???? {job.location}</p>
                    </div>
                  </div>
                  <div className="card-actions mt-4 justify-end">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={job.url}
                      className="btn btn-primary btn-sm"
                    >
                      Apply
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination current={page} setPage={setPage} total={data.total} />
    </div>
  );
};

const Pagination = ({
  total,
  current,
  setPage,
}: {
  total: number;
  current: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const hasNext = current < Math.ceil(total / PAGE_SIZE) - 1;
  const hasPrev = current > 0;

  const scroll = () => {
    const element = document.getElementById("jobs");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const next = () => {
    setPage((p) => p + 1);
    scroll();
  };
  const prev = () => {
    setPage((p) => p - 1);
    scroll();
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);
  return (
    <div className="my-8 flex w-full justify-center">
      <div className="btn-group ">
        <button
          onClick={prev}
          disabled={!hasPrev}
          className="btn btn-primary btn-sm"
        >
          &larr;
        </button>
        <button className="btn btn-primary btn-sm">
          Pagina {current + 1} di {totalPages}
        </button>
        <button
          onClick={next}
          disabled={!hasNext}
          className="btn btn-primary btn-sm"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

const JobsLoading = () => {
  return (
    <div className="h-full w-full p-2">
      <div className="card h-full w-full  shadow-xl">
        <div className="card-body flex flex-col justify-between">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="h-6 w-32 rounded-xl bg-stone-300"></div>
              <div className="h-6 w-6 rounded-xl bg-stone-300"></div>
            </div>

            <div className="mt-5 h-4 w-12 rounded-xl bg-stone-300"></div>
            <div className="mt-3 h-4 w-12 rounded-xl bg-stone-300">
              {/* {job.type && <p>Tipo di contratto: {job.type}</p>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const companies: { [k: string]: { logo: string; name: string } } = {
  gsk: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658851833/fy/logos/gsk-logo_e6pesx.png",
    name: "GSK",
  },
  janssen: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658851785/fy/logos/janssen-logo_ddtxvz.png",
    name: "Janssen",
  },
  sanofi: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658851785/fy/logos/sanofi_iuckig.jpg",
    name: "Sanofi",
  },
  chiesi: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658852178/fy/logos/chiesi_mnlrau.png",
    name: "Chiesi",
  },
  merk: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658852177/fy/logos/merk_b95w2b.webp",
    name: "Merck",
  },
  novartis: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658864238/fy/logos/Novartis-Logo_txlov8.png",
    name: "Novartis",
  },
  zambon: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658866139/fy/logos/Zambon_logo_fur62n.png",
    name: "Zambon",
  },
  baxter: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658867715/fy/logos/baxter_fmwdyh.png",
    name: "Baxter",
  },
  "eli-lilly": {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658867137/fy/logos/lilly_ptrstp.png",
    name: "Eli Lilly",
  },
  evotec: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1659181313/fy/logos/Evotec-Logo.wine_p4ewxv.png",
    name: "Evotec",
  },
  ibsa: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1659259600/fy/logos/obsa_d87rhr.png",
    name: "IBSA",
  },
  angelini: {
    logo: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1659330805/fy/logos/angelini_b1ypog.png",
    name: "Angelini",
  },
};

const getLogo = (company: string) => {
  return (
    companies[company] && resizeCloudinaryImage(companies[company].logo, 100)
  );
};

const Hero = () => (
  <div className="z-1 relative overflow-hidden bg-white">
    <div className="mx-auto max-w-screen-xl">
      <div className="relative z-0 bg-white pb-8 sm:pb-16 md:z-10 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
        <svg
          className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <div className="px-4 pt-6 sm:px-6 lg:px-8"></div>

        <main className="mx-auto mt-10 max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Trova lavoro con</span>{" "}
              <span className="block text-pink-600 xl:inline">
                Farmaceutica Younger
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Scopri gli ultimi annunci presenti sul mercato del lavoro nel
              mondo del <strong>Life Science</strong> in Italia.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="/blog/2022/7/la-nuova-sezione-jobs">
                  <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-pink-100 px-8 py-3 text-base font-medium text-pink-700 hover:bg-pink-200 md:py-4 md:px-10 md:text-lg">
                    Motivazioni
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
        alt=""
      />
    </div>
  </div>
);

const SelectCompany = ({ onChange }: { onChange: (value: string) => void }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col items-baseline space-y-2 md:flex-row md:space-y-0 md:space-x-3">
      <div>Filtra per azienda</div>
      <div className="relative z-10 w-72">
        <Listbox value={selected} onChange={handleChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-pink-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {companies[selected]?.name || "Tutte le aziende"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Object.entries(companies).map(([company, value]) => (
                  <Listbox.Option
                    key={company}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={company}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {value.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <button
        disabled={selected === ""}
        className="btn btn-primary btn-xs"
        onClick={() => handleChange("")}
      >
        vedi tutte
      </button>
    </div>
  );
};

const CTA = () => {
  return (
    <div className="relative mt-10 bg-gray-800">
      <div className="h-56 bg-pink-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
          alt=""
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
            Collaborazioni Aperte
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Collabora con Farmaceutica Younger
          </p>
          <p className="mt-3 text-lg text-gray-300">
            Sei un&apos;azienda che opera nel settore Life Science e vuoi
            collaborare con Farmaceutica Younger? Mandaci una mail, ti
            contatteremo appena possibile.
          </p>
          <div className="mt-8">
            <div className="inline-flex rounded-md shadow">
              <a
                href="mailto:silvia@farmaceuticayounger.science?subject=Collaborazione con Farmaceutica Younger"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                Scrivici una mail
                <ExternalLinkIcon
                  className="-mr-1 ml-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
