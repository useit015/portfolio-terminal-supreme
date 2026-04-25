import PromptLine from "../PromptLine";

type SkillEntry = {
  head: string;
  plain: string;
  tags: string[];
};

const SKILL_GROUPS: SkillEntry[] = [
  {
    head: "build the thing people see",
    plain:
      "The website, app, or dashboard your users actually click through. Fast, responsive, and accessible.",
    tags: ["TypeScript", "React", "Next.js", "HTML/CSS", "React Native"],
  },
  {
    head: "build what's behind it",
    plain:
      "The servers and databases that store your data and keep the whole thing running under load.",
    tags: [
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "REST APIs",
    ],
  },
  {
    head: "keep it online and shipping",
    plain:
      "Hosting, deployment pipelines, and the plumbing that lets you push new versions without breaking things.",
    tags: ["AWS SAM", "Lambda", "API Gateway", "S3", "Docker", "CI/CD"],
  },
  {
    head: "ship AI features that actually work",
    plain:
      "Integrating LLMs, model selection, document workflows, OCR/KYC, and AI product surfaces into real software. Not demo confetti.",
    tags: [
      "OpenAI",
      "OpenRouter",
      "Replicate",
      "FAL",
      "OCR / KYC",
      "annotation workflows",
    ],
  },
  {
    head: "interactive & game-tech",
    plain:
      "Real-time apps, browser games, graphics, and low-level interaction work. Less common territory, more interesting to work in.",
    tags: ["Pixi.js 8", "Three.js", "WebRTC", "Web3.js"],
  },
  {
    head: "systems & fundamentals",
    plain:
      "Comfortable at the low level when it matters. Unix, networking, cryptography. The stuff most web developers never touch.",
    tags: ["Unix / Linux", "TCP/IP", "C / low-level", "42 Network"],
  },
];

export default function Skills() {
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
        {SKILL_GROUPS.map((s, i) => (
          <div key={s.head} className="skill delight-card">
            <div className="s-num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className="skill-head">{s.head}</div>
              <p className="skill-plain">{s.plain}</p>
              <div className="skill-tech">
                {s.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
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
