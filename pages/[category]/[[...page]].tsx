import { PostsList } from "components/blog";
import { Layout } from "components/layout";
import { Pagination } from "components/pagination";
import { SEO } from "components/seo";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import { db } from "services/db";

const SectionPage = ({
  posts,
  pagination,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <SEO title={category.title} description={category.description} />
      <div className="text-center sm:mt-20 p-2">
        <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-6xl sm:leading-10">
          {category.title}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-8">
          {category.description}
        </p>
      </div>

      <PostsList posts={posts} title="" description="" />
      <Pagination {...pagination} basePath="hotthisweek" />
    </Layout>
  );
};

export default SectionPage;

const take = 18;

const categories: {
  category: string;
  title: string;
  description: string;
}[] = [
  {
    category: "hotthisweek",
    title: "Hot This Week",
    description: "Le novità più frizzanti del mondo farmaceutico",
  },
  {
    category: "pharmacronimi",
    title: "Farma Acronimi",
    description: "Gli acronimi più bizzarri del mondo farmaceutico",
  },
  {
    category: "pharmaquotes",
    title: "Farma Quotes",
    description: "Le citazioni dei più grandi scienziati di fama mondiale",
  },
  {
    category: "blog",
    title: "Articoli",
    description:
      "Leggi gli articoli scritti dalla crew di Farmaceutica Younger",
  },
  {
    category: "cgmp",
    title: "GMP",
    description:
      "Leggi gli articoli scritti dalla crew di Farmaceutica Younger",
  },
];

export const getStaticPaths = async () => {
  const categoryTotals = await Promise.all(
    categories.map(async (c) => {
      const total = await db.post.count({
        where: {
          tags: {
            has: c.category,
          },
        },
      });
      return { category: c.category, total };
    })
  );

  let paths: { params: { category: string; page: string[] } }[] = [];
  for (let { category, total } of categoryTotals) {
    for (let i = 0; i < total / take; i += 1) {
      paths = [
        { params: { category, page: i === 0 ? [] : [String(i)] } },
        ...paths,
      ];
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: GetServerSidePropsContext<{
  page: string[];
  category: string;
}>) => {
  const page = Number(params!.page?.[0] || 0);
  const category = params!.category;
  const total = await db.post.count({
    where: {
      tags: {
        has: category,
      },
    },
  });
  const posts = await db.post.findMany({
    skip: take * page,
    take,
    where: {
      tags: {
        has: category,
      },
    },
    orderBy: {
      publishedTime: "desc",
    },
    include: {
      author: true,
    },
  });
  return {
    props: {
      posts,
      pagination: {
        currentPage: page,
        pageCount: Math.trunc(total / take),
      },
      category: categories.find((c) => c.category === category)!,
    },
  };
};
