import "./globals.css";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "AI Spend Audit",
  description: "Find overspend across your AI tools and subscriptions.",
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
