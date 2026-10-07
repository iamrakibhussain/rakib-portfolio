import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Aurora from "@/components/ui/Aurora";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Rakib Hussain | Full-Stack Developer",
    template: "%s | Rakib Hussain",
  },
  description: "Full-Stack Developer specializing in JavaScript, TypeScript, and modern web architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Aurora
          colorStops={["#7cff67", "#B497CF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <Header />
        <main className="flex-1 w-full relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
