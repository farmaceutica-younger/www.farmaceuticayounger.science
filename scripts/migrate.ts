import dotenv from "dotenv";

import { glob } from "glob";
import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { cloudinary } from "../services/cloudinary";
dotenv.config({
  path: ".env.local",
});
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
  // await prisma.author.createMany({
  //   data: authors,
  // });

  const data = await Promise.all(
    (
      await getBlogData()
    )
      .filter((_, id) => id < 10)
      .map(async ({ file, post }) => {
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
          post.body = post.body.replace(
            g.filename + (g.optionalpart || ""),
            url
          );
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
  } catch (err) {
    console.log("cannot find image: ", err, file);
  }
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

const authors = [
  {
    id: "silviaver",
    name: "Silvia Vernotico",
    bio: "Founder & President",
    profileImage:
      "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1641520587/fy/authors/silvia_weqxvf.jpg",
  },
  {
    id: "irenecarnovale",
    name: "Irene Carnovale",
    bio: "All'Università degli Studi di Torino consegue la laurea in CTF (2014) e il dottorato di ricerca in Scienze Farmaceutiche e Biomolecolari  svolto in collaborazione con Bracco Imaging S.p.a. (2019). Poco prima della discussione di dottorato inizia la sua esperienza di Scientist R&D in Inghilterra presso Selcia Ltd. (Eurofins Group), dedicandosi alla sintesi di prodotti farmaceutici radiomarcati per studi preclinici. Attualmente ricopre il ruolo di Chemist R&D nella divisione Isotope Chemistry di Accelera S.r.l. (Nerviano Medical Science Group).",
    profileImage:
      "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1641520587/fy/authors/irenecarnovale_cdet9r.jpg",
  },
  {
    id: "silviagarau",
    name: "Silvia Garau",
    bio: "Ciao, sono Silvia! Ho 25 anni e mi sono laureata in CTF a marzo 2020. Durante la pandemia ho iniziato a raccontare per FY le storie di donne che mi ispirano e incuriosiscono ogni giorno. Da sempre curiosa e chiacchierona, amo la birra e la montagna.",
    profileImage:
      "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1641520587/fy/authors/silviagarau_a3wsvs.jpg",
  },
  {
    id: "giugi",
    name: "Giulia Giori",
    bio: "Si laurea in CTF presso l'Università degli studi di Ferrara nel 2016. Inizia il suo percorso nel mondo farmaceutico come analista del controllo qualità in Roche per poi proseguire il suo percorso in Guna S.p.a dove attualmente si occupa di studi di stabilità.",
    profileImage:
      "https://res.cloudinary.com/dbdvy5b2z/image/upload/v1641520587/fy/authors/giugi_dfxqoq.jpg",
  },
];
