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
      const [{ jobs }, { total }] = await Promise.all([
        ctx.jobsCli.getJobs({
          companyIds: input.companieIDs,
          skip: input.skip,
          take: input.take,
        }),
        ctx.jobsCli.countJobs({
          companyIds: input.companieIDs,
        }),
      ]);
      return {
        jobs,
        total,
      };
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
