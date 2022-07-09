import { Event } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { EventFormSchema } from "components/form/event-form";
import slugify from "slugify";
import { z } from "zod";
import { createRouter } from "./router";

export const eventsRouter = createRouter()
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
  .mutation("updateEvent", {
    input: z.object({
      data: EventFormSchema,
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.db.event.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("createEvent", {
    input: z.object({
      data: EventFormSchema,
    }),
    async resolve({ input, ctx }) {
      return await ctx.db.event.create({
        data: {
          ...input.data,
          authorId: ctx.authorId,
        },
      });
    },
  })
  .mutation("publishEvent", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const event = await ctx.db.event.findFirst({
        where: {
          id: input.id,
          authorId: ctx.authorId,
        },
      });
      if (!event) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (event.slug) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event already published",
        });
      }
      const d = event.startDate;
      const slug = slugify(event.title.substring(0, 50), {
        lower: true,
        trim: true,
        remove: /[*+~.()'"!:@,]/g,
      });
      const slugAndDate = `${d.getFullYear()}-${d.getMonth()}-${slug}`;
      return await ctx.db.event.update({
        where: {
          id: event.id,
        },
        data: {
          slug: slugAndDate,
        },
      });
    },
  })
  .query("getEvent", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.db.event.findFirst({
        where: {
          id: input.id,
          authorId: ctx.authorId,
        },
      });
    },
  })
  .query("getEventTickets", {
    input: z.object({
      id: z.string(),
      skip: z.number(),
      take: z.number(),
    }),
    async resolve({ input, ctx }) {
      const [total, tickets] = await ctx.db.$transaction([
        ctx.db.eventTicket.count({
          where: {
            eventId: input.id,
          },
        }),
        ctx.db.eventTicket.findMany({
          where: {
            eventId: input.id,
          },
          skip: input.skip,
          take: input.take,
        }),
      ]);
      return { total, tickets };
    },
  })
  .query("getEvents", {
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
      const total = await db.event.count(query);
      const events = await db.event.findMany({
        ...query,
        orderBy: {
          startDate: "desc",
        },
        ...input,
      });
      return { events, total };
    },
  });
