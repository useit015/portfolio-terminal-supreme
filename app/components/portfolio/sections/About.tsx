import type { PortfolioContent, StatEntry } from "../../../types";
import PromptLine from "../PromptLine";
import ToptalBadge from "../ToptalBadge";

type Props = {
  identity: PortfolioContent["identity"];
  highlights: string[];
  stats: StatEntry[];
};

export default function About({ identity, highlights, stats }: Props) {
  const stripStats = stats.slice(0, 4);

  return (
    <section
      className="portfolio-section"
      id="about"
      aria-label="About"
    >
      <PromptLine path="~/about" cmd="cat about.md" />
      <h2 className="section-title" id="about-title">What I actually do.</h2>

      <p className="plain about-plain">
        {identity.summary} Most useful when the problem is messy, the deadline is
        real, and somebody needs to own the full slice.
      </p>

      <div className="about-proof-panel">
        <div className="about-highlights" aria-label="Career proof points">
          {highlights.map((item) => (
            <div key={item} className="about-proof">
              <span aria-hidden="true">›</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
        <aside className="about-badge" aria-label="Toptal verification">
          <ToptalBadge />
        </aside>
      </div>

      <div className="about-strip" aria-label="Career highlights">
        {stripStats.map((stat) => (
          <span key={`${stat.value}-${stat.label}`}>
            {stat.value} {stat.label}
          </span>
        ))}
      </div>
    </section>
  );
}
