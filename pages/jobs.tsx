import { Footer } from "components/footer";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { InferGetStaticPropsType } from "next";

export default function Home({
  jobs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-gray-100">
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
            <div key={id} className="card m-2 w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <p className="badge badge-primary badge-outline">
                  {job.company}
                </p>
                <h2 className="card-title">{job.title}</h2>
                <div className="space-y-3">
                  <p>
                    Pubblicato il: {new Date(job.date).toLocaleDateString()}
                  </p>
                  {job.type && <p>Tipo di contratto: {job.type}</p>}
                  <p>Location: {job.location}</p>
                </div>

                <div className="card-actions justify-end">
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
