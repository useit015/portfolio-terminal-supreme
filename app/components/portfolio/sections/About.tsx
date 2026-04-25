import PromptLine from "../PromptLine";

export default function About() {
  return (
    <section
      className="portfolio-section"
      id="about"
      aria-label="About"
    >
      <PromptLine path="~/about" cmd="cat about.md" />
      <h2 className="section-title" id="about-title">What I actually do.</h2>

      <p className="plain about-plain">
        I turn rough product ideas into production software: front end, back end,
        infrastructure, testing, and delivery. Most useful when the problem is
        messy, the deadline is real, and somebody needs to own the full slice.
      </p>

      <div className="about-strip" aria-label="Career highlights">
        <span>9+ years</span>
        <span>full-stack</span>
        <span>healthcare · fintech · AI</span>
        <span>42 / 1337</span>
      </div>
    </section>
  );
}
