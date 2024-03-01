import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}:
  Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col p-24 max-w-screen-2xl">
          {children}
        </main>
        <footer>
          This site was created by Etive Mor <Link href='https://www.etive-mor.com/'></Link>
        </footer>
      </body>
    </html>
  );
}

export const metadata: Metadata =  {
  metadataBase: new URL('http://localhost:3000/'),
  title: {
    template: '%s | Demo Umbraco NextJS Site',
    default: 'Demo Umbraco NextJS Site - A demo website created with NextJS and Umbraco'
  },
  description: 'A demo website created with NextJS and Umbraco',
  // openGraph: {
  //   title: {
  //     template: '%s | Demo Umbraco NextJS Site',
  //     default: 'Demo Umbraco NextJS Site - A demo website created with NextJS and Umbraco'
  //   },
  //   description: 'A demo website created with NextJS and Umbraco',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: {
  //     template: '%s | Demo Umbraco NextJS Site',
  //     default: 'Demo Umbraco NextJS Site - A demo website created with NextJS and Umbraco'
  //   },
  // },
}