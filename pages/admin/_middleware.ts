// pages/admin/_middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log({ token });
      return !!token;
    },
  },
});
