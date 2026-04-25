import type { IndexedLink } from "../../../types";
import PromptLine from "../PromptLine";

type Props = {
  email: string;
  socials: IndexedLink[];
};

export default function Contact({ email, socials }: Props) {
  const [user, domain] = email.split("@");
  return (
    <section
      className="portfolio-section contact"
      id="contact"
      aria-label="Contact"
    >
      <PromptLine path="~/contact" cmd="cat contact.md" />
      <h2 id="contact-title">
        <a href={`mailto:${email}`}>
          {user}
          <span className="at">@</span>
          {domain}
        </a>
      </h2>
      <div className="links-row">
        <a className="link-btn delight-btn" href={`mailto:${email}`}>
          email me <span className="arrow">→</span>
        </a>
        {socials.map((s) => (
          <a
            key={s.id}
            className="link-btn delight-btn"
            href={s.href}
            target="_blank"
            rel="noopener"
          >
            {s.label.toLowerCase()} <span className="arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
