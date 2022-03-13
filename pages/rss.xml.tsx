import { Feed } from "feed";
import { GetServerSideProps } from "next";
import React from "react";
import { config } from "utils/config";
import { db } from "../services/db";

const RSS: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const feed = await generateRSSFeed();
    res.setHeader("Content-Type", "text/xml");
    res.write(feed);
    res.end();
  }
  return {
    props: {},
  };
};

export default RSS;

const generateRSSFeed = async () => {
  const baseUrl = `https://${config.hostname}`;
  const author = config.author;

  const feed = new Feed({
    title: config.title,
    description: config.description,
    id: baseUrl,
    link: baseUrl,
    language: "it",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
    copyright: `2016 - ${new Date().getFullYear()} Silvia Vernotico. All rights reserved.`,
  });

  const posts = await db.post.findMany({
    where: {
      path: {
        startsWith: "/",
      },
    },
    orderBy: {
      publishedTime: "desc",
    },
    include: {
      author: true,
    },
    take: 30,
  });

  posts.forEach((post) => {
    const url = `${baseUrl}/${post.path}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      author: [
        {
          name: author.name,
        },
      ],
      date: new Date(post.publishedTime),
    });
  });
  return feed.rss2();
};
