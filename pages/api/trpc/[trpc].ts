import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { PostFormSchema } from "components/form/post-form";
import { serialize } from "next-mdx-remote/serialize";
import { cloudinary, cloudinaryConfig } from "services/cloudinary";
import { db } from "services/db";
import { z } from "zod";
import superjson from "superjson";

const appRouter = trpc
  .router()
  .transformer(superjson)
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("posts.getPost", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return await db.post.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("cloudinary.getUploadsignature", {
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
        toSign,
        cloudinaryConfig.secret
      );
      return { timestamp, signature, folder, apiKey, cloudName };
    },
  })
  .mutation("md.serialize", {
    input: z.object({
      body: z.string(),
    }),
    async resolve({ input }) {
      const source = await serialize(input.body, {});
      return { source };
    },
  })
  .mutation("post.save", {
    input: z.object({
      data: PostFormSchema,
      id: z.string(),
    }),
    async resolve({ input }) {
      return await db.post.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
