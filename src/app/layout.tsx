import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Grana PDF - Ebooks Personalizados por IA",
  description: "Gere ebooks personalizados por nicho usando inteligência artificial. Conteúdo profissional em PDF por apenas R$ 9,97.",
  keywords: "ebook, pdf, ia, nicho, conteúdo, marketing, negócios",
  authors: [{ name: "Grana PDF" }],
  openGraph: {
    title: "Grana PDF - Ebooks Personalizados por IA",
    description: "Gere ebooks personalizados por nicho usando inteligência artificial.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
