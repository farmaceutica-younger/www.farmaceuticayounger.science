import * as trpc from "@trpc/server";
import { Context } from "src/server/context";
import superjson from "superjson";
import { authorRouter } from "./author.routers";
import { eventsRouter } from "./events.routers";
import { ticketRouter } from "./tickets.routers";

export const appRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .merge("author.", authorRouter)
  .merge("events.", eventsRouter)
  .merge("tickets.", ticketRouter);

export type AppRouter = typeof appRouter;
