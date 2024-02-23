import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Providers } from "./providers";
import dynamic from "next/dynamic";
import WebNavbar from "@/components/WebNavbar";
import getTheme from "@/lib/getTheme";

export const metadata: Metadata = {
  title: "Crypto Goat App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = getTheme();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <WebNavbar theme={theme} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
