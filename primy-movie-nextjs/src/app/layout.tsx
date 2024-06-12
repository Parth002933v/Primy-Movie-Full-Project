import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import Hearder from "@/components/header";
import GlobaleFooter from "@/components/footer";

export const metadata: Metadata = {
  title: "Primy Movie",

  description:
    "Download 1080p UHD 60FPS, 4k 2160 HDR, 1080p x265 10Bit, 4k SDR Movies & TV Series, Google Drive Direct Download Link, 4k Gdrive Links, 1080p Gdrive Links, 4k Dual Audio Movies, 1080p Dual Audio Movies, Hindi Dubbed HQ Movies, Top IMDB Movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <ThemeProvider
          storageKey="theme"
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Hearder />
          {children}
          <GlobaleFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
