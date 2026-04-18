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

const INIT_TWEAKS = `
(function(){try{
  var raw=localStorage.getItem('portfolio-theme');
  if(raw) document.documentElement.setAttribute('data-theme',raw);
}catch(e){}})();
`;

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
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT_TWEAKS }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
