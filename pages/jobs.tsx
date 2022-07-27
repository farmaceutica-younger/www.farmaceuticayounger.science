import { Footer } from "components/footer";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { InferGetStaticPropsType } from "next";
import { resizeCloudinaryImage } from "utils/cloudinary-url";
import { formatJobDate } from "utils/dates";
import { trpc } from "utils/trpc";

export default function Home() {
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
      <Jobs />
      <Footer />
    </div>
  );
}

const Jobs = () => {
  const { data, isLoading, error } = trpc.useQuery([
    "jobs.getJobs",
    {
      companieIDs: [],
      skip: 0,
      take: 60,
    },
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Error</div>;
  }

  return (
    <div className="m-auto my-10 max-w-7xl">
      <div className="m-x-auto grid grid-cols-1 place-items-center md:grid-cols-2 xl:grid-cols-3">
        {data.jobs.map((job, id) => (
          <div key={id} className="h-full w-full p-2">
            <div className="card h-full w-full bg-base-100 shadow-xl">
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
                          (job.createdAt || new Date()).toISOString()
                        )}
                      </span>
                    </div>
                  </div>

                  <h2 className="card-title mt-5">{job.title}</h2>
                  <div className="mt-4 space-y-3">
                    {/* {job.type && <p>Tipo di contratto: {job.type}</p>} */}
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
  );
};

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
  baxter:
    "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658867715/fy/logos/baxter_fmwdyh.png",
  "eli-lilly":
    "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1658867137/fy/logos/lilly_ptrstp.png",
};

const getLogo = (company: string) => {
  return logos[company] && resizeCloudinaryImage(logos[company], 100);
};
