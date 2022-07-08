import { Head, Html, Main, NextScript } from "next/document";
import { useRouter } from "next/router";

export default function Document() {
  return (
    <Html className="h-full bg-gray-50">
      <Head></Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
