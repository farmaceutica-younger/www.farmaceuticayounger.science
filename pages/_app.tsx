import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { AppRouter } from "src/server/mod";
import superjson from "superjson";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
