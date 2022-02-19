import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { AppRouter } from "./api/trpc/[trpc]";
import superjson from "superjson";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = "/api/trpc";

    return {
      transformer: superjson,
      url,
    };
  },
  ssr: false,
})(MyApp);
