import type { Metadata } from "next";
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
      <body className="bg-background text-foreground overflow-hidden"> {/* Prevent body from scrolling */}
        <Navbar />
        <main className="pt-16 h-screen overflow-y-auto"> {/* Allow scrolling only in the main content */}
          {children}
        </main>
      </body>
    </html>
  );
}
