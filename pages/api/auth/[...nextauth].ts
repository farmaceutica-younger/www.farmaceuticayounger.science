import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "services/db";
import { getConfigs } from "env-ts-conf";
import { NextApiRequest, NextApiResponse } from "next";

const googleConfig = getConfigs({
  clientId: {
    type: "string",
    variableName: "GOOGLE_ID",
  },
  clientSecret: {
    type: "string",
    variableName: "GOOGLE_SECRET",
  },
});

const options = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      ...googleConfig,
    }),
  ],
  debug: false,
};

const auth = (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, options);

export default auth;
