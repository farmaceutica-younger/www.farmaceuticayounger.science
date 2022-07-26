import { Footer } from "components/footer";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { InferGetStaticPropsType } from "next";
import { resizeCloudinaryImage } from "utils/cloudinary-url";
import { formatJobDate } from "utils/dates";

export default function Home({
  jobs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-gray-200">
      <SEO title="Farmaceutica Younger" />
      <Header />
      <div className="p-2 text-center sm:mt-20">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-6xl sm:leading-10">
          Farma Jobs
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl leading-7 text-gray-500 sm:mt-8">
          Trova lavoro con Farmaceutica Younger
        </p>
      </div>
      <div className="m-auto my-10 max-w-7xl">
        <div className="m-x-auto grid grid-cols-1 place-items-center md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, id) => (
            <div key={id} className="h-full w-full p-2">
              <div className="card h-full w-full bg-base-100 shadow-xl">
                <div className="card-body flex flex-col justify-between">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        {getLogo(job.company) ? (
                          <div>
                            <img
                              className="h-10 object-contain"
                              src={getLogo(job.company)}
                              alt={job.company}
                            />
                          </div>
                        ) : (
                          <p className="badge badge-primary badge-outline">
                            {job.company}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="badge badge-primary badge-outline">
                          {" "}
                          {formatJobDate(job.date)}
                        </span>
                      </div>
                    </div>

                    <h2 className="card-title mt-5">{job.title}</h2>
                    <div className="mt-4 space-y-3">
                      {job.type && <p>Tipo di contratto: {job.type}</p>}
                      <p>Location: {job.location}</p>
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
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  let jobs: Job[] = [];
  try {
    const res = await fetch(process.env.JOBS_URL as string);
    jobs = (await res.json()) as unknown as Job[];
  } catch (err) {
    console.error(err);
  }
  return {
    props: {
      jobs: jobs.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    },
    revalidate: 60 * 60,
  };
};

interface Job {
  date: string;
  description: string;
  title: string;
  location: string;
  type: string;
  url: string;
  company: string;
}

const logos: { [k: string]: string } = {
  gsk: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658851833/fy/logos/gsk-logo_e6pesx.png",
  jansenn:
    "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658851785/fy/logos/janssen-logo_ddtxvz.png",
  sanofi:
    "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658851785/fy/logos/sanofi_iuckig.jpg",
  chiesi:
    "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658852178/fy/logos/chiesi_mnlrau.png",
  merk: "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658852177/fy/logos/merk_b95w2b.webp",
  novartis:
    "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658864238/fy/logos/Novartis-Logo_txlov8.png",
  zambon:
    "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658866139/fy/logos/Zambon_logo_fur62n.png",
  "eli-lilly":
    "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658867137/fy/logos/lilly_ptrstp.png",
};

const getLogo = (company: string) => {
  return logos[company] && resizeCloudinaryImage(logos[company], 100);
};
