import { z } from "zod";
import { createRouter } from "./router";

export const jobsRouter = createRouter()
  .query("getJobs", {
    input: z.object({
      companieIDs: z.string().array(),
      skip: z.number(),
      take: z.number(),
    }),
    async resolve({ input, ctx }) {
      return ctx.jobsCli.getJobs({
        companyIds: input.companieIDs,
        skip: input.skip,
        take: input.take,
      });
    },
  })
  .query("countJobs", {
    input: z.object({
      companieIDs: z.string().array(),
    }),
    async resolve({ input, ctx }) {
      return ctx.jobsCli.countJobs({
        companyIds: input.companieIDs,
      });
    },
  });
