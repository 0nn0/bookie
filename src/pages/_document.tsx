import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full bg-gray-100">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#94a3b8" />
        <link
          rel="preload"
          href="/fonts/Inter-roman.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="h-full ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
