import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mobile İndirici",
  description: "YouTube, TikTok, Instagram video indirme aracı",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-[#0A1628] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
