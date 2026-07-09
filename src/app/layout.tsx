import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL("https://suzu-comms.vercel.app"),
  title: "Pesona Suzu — Commissions & Open Collab",
  description: "Soft premium portfolio, commission pricing, terms, and open collaboration hub for Pesona Suzu / Suzu Bell Atelier.",
  openGraph: {
    title: "Pesona Suzu — Suzu Bell Atelier",
    description: "Anime and chibi commissions, portfolio, pricing, terms, FAQ, and open collaboration contact.",
    url: "https://suzu-comms.vercel.app",
    siteName: "Pesona Suzu",
    images: [{ url: "/suzu/portfolio/webp/kappuru-renshuu.webp", width: 1200, height: 1600, alt: "Pesona Suzu featured artwork" }],
  },
  twitter: { card: "summary_large_image", creator: "@ssuzudayo" },
};

export const viewport: Viewport = { themeColor: "#fff9f4", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
