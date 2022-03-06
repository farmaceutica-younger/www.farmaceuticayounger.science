import { Header } from "components/header";
import { PostPage } from "components/post";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { db } from "services/db";
import { readTime } from "utils/readTime";
import { Footer } from "../components/footer";
import { SEO } from "../components/seo";

export default function TestPage({
  source,
  frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!source || !frontmatter) {
    return (
      <>
        <p>NOT FOUND</p>
      </>
    );
  }

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.featuredImage!}
        author={frontmatter.author.name}
        date={frontmatter.publishedTime}
        type="article"
      />
      <Header />
      {source && (
        <PostPage
          frontmatter={frontmatter}
          source={source}
          author={frontmatter.author}
        />
      )}
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const posts = await db.post.findMany({
    where: {
      path: {
        startsWith: "/",
      },
    },
    select: {
      path: true,
    },
  });
  const paths = posts.map((post) => {
    return {
      params: {
        path: post.path?.split("/").filter((p) => !!p),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {
  const path = "/" + params!.path.join("/") + "/";
  const res = await db.post.findFirst({
    where: {
      path: path,
    },
    include: {
      author: true,
    },
  });
  if (!res) {
    return {
      props: {},
    };
  }

  const { body, ...frontmatter } = res;

  let mdxSource: MDXRemoteSerializeResult<Record<string, unknown>> | undefined;
  try {
    mdxSource = await serialize(body, {
      mdxOptions: {
        rehypePlugins: [],
      },
    });
  } catch {}

  return {
    props: {
      source: mdxSource,
      frontmatter: {
        ...frontmatter,
        readTime: readTime(body),
      },
    },
    revalidate: 10 * 60,
  };
}
