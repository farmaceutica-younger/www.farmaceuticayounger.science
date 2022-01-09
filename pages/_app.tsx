import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "./api/trpc/[trpc]";

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
      url,
    };
  },
  ssr: false,
})(MyApp);
