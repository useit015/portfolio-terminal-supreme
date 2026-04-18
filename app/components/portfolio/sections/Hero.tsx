import PromptLine from "../PromptLine";

export default function Hero() {
  return (
    <section className="portfolio-section hero" id="top">
      <PromptLine path="~" cmd="whoami" caret />
      <h1>
        I build <span className="accent">software</span> that ships.
      </h1>
      <p className="hero-lede">
        Senior full-stack engineer. Nine years turning ideas into working
        software, across healthcare platforms, browser games, and AI tools.
      </p>
    </section>
  );
}
