import { PostsList } from "components/blog";
import { Layout } from "components/layout";
import { Pagination } from "components/pagination";
import { SEO } from "components/seo";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { db } from "services/db";
import { categories, getPageProps } from "utils/categories";

const SectionPage = ({
  posts,
  pagination,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <SEO title={category.title} description={category.description} />
      <div className="p-2 text-center sm:mt-20">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-6xl sm:leading-10">
          {category.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl leading-7 text-gray-500 sm:mt-8">
          {category.description}
        </p>
      </div>

      <PostsList posts={posts} title="" description="" />
      <Pagination {...pagination} basePath={`${category.category}`} />
    </Layout>
  );
};

export default SectionPage;

const take = 10;

export const getStaticPaths = async () => {
  const categoryTotals = await Promise.all(
    categories.map(async (c) => {
      const total = await db.post.count({
        where: {
          tags: {
            has: c.category,
          },
          path: {
            startsWith: "/",
          },
        },
      });
      return { category: c.category, total };
    })
  );

  let paths: { params: { category: string; page: string } }[] = [];
  for (let { category, total } of categoryTotals) {
    for (let i = 0; i < total / take; i += 1) {
      paths = [{ params: { category, page: String(i + 1) } }, ...paths];
    }
  }
  return { paths, fallback: false };
};

export function getStaticProps({
  params,
}: GetStaticPropsContext<{
  page: string;
  category: string;
}>) {
  const page = Number(params!.page);
  const category = params!.category;
  return getPageProps(page, category, take);
}
