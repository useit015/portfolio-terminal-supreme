import type { Metadata } from "next";
import content from './content';
import "./globals.css";

export const metadata: Metadata = {
  title: content.identity.title,
  description: content.identity.intro,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh overflow-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
