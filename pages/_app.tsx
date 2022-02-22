import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { FC, Fragment, ReactElement, ReactNode } from "react";
import { AppRouter } from "src/server/mod";
import superjson from "superjson";
import "../styles/globals.css";

type NextPageWithLayout = NextPage & {
  Layout: FC;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const Layout = Component.Layout || Fragment;

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
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
