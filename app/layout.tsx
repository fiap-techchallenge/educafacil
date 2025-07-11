import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EducaFácil",
  description: "Uma plataforma de ensino online para todos",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
