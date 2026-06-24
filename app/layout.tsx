import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dein Weg zur Übungsleiterrolle",
  description:
    "Interaktive Next.js-Lernreise zu Lachen, Lernen und Leisten für angehende Übungsleitende im Sportverein.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}


