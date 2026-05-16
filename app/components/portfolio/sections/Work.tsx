import type { PortfolioProject } from "../../../types";
import PromptLine from "../PromptLine";

type Props = {
  projects: PortfolioProject[];
};

export default function Work({ projects }: Props) {
  return (
    <section
      className="portfolio-section"
      id="work"
      aria-label="Selected work"
    >
      <PromptLine path="~/work" cmd="ls projects/" />
      <h2 className="section-title" id="work-title">Things I&apos;ve built and shipped.</h2>
      <p className="plain">
        A compact selection across AI tooling, creator workflows, game-tech,
        and enterprise delivery. Public links appear where the repo or proof
        surface is safe to open.
      </p>

      <div className="projects">
        {projects.map((p, i) => {
          const host = p.link
            ? p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : null;
          const isExternal = !!p.link && p.link.startsWith("http");
          return (
            <article key={p.id} className="project delight-card">
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
                      aria-label={`View ${p.name} project on ${host}`}
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
