import type { SourceOfTruthContent } from "../../../types";
import PromptLine from "../PromptLine";
import ToptalBadge from "../ToptalBadge";

type Props = {
  sourceOfTruth: SourceOfTruthContent;
};

export default function Proof({ sourceOfTruth }: Props) {
  return (
    <section
      className="portfolio-section"
      id="proof"
      aria-labelledby="proof-title"
    >
      <PromptLine path="~/source" cmd="cat source" />
      <h2 className="section-title" id="proof-title">
        {sourceOfTruth.headline}
      </h2>
      <div className="proof-intro">
        <p className="plain proof-plain">{sourceOfTruth.summary}</p>
        <ToptalBadge />
      </div>
      <ol className="proof-grid">
        {sourceOfTruth.bullets.map((item, index) => (
          <li key={item} className="proof-item delight-card">
            <div className="proof-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p>{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
