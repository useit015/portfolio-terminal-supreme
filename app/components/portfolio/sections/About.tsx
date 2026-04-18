import type { ValueEntry } from "../../../types";
import PromptLine from "../PromptLine";

type Props = {
  values: ValueEntry[];
};

export default function About({ values }: Props) {
  return (
    <section className="portfolio-section" id="about">
      <PromptLine path="~/about" cmd="cat about.md" />
      <h2 className="section-title">What I actually do, in plain English.</h2>

      <p className="plain">
        I&apos;m the person you bring in when an idea needs to become real
        software. Website, app, internal tool. I can do the whole thing: what
        people see, what stores the data, and what keeps it running.{" "}
        <em className="tech">
          architecture · front-end · back-end · infra · delivery
        </em>
      </p>

      <div className="prose">
        <p>
          Nine years across startups, agencies, and enterprise teams.
          Healthcare platforms used by hospitals, a fintech product piloting in
          Zambia, rescue work on codebases that were falling apart, and some
          weirder things like browser games, AI tools, and 3D engine work.
        </p>
        <p className="muted">
          I went through 42 Network (1337 in Khouribga, Morocco), a
          peer-taught, project-based program heavy on low-level systems, Unix,
          and algorithms. Before that, a European Bachelor&apos;s in networks
          and security.
        </p>
      </div>

      <div className="values">
        {values.map((v, i) => (
          <div key={v.title} className="value">
            <div className="v-title">
              <span className="v-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{v.title}</span>
            </div>
            <div className="v-body">{v.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
