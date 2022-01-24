import { db } from "services/db";

export const categories: {
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

export async function getPageProps(
  page: number,
  category: string,
  take: number
) {
  const total = await db.post.count({
    where: {
      tags: {
        has: category,
      },
    },
  });

  const posts = await db.post.findMany({
    skip: take * (page - 1),
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
}
