import NextAuth from "next-auth";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import type { User as DbUser } from "@prisma/client";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      isAdmin?: boolean;
      authorId: string;
    } & DefaultSession["user"];
  }

  interface User extends DbUser {}
  interface JWT extends DefaultJWT {
    authorId?: string;
    isAdmin?: boolean;
  }
}
