import type { PortfolioSkillGroup } from "../../../types";
import PromptLine from "../PromptLine";

type Props = {
  skills: PortfolioSkillGroup[];
};

export default function Skills({ skills }: Props) {
  return (
    <section
      className="portfolio-section"
      id="skills"
      aria-label="Skills"
    >
      <PromptLine path="~/skills" cmd={'grep -r "can_do"'} />
      <h2 className="section-title" id="skills-title">What I can do.</h2>
      <p className="plain">
        Plain description first, tool names after. Both kinds of people read
        this.
      </p>

      <div className="skills">
        {skills.map((skill, i) => (
          <div key={skill.category} className="skill delight-card">
            <div className="s-num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className="skill-head">{skill.category}</div>
              {skill.description ? (
                <p className="skill-plain">{skill.description}</p>
              ) : null}
              <div className="skill-tech">
                {skill.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
