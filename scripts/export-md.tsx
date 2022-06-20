import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import path from "path";
import slugify from "slugify";

const db = new PrismaClient();

async function main() {
  const posts = await db.post.findMany({});
  posts.forEach(async (post) => {
    const file = path.join(
      __dirname,
      "..",
      "exports",
      slugify(post.title, {
        lower: true,
        trim: true,
        remove: /[*+~.()'"!:@,\/]/g,
      }) + ".md"
    );
    await fs.writeFile(
      file,
      `---
title: ${post.title}
date: ${post.publishedTime}
description: ${post.description}
featureImage: ${post.featuredImage}
---
${post.body}`
    );
  });
}

main();
