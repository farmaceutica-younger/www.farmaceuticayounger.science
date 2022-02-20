import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";

const db = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getSession({ req });
  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
    include: {
      author: true,
    },
  });
  return {
    req,
    res,
    db,
    session,
    user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
