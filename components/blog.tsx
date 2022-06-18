import type { Author, Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Masonry from "react-masonry-css";
import { cloudinaryUrl, resizeCloudinaryImage } from "utils/cloudinary-url";
import { formatDate } from "utils/dates";
import { readTime } from "utils/readTime";

type PostPreview = Pick<
  Post,
  "path" | "featuredImage" | "description" | "title" | "publishedTime"
> & { author: Author };

const breakpointColumnsObj = {
  default: 3,
  768: 2,
  640: 1,
};

const BlogPostPreview: React.FC<{
  post: PostPreview;
}> = ({ post }) => {
  const { description, title, path, author, publishedTime, featuredImage } =
    post;
  return (
    <Link href={path!} passHref>
      <div className="m-auto mt-4 flex max-w-lg cursor-pointer flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl">
        <div className="flex-shrink-0">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="h-auto w-full"
              src={resizeCloudinaryImage(featuredImage!)}
              alt={title}
            />
          }
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <div className="block">
              <h3 className="mt-2 text-xl leading-7 text-gray-900">{title}</h3>
              <p className="truncate-3-lines mt-3 mb-4 text-base leading-6 text-gray-500">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={cloudinaryUrl(author.profileImage)}
                  width={50}
                  height={50}
                  alt={author.name}
                />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium leading-5 text-gray-900">
                {author?.name}
              </p>
              <div className="flex text-sm leading-5 text-gray-500">
                <time dateTime={publishedTime.toDateString()}>
                  {formatDate(publishedTime)}
                </time>
                <span className="mx-1">&middot;</span>
                {/* <span>Lettura in {timeToRead} min</span> */}
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
  <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
    <div className="absolute inset-0">
      <div className="h-1/3 bg-white sm:h-2/3"></div>
    </div>
    <div className="relative mx-auto max-w-7xl">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl leading-7 text-gray-500 sm:mt-4">
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
