import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getConfigs } from "env-ts-conf";
import { getSession } from "next-auth/react";
import { NewJobsClient } from "services/jobs";
import { db } from "services/db";

export const jobsConfig = getConfigs({
  host: {
    type: "string",
    variableName: "JOBS_URI",
  },
  skipTLS: {
    type: "boolean",
    variableName: "KANNAN_SKIP_TLS",
    default: true,
  },
});

const jobsCli = NewJobsClient(jobsConfig);

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getSession({ req });
  return {
    req,
    res,
    db,
    session,
    jobsCli,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
