import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../components/client/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICCT ASEAN Dashboard",
  description: "centralized dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Navbar />
        <main className="pt-16"> {/* Adjust padding to prevent content overlap with the navbar */}
          {children}
        </main>
      </body>
    </html>
  );
}
