import type { Metadata } from "next";
import content from "./content";
import "./globals.css";
import {
	sharedOpenGraph,
	sharedTwitter,
	SITE_DESCRIPTION,
	SITE_KEYWORDS,
	SITE_NAME,
	SITE_TITLE,
	SITE_URL,
} from "./seo";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	applicationName: SITE_NAME,
	title: {
		default: SITE_TITLE,
		template: `%s | ${content.identity.name}`,
	},
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	authors: [{ name: content.identity.name, url: SITE_URL }],
	creator: content.identity.name,
	publisher: content.identity.name,
	category: "portfolio",
	alternates: {
		canonical: "/",
	},
	openGraph: sharedOpenGraph,
	twitter: sharedTwitter,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	icons: {
		icon: "/favicon.svg",
		shortcut: "/favicon.ico",
	},
	manifest: "/manifest.webmanifest",
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
