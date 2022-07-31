import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, Fragment, useEffect } from "react";
import { AppRouter } from "src/server/mod";
import superjson from "superjson";
import "../styles/globals.css";
import * as ga from "../utils/ga";

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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange =
      process.env.NODE_ENV === "production"
        ? (url: string) => {
            ga.pageview(url);
          }
        : (url: string) => {};
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const Layout = Component.Layout || Fragment;

  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="description" content="Farmaceutica Younger" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon/favicon-16x16.png"
        />
        <link rel="manifest" href="/icon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ec489a" />
        <meta
          name="msapplication-TileImage"
          content="/icon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ec489a" />
        <GAHeader />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
      <IubendaCookieBanner />
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

const IubendaCookieBanner = () => {
  const router = useRouter();
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  if (router?.pathname?.startsWith("/_i/")) {
    return null;
  }

  const script = `<script type="text/javascript">
  var _iub = _iub || [];
  _iub.csConfiguration = {"lang":"it","siteId":1353353,"whitelabel":false,"cookiePolicyId":86855038, "banner":{ "textColor":"white","backgroundColor":"black" }};
  </script>
  <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>`;
  return <div dangerouslySetInnerHTML={{ __html: script }}></div>;
};

const GAHeader = () => {
  const router = useRouter();
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  if (router?.pathname?.startsWith("/_i/")) {
    return null;
  }
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
      page_path: window.location.pathname,
    });
  `,
        }}
      />
    </>
  );
};
