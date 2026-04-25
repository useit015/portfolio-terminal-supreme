"use client";

import { useEffect, useState } from "react";
import content from "../../content";
import {
  chooseLandingTheme,
  readLandingTheme,
  writeLandingTheme,
} from "../../utils/theme-rotation";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Topline from "./sections/Topline";
import ThemeSwitcher from "./ThemeSwitcher";
import "./portfolio.css";

const DEFAULT_THEME = "espresso";

export default function Portfolio() {
  const { identity, experience, socials, themePresets } = content;
  const themeNames = themePresets.map((t) => t.name);

  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [hydrated, setHydrated] = useState(false);
  const [navCompact, setNavCompact] = useState(false);

  useEffect(() => {
    const previousLandingTheme = readLandingTheme(window.localStorage);
    const preHydratedTheme = document.documentElement.getAttribute("data-theme");
    const landingTheme =
      preHydratedTheme &&
      themeNames.includes(preHydratedTheme) &&
      preHydratedTheme === previousLandingTheme
        ? preHydratedTheme
        : chooseLandingTheme(themeNames, previousLandingTheme);

    if (landingTheme) {
      setTheme(landingTheme);
      document.documentElement.setAttribute("data-theme", landingTheme);
      writeLandingTheme(window.localStorage, landingTheme);
    }

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
    const updateNavState = () => setNavCompact(window.scrollY > 80);
    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });

    return () => window.removeEventListener("scroll", updateNavState);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, hydrated]);

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    writeLandingTheme(window.localStorage, themeName);
  };

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
      >
        skip to main content
      </a>
      <main
        className="portfolio-page"
        id="main-content"
        aria-label="Scrollable portfolio"
      >
        <Topline email={identity.email} compact={navCompact} />
        <div className="animate-fade-in-up stagger-1"><Hero /></div>
        <div className="animate-fade-in-up stagger-2"><About /></div>
        <div className="animate-fade-in-up stagger-3"><Experience experience={experience} /></div>
        <div className="animate-fade-in-up stagger-4"><Skills /></div>
        <div className="animate-fade-in-up stagger-5"><Contact email={identity.email} socials={socials} /></div>
        <Footer />
      </main>
      <ThemeSwitcher
        themes={themePresets}
        active={theme}
        onChange={handleThemeChange}
      />
    </>
  );
}
