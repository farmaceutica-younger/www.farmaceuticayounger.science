import type { Author, Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Masonry from "react-masonry-css";
import { formatDate } from "utils/dates";
import { readTime } from "utils/readTime";

type PostPreview = Pick<
  Post,
  "path" | "featuredImage" | "description" | "title" | "publishedTime" | "body"
> & { author: Author };

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  500: 1,
};

const BlogPostPreview: React.FC<{
  post: PostPreview;
}> = ({ post }) => {
  const {
    description,
    title,
    path,
    author,
    publishedTime,
    body,
    featuredImage,
  } = post;
  const timeToRead = readTime(body);
  return (
    <Link href={path} passHref>
      <div className="mt-4 max-w-lg flex flex-col rounded-lg hover:shadow-2xl shadow-lg overflow-hidden">
        <div className="flex-shrink-0">
          <img className="w-full h-auto" src={featuredImage} alt={title} />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <div className="block">
              <h3 className="mt-2 text-xl h-14 truncate-2-lines leading-7  text-gray-900">
                {title}
              </h3>
              <p className="mt-3 truncate-3-lines mb-4 text-base leading-6 text-gray-500">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={author.profile.replace(/^.+\/upload/, "")}
                  width={50}
                  height={50}
                  alt={author.name}
                />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {author?.name}
              </p>
              <div className="flex text-sm leading-5 text-gray-500">
                <time dateTime={publishedTime.toDateString()}>
                  {formatDate(publishedTime)}
                </time>
                <span className="mx-1">&middot;</span>
                <span>Lettura in {timeToRead} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const PostsList: React.FC<{
  posts: PostPreview[];
  title: string;
  description: string;
}> = ({
  posts,
  title,
  description,
}: {
  posts: any[];
  title: string;
  description: string;
}) => (
  <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="absolute inset-0">
      <div className="bg-white h-1/3 sm:h-2/3"></div>
    </div>
    <div className="relative max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="text-pink-600 text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
          {description}
        </p>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex"
        columnClassName="px-2"
      >
        {posts.map((post, idx) => (
          <BlogPostPreview key={idx} post={post}></BlogPostPreview>
        ))}
      </Masonry>
    </div>
  </div>
);
