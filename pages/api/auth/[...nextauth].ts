import NextAuth, { NextAuthOptions } from "next-auth";
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

const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GoogleProvider({
      ...googleConfig,
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token, user }) => {
      if (session.user) {
        session.user.authorId = token.authorId as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.authorId = user.authorId;
      }
      return token;
    },
  },
};

const auth = (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, options);

export default auth;
