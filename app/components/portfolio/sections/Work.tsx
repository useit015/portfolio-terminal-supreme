import type { PortfolioProject } from "../../../types";
import PromptLine from "../PromptLine";

type Props = {
  projects: PortfolioProject[];
};

export default function Work({ projects }: Props) {
  return (
    <section className="portfolio-section" id="work">
      <PromptLine path="~/work" cmd="ls projects/" />
      <h2 className="section-title">Things I&apos;ve built and shipped.</h2>
      <p className="plain">
        A small, honest selection. Two are public and you can try them. Two
        shipped into production at paying clients.
      </p>

      <div className="projects">
        {projects.map((p, i) => {
          const host = p.link
            ? p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : null;
          const isExternal = !!p.link && p.link.startsWith("http");
          return (
            <article key={p.id} className="project">
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="project-tag">
                  <span className="bullet">●</span>
                  {p.tag}
                </div>
                <h3 className="project-title">{p.name}</h3>
                <p className="project-plain">{p.description}</p>
                <div className="project-foot">
                  <span>{p.stack.join(" · ").toLowerCase()}</span>
                  {p.link ? (
                    <a
                      href={p.link}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener" : undefined}
                    >
                      {host} ↗
                    </a>
                  ) : (
                    <span>{p.outcome}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
