import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import SideMenu from "@/components/side-menu";
import MyCard from "@/components/custom-card";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" flex bg-muted  w-screen h-screen p-4">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
