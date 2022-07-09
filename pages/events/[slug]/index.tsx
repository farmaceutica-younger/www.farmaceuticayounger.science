import { EventPage } from "components/event";
import { Footer } from "components/footer";
import { GmpCta } from "components/gmp-cta";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { db } from "services/db";
import { readTime } from "utils/readTime";

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
        date={frontmatter.createdAt}
        type="article"
      />
      <Header />
      {source && (
        <EventPage
          frontmatter={frontmatter}
          source={source}
          author={frontmatter.author}
        />
      )}
      <div className="bg-pink-50 pt-6">
        <GmpCta />
      </div>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug!;
  const event = await db.event.findFirst({
    where: {
      slug: slug,
    },
    include: {
      author: true,
    },
  });
  if (!event) {
    return {
      props: {},
    };
  }

  const { body, ...frontmatter } = event;

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
