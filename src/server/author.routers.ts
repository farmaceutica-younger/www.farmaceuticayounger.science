import { TRPCError } from "@trpc/server";
import { PostFormSchema } from "components/form/post-form";
import { serialize } from "next-mdx-remote/serialize";
import { cloudinary, cloudinaryConfig } from "services/cloudinary";
import { z } from "zod";
import { createRouter } from "./router";
import slugify from "slugify";

export const authorRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const user = ctx.session?.user;
    const authorId = user?.authorId;
    if (!authorId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        user: user,
        authorId: authorId,
      },
    });
  })
  .mutation("cloudinaryUploadSignature", {
    resolve({}) {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const folder = cloudinaryConfig.baseFolder + "/images";
      const apiKey = cloudinaryConfig.apiKey;
      const cloudName = cloudinaryConfig.cloudName;

      const toSign = {
        timestamp,
        folder,
      };
      const signature = cloudinary.utils.api_sign_request(
        { ...toSign },
        cloudinaryConfig.secret
      );
      return { timestamp, signature, folder, apiKey, cloudName };
    },
  })
  .mutation("savePost", {
    input: z.object({
      data: PostFormSchema,
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.db.post.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("createPost", {
    input: z.object({
      data: PostFormSchema,
    }),
    async resolve({ input, ctx }) {
      return await ctx.db.post.create({
        data: {
          ...input.data,
          authorId: ctx.authorId,
        },
      });
    },
  })
  .mutation("publishPost", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const post = await ctx.db.post.findFirst({
        where: {
          id: input.id,
          authorId: ctx.authorId,
        },
      });
      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (post.path) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post already published",
        });
      }
      const d = post.publishedTime;
      const slug = slugify(post.title.substring(0, 50), {
        lower: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g,
      });
      const path = `/blog/${d.getFullYear()}/${d.getMonth()}/${slug}/`;
      return await ctx.db.post.update({
        where: {
          id: post.id,
        },
        data: {
          path: path,
        },
      });
    },
  })
  .query("getPost", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.db.post.findFirst({
        where: {
          id: input.id,
          authorId: ctx.authorId,
        },
      });
    },
  })
  .query("getAuthor", {
    async resolve({ ctx }) {
      return ctx.db.author.findUnique({
        where: {
          id: ctx.authorId,
        },
      });
    },
  })
  .query("getPosts", {
    input: z.object({
      skip: z.number().int().default(0),
      take: z.number().int().default(20),
    }),
    async resolve({ input, ctx: { db, authorId } }) {
      const query = {
        where: {
          authorId: authorId,
        },
      };
      const total = await db.post.count(query);
      const posts = await db.post.findMany({
        ...query,
        orderBy: {
          publishedTime: "desc",
        },
        ...input,
      });
      return { posts, total };
    },
  })
  .mutation("mdSerialize", {
    input: z.object({
      body: z.string(),
    }),
    async resolve({ input }) {
      const source = await serialize(input.body, {});
      return { source };
    },
  });
