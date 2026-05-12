import type { Metadata } from "next";
import content from "./content";
import "./globals.css";

export const metadata: Metadata = {
  title: content.identity.title,
  description: content.identity.intro,
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "llms-txt": "/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="espresso"
      data-body="mono"
      data-density="roomy"
      data-scanline="on"
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
