import Link from "next/link";
import type { PortfolioContent } from "../../../types";
import PromptLine from "../PromptLine";

type Props = {
  identity: PortfolioContent["identity"];
};

export default function Hero({ identity }: Props) {
  return (
    <section className="portfolio-section hero" id="top" aria-labelledby="hero-title">
      <PromptLine path="~" cmd="whoami" caret />
      <h1 id="hero-title">
        I build <span className="accent">software</span> that ships.
      </h1>
      <p className="hero-lede">
        {identity.intro} I turn messy product problems into shipped software
        across healthcare, fintech, AI tools, and browser games.
      </p>
      <div className="hero-actions" aria-label="Primary portfolio actions">
        <Link href="/terminal" className="terminal-cta" aria-label="Open the interactive terminal version">
          open terminal version <span aria-hidden="true">↗</span>
        </Link>
        <a href="mailto:useit015@gmail.com" className="hero-mail">
          email me
        </a>
      </div>
    </section>
  );
}
