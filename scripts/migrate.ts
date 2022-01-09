import { glob } from "glob";
import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { cloudinary } from "../services/cloudinary";

export interface Author {
  id: string;
  name: string;
  bio: string;
  profile: string;
}

interface Data {
  title: string;
  description: string;
  featuredImage: string;
  date: string;
  path?: string;
  tags: string[];
  [key: string]: any;
}

const categories = ["hotthisweek", "pages", "pharmacronimi", "pharmaquotes"];

const getCategory = (file: string) => {
  return categories.find((c) => file.includes(c)) || "blog";
};

const getBlogData = async () => {
  const files = await getFiles();
  return Promise.all(
    files.map(async (file) => {
      const md = await fs.readFile(file);
      const { data, content } = matter(md) as unknown as {
        data: Data;
        content: string;
      };
      const postPath = data.path || extractPathFromFile(file);
      const tags = data.tags || [];
      return {
        file,
        post: {
          featuredImage: data.featuredImage,
          body: content,
          path: postPath,
          authorID: data.author,
          publishedTime: new Date(data.date),
          tags: [...tags, getCategory(file)],
          title: data.title,
          description: data.description,
        },
      };
    })
  );
};

const extractPathFromFile = (file: string) => {
  const filename = file
    .replace(/index.md[x]?$/, "")
    .split("/")
    .filter((d) => !!d)
    .pop()!
    .split(".")[0];
  return filename.replace(
    /([0-9]*)-([0-9]*)-[0-9]*-(.*)$/,
    (_, yy, mm, slug: string) => {
      return `${yy}/${mm}/${slug.toLowerCase()}`;
    }
  );
};

async function getFiles() {
  return new Promise<string[]>((resolve, reject) => {
    const contentDir = path.resolve(process.cwd(), "content/blog");
    glob(contentDir + "/**/*.{md,mdx}", (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
}

const prisma = new PrismaClient();

async function build() {
  await prisma.post.deleteMany({});

  const data = await Promise.all(
    (
      await getBlogData()
    ).map(async ({ file, post }) => {
      if (post.featuredImage) {
        post.featuredImage = await uploadImage2Cloudinary(
          file,
          post.featuredImage
        );
      }
      const images = post.body.matchAll(
        /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g
      );
      const imagesPath = Array.from(images).map(
        (i) => i.groups as { filename: string; optionalpart?: string }
      );
      for (let g of imagesPath) {
        const url = await uploadImage2Cloudinary(file, g.filename);
        post.body = post.body.replace(g.filename + (g.optionalpart || ""), url);
      }

      return post;
    })
  );

  await Promise.all(
    data.map(({ authorID, ...data }) =>
      prisma.post.create({
        data: {
          ...data,
          author: {
            connect: {
              id: authorID,
            },
          },
        },
      })
    )
  );
  console.log("done");
}

build();

async function uploadImage2Cloudinary(file: string, image: string) {
  const imagePath = path.join(file, "..", image).trim();
  const plublicId = imagePath
    .replace(process.cwd(), "")
    .replace(/\.[^/.]+$/, "");
  try {
    const res = await cloudinary.api.resource(
      path.join("fy/images", plublicId),
      {}
    );
    return res.url;
  } catch (err) {}
  try {
    const res = await cloudinary.uploader.upload(imagePath, {
      folder: "fy/images",
      public_id: plublicId,
    });
    return res.url;
  } catch (err) {
    console.log(err, file, imagePath);
  }
}
