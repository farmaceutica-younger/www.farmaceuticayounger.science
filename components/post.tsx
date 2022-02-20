import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import YouTube from "react-youtube";
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

const components = {
  img: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} className="m-auto" />
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
};

export const PostPage = ({ source, frontmatter, author }: PostProps) => {
  return (
    <>
      <main className="wrapper py-10">
        <h1 className="text-4xl md:text-6xl text-center py-2 sm:py-0 max-w-[900px] m-auto font-bold mt-10">
          {frontmatter.title}
        </h1>

        {author && (
          <div className="flex flex-col items-center mt-10">
            <div className="flex-shrink-0">
              <a href={"#"}>
                <span className="sr-only">{author.name}</span>
                <img
                  width={60}
                  height={60}
                  className="rounded-full"
                  src={author.profileImage}
                  alt={author.name}
                />
              </a>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                <a href={"#"}>{author.name}</a>
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

        <div className="m-auto w-full mt-3 flex gap-2 justify-center">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        <div className="prose prose-lg m-auto mt-6 px-2 md:px-0">
          {frontmatter.showFeatureImage && (
            <img
              className="m-auto"
              src={frontmatter.featuredImage}
              alt={frontmatter.title}
            />
          )}
          <MDXRemote {...source} components={components} />
        </div>
      </main>
    </>
  );
};
