import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { Context } from "src/server/context";
import superjson from "superjson";
import { authorRouter } from "./author.routers";

export const appRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .merge("author.", authorRouter);

export type AppRouter = typeof appRouter;
