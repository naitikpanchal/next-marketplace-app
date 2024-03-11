import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import  SessionProvider  from "@/app/SessionProvider";
import Navbar from "@/app/Navbar/Navbar";
import Footer from "./Footer";

const roboto = Roboto({ subsets: ["latin"], weight: ["400","500","700"]});

export const metadata: Metadata = {
  title: "Marketplace App",
  description: "A simple marketplace app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider>
        <Navbar />
        <main className="p-4 max-w-7xl m-auto min-w-[300px]">
        {children}
        </main>
        <Footer />
        </SessionProvider> 
      </body>
    </html>
  );
}
