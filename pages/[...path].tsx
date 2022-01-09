import { Header } from "components/header";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Image from "next/image";
import YouTube from "react-youtube";
import { db } from "services/db";
import { formatDate } from "utils/dates";
import { readTime } from "utils/readTime";
import { Footer } from "../components/footer";
import { SEO } from "../components/seo";
import { Tag } from "../components/tag";

export default function TestPage({
  source,
  frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const components = {
    img: (props) => <img {...props} className="m-auto" />,
    AmazonAffiliationLink: ({ src }: { src: string }) => (
      <div className="m-auto">
        <iframe
          style={{ width: "120px", height: "240px", margin: "auto" }}
          scrolling="no"
          frameBorder="0"
          src={src}
        ></iframe>
      </div>
    ),
    YouTube: ({ videoId }: { videoId: string }) => (
      <YouTube className="w-full" opts={{}} videoId={videoId} />
    ),
  };

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.featuredImage}
        author={frontmatter.author.name}
        date={frontmatter.publishedTime}
        type="article"
      />

      <Head>
        <title>{frontmatter.title} | @ludusrusso </title>
        <meta name="description" content={frontmatter.description} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
          integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />

      <main className="wrapper py-10">
        <h1 className="text-4xl md:text-6xl text-center py-2 sm:py-0 max-w-[900px] m-auto font-bold mt-10">
          {frontmatter.title}
        </h1>

        <div className="flex flex-col items-center mt-10">
          <div className="flex-shrink-0">
            <a href={"#"}>
              <span className="sr-only">{frontmatter.author.name}</span>
              <Image
                width={60}
                height={60}
                className="rounded-full"
                src={frontmatter.author.profile.replace(/^.+\/upload/, "")}
                alt={frontmatter.author.name}
              />
            </a>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">
              <a href={"#"}>{frontmatter.author.name}</a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={frontmatter.publishedTime.toISOString()}>
                {formatDate(frontmatter.publishedTime)}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{frontmatter.readTime} min</span>
            </div>
          </div>
        </div>

        <div className="m-auto w-full mt-3 flex gap-2 justify-center">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        <div className="prose prose-lg m-auto mt-6 px-2 md:px-0">
          <MDXRemote {...source} components={components} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const posts = await db.post.findMany({});
  const paths = posts.map((post) => {
    return {
      params: {
        path: post.path.split("/").filter((p) => !!p),
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {
  const path = "/" + params!.path.join("/") + "/";
  const { body, ...frontmatter } = await db.post.findFirst({
    where: {
      path: path,
    },
    include: {
      author: true,
    },
  });

  const mdxSource = await serialize(body, {});

  return {
    props: {
      source: mdxSource,
      frontmatter: {
        ...frontmatter,
        readTime: readTime(body),
      },
    },
  };
}
