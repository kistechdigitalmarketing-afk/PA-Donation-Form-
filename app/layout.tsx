import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PA Donation Form",
  description: "Donation form for Possibilities Africa",
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

