"use client";

import { useEffect, useState } from "react";
import content from "../../content";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Topline from "./sections/Topline";
import Work from "./sections/Work";
import ThemeSwitcher from "./ThemeSwitcher";
import "./portfolio.css";

const THEME_KEY = "portfolio-theme";
const DEFAULT_THEME = "espresso";

export default function Portfolio() {
  const { identity, values, projects, experience, socials, themePresets } =
    content;
  const themeNames = new Set(themePresets.map((t) => t.name));

  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved && themeNames.has(saved)) setTheme(saved);
    } catch {}
    const root = document.documentElement;
    root.setAttribute("data-body", "mono");
    root.setAttribute("data-density", "roomy");
    root.setAttribute("data-scanline", "on");
    setHydrated(true);
    document.body.classList.add("portfolio-body");
    return () => {
      document.body.classList.remove("portfolio-body");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme, hydrated]);

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
      >
        skip to main content
      </a>
      <main className="portfolio-page" id="main-content">
        <Topline email={identity.email} />
        <div className="animate-fade-in-up stagger-1"><Hero /></div>
        <div className="animate-fade-in-up stagger-2"><About values={values} /></div>
        <div className="animate-fade-in-up stagger-3"><Work projects={projects} /></div>
        <div className="animate-fade-in-up stagger-4"><Experience experience={experience} /></div>
        <div className="animate-fade-in-up stagger-5"><Skills /></div>
        <div className="animate-fade-in-up stagger-6"><Contact email={identity.email} socials={socials} /></div>
        <Footer />
      </main>
      <ThemeSwitcher
        themes={themePresets}
        active={theme}
        onChange={setTheme}
      />
    </>
  );
}
