import { PortfolioContent } from '../types';

export const COMMANDS = [
  { name: 'help', description: 'List available routes through the portfolio' },
  { name: 'banner', description: 'Reprint the terminal header' },
  { name: 'about', description: 'See positioning, highlights, and current focus' },
  { name: 'experience', description: 'View selected roles and delivery history' },
  { name: 'projects', description: 'Browse featured work' },
  { name: 'skills', description: 'Inspect the current technical stack' },
  { name: 'contact', description: 'Open contact paths and availability' },
  { name: 'clear', description: 'Clear the current session output' },
];

const sectionLabel = (label: string) => (
  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{label}</div>
);

const linkClassName =
  'inline-flex w-fit items-center gap-2 rounded-sm border border-transparent px-1.5 py-0.5 text-brand-accent underline decoration-dotted underline-offset-4 transition-colors hover:border-brand-panelEdge hover:bg-brand-accent hover:text-brand-background focus:border-brand-panelEdge focus:bg-brand-accent focus:text-brand-background focus:outline-none';

export const processCommand = (input: string, content: PortfolioContent): React.ReactNode => {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case 'help':
      return (
        <div className="flex max-w-2xl flex-col gap-3">
          {sectionLabel('routes')}
          <table className="w-full max-w-2xl text-sm">
            <tbody>
              {COMMANDS.map((c) => (
                <tr key={c.name} className="align-top">
                  <td className="w-28 py-1 font-semibold text-brand-accent">{c.name}</td>
                  <td className="py-1 text-brand-foreground">{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid gap-2 rounded-lg border border-brand-panelEdge bg-brand-panel/70 p-3 text-sm text-brand-muted">
            <div>Shortcuts: `Tab` auto-complete, `Esc` clear line, `Ctrl+C` reset input, `ArrowUp/ArrowDown` history.</div>
            <div>Suggested order: `about`, `experience`, `projects`, `contact`.</div>
          </div>
        </div>
      );

    case 'banner':
      return (
        <div className="space-y-3">
          <div className="whitespace-pre-wrap text-sm font-semibold leading-none text-brand-accentSoft sm:text-base">
            {content.banner.join('\n')}
          </div>
          <div className="text-sm text-brand-muted">{content.identity.role} | {content.identity.location}</div>
        </div>
      );

    case 'about':
      return (
        <div className="flex max-w-3xl flex-col gap-4">
          {sectionLabel('profile')}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-brand-foreground">{content.identity.intro}</p>
            <p className="text-brand-muted">{content.identity.summary}</p>
          </div>
          <div className="rounded-lg border border-brand-panelEdge bg-brand-panel/70 p-4">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accentSoft">
              Highlights
            </div>
            <div className="grid gap-2 text-sm text-brand-foreground">
              {content.highlights.map((item) => (
                <div key={item}>- {item}</div>
              ))}
            </div>
          </div>
          <div className="text-sm text-brand-muted">
            Next routes: <span className="text-brand-accent">experience</span>, <span className="text-brand-accent">projects</span>, <span className="text-brand-accent">contact</span>.
          </div>
        </div>
      );

    case 'experience':
      return (
        <div className="flex max-w-4xl flex-col gap-4">
          {sectionLabel('experience')}
          {content.experience.map((entry) => (
            <div key={`${entry.company}-${entry.period}`} className="rounded-lg border border-brand-panelEdge bg-brand-panel/65 p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <div className="text-base font-semibold text-brand-foreground">{entry.role} @ {entry.company}</div>
                  <div className="text-sm text-brand-muted">{entry.summary}</div>
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">{entry.period}</div>
              </div>
              <div className="mt-3 grid gap-1 text-sm text-brand-foreground">
                {entry.bullets.map((bullet) => (
                  <div key={bullet}>- {bullet}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'projects':
      return (
        <div className="flex max-w-4xl flex-col gap-4">
          {sectionLabel('selected work')}
          {content.projects.map((project) => (
            <div key={project.name} className="rounded-lg border border-brand-panelEdge bg-brand-panel/65 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-base font-semibold text-brand-foreground">{project.name}</div>
                  <div className="mt-1 text-sm text-brand-muted">{project.description}</div>
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">{project.tag}</div>
              </div>
              <div className="mt-3 text-sm text-brand-foreground">Stack: {project.stack.join(' · ')}</div>
              <div className="mt-1 text-sm text-brand-muted">{project.outcome}</div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClassName} mt-3`}
              >
                Open reference
              </a>
            </div>
          ))}
        </div>
      );

    case 'skills':
      return (
        <div className="flex max-w-3xl flex-col gap-4">
          {sectionLabel('skill map')}
          {content.skills.map((group) => (
            <div key={group.category} className="rounded-lg border border-brand-panelEdge bg-brand-panel/65 p-4">
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-accentSoft">
                {group.category}
              </div>
              <div className="text-sm leading-7 text-brand-foreground">{group.items.join(' · ')}</div>
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div className="flex max-w-2xl flex-col gap-4">
          {sectionLabel('contact')}
          <div className="rounded-lg border border-brand-panelEdge bg-brand-panel/65 p-4 text-sm text-brand-muted">
            {content.identity.availability}
          </div>
          <div className="grid gap-3">
            {content.links.map((link) => (
              <div key={link.label} className="flex flex-col gap-1 rounded-lg border border-brand-panelEdge bg-brand-panel/65 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-brand-foreground">{link.label}</div>
                <a href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'} className={linkClassName}>
                  {link.display}
                </a>
              </div>
            ))}
          </div>
          <div className="text-sm text-brand-muted">Location: {content.identity.location}</div>
        </div>
      );

    case '':
      return null;

    default:
      return (
        <div className="text-sm text-brand-foreground">
          <span className="text-red-400">Command not found:</span> {cmd}. Type{' '}
          <span className="text-brand-accent">help</span> for valid routes.
        </div>
      );
  }
};
