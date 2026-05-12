import type { PortfolioExperienceEntry } from "../../../types";
import PromptLine from "../PromptLine";

type Props = {
  experience: PortfolioExperienceEntry[];
};

function CompanyName({ entry }: { entry: PortfolioExperienceEntry }) {
  if (!entry.website) {
    return <>{entry.company}</>;
  }

  return (
    <a className="tl-company-link" href={entry.website} target="_blank" rel="noopener noreferrer">
      {entry.company}
    </a>
  );
}

export default function Experience({ experience }: Props) {
  return (
    <section
      className="portfolio-section"
      id="experience"
      aria-label="Experience"
    >
      <PromptLine path="~/experience" cmd="git log --oneline" />
      <h2 className="section-title" id="experience-title">Where I&apos;ve worked, in reverse order.</h2>
      <p className="plain">
        The short version. For each one: what the company did, what I did there,
        and what shipped.
      </p>

      <div className="timeline">
        {experience.map((e) => (
          <div key={`${e.company}-${e.period}`} className="tl-item">
            <div className="tl-meta">
              <span className="when">{e.period.toLowerCase()}</span>
              <span><CompanyName entry={e} /></span>
            </div>
            <h3 className="tl-role">
              {e.role} <span className="at">· <CompanyName entry={e} /></span>
            </h3>
            <p className="tl-body">{e.summary}</p>
            <ul className="tl-bullets">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
