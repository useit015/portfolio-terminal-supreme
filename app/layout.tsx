import type { Metadata } from "next";
import content from "./content";
import { themePresets } from "./content-data/themes";
import { LAST_LANDING_THEME_KEY } from "./utils/theme-rotation";
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

const THEME_NAMES = themePresets.map((theme) => theme.name);

const INIT_TWEAKS = `
(function(){try{
  var themes=${JSON.stringify(THEME_NAMES)};
  var key=${JSON.stringify(LAST_LANDING_THEME_KEY)};
  var previous=localStorage.getItem(key);
  var pool=previous?themes.filter(function(theme){return theme!==previous;}):themes.slice();
  if(!pool.length) pool=themes.slice();
  var next=pool[Math.floor(Math.random()*pool.length)];
  if(next){
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem(key,next);
  }
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
