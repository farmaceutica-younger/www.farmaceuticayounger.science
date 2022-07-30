import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import YouTube from "react-youtube";
import { resizeCloudinaryImage } from "utils/cloudinary-url";
import { formatDate } from "utils/dates";
import { Tag } from "../components/tag";

export type Frontmatter = {
  title: string;
  featuredImage: string;
  readTime: number;
  publishedTime: Date;
  showFeatureImage: boolean;
  tags: string[];
};

export interface Author {
  name: string;
  profileImage: string;
}

interface PostProps {
  frontmatter: Frontmatter;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  author?: Author;
}

const components: any = {
  img: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={resizeCloudinaryImage(src)} className="m-auto" />
  ),
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
  blockquote: (props: any) => (
    <div className="not-prose relative border-4 border-pink-600 px-4 py-8">
      <blockquote className="md:flex md:flex-grow md:flex-col">
        <svg
          className="absolute -top-4 -left-4 m-2 h-8 w-8 transform bg-gray-50 text-pink-600"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <svg
          className="absolute -right-4 -bottom-4 h-8 w-8 rotate-180 transform bg-gray-50 text-pink-600"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <div className="relative px-2 text-center text-xl font-medium italic md:flex-grow">
          <p className="relative">{props.children}</p>
        </div>
      </blockquote>
    </div>
  ),
};

export const PostPage = ({ source, frontmatter, author }: PostProps) => {
  return (
    <>
      <main className="wrapper py-10">
        <h1 className="m-auto mt-10 max-w-[900px] py-2 text-center text-4xl font-bold sm:py-4 md:text-6xl">
          {frontmatter.title}
        </h1>

        {author && (
          <div className="mt-10 flex flex-col items-center">
            <div className="flex-shrink-0">
              <span>
                <span className="sr-only">{author.name}</span>
                <img
                  width={60}
                  height={60}
                  className="rounded-full"
                  src={resizeCloudinaryImage(author.profileImage, 60)}
                  alt={author.name}
                />
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                <span>{author.name}</span>
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
        )}

        <div className="m-auto mt-3 flex w-full justify-center gap-2">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        <div className="prose prose-lg m-auto mt-6 px-2 md:px-0">
          {frontmatter.showFeatureImage && (
            <img
              className="m-auto"
              src={resizeCloudinaryImage(frontmatter.featuredImage, 800)}
              alt={frontmatter.title}
            />
          )}
          <MDXRemote {...source} components={components} />
        </div>
      </main>
    </>
  );
};
