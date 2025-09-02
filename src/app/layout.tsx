import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";

const behindTheNineties = localFont({
  src: "../fonts/behind-the-nineties.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-behind-the-nineties",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ribeira",
  description: "O lançamento mais aguardado de Braz Cubas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-[#efeeea]">
      <GoogleTagManager gtmId="GTM-NKBCCMDL" />
      <body
        className={`${montserrat.variable} ${behindTheNineties.variable} antialiased]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
