import { PortfolioContent, PortfolioProject } from "../../../types";
import {
	cardClassName,
	commandClassName,
	entryClassName,
	linkClassName,
	usageOutput,
} from "./common";

export const renderProjectCard = (project: PortfolioProject) => (
	<div key={project.id} className={`space-y-2 ${entryClassName}`}>
		<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<div className="text-base font-semibold text-brand-foreground">
					{project.id}. {project.name}
				</div>
				<div className="mt-1 max-w-3xl text-sm leading-6 text-brand-muted">
					{project.description}
				</div>
			</div>
			<div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">
				{project.tag}
			</div>
		</div>
		<div className="text-sm text-brand-foreground">
			Stack: {project.stack.join(" · ")}
		</div>
		<div className="text-sm text-brand-muted">{project.outcome}</div>
	</div>
);

export const renderExperience = (content: PortfolioContent) => (
	<div data-testid="experience" className="space-y-5">
		{content.experience.map((entry) => (
			<div key={`${entry.company}-${entry.period}`} className="space-y-2">
				<div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<div className="text-base font-semibold text-brand-foreground">
							{entry.role} @ {entry.company}
						</div>
						<div className="max-w-4xl text-sm leading-6 text-brand-muted">
							{entry.summary}
						</div>
					</div>
					<div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">
						{entry.period}
					</div>
				</div>
				<div className="grid gap-1 text-sm leading-7 text-brand-foreground">
					{entry.bullets.map((bullet) => (
						<div key={bullet} className="flex gap-2">
							<span className="shrink-0 select-none text-brand-muted">›</span>
							<span>{bullet}</span>
						</div>
					))}
				</div>
			</div>
		))}
	</div>
);

export const renderProjects = (content: PortfolioContent) => (
	<div data-testid="projects" className="space-y-4">
		<div className="max-w-3xl text-sm leading-7 text-brand-muted">
			Talk is cheap. These are the projects that best show how I build: AI
			tooling, enterprise delivery, product software, and game-tech curiosity.
		</div>
		{content.projects.map((project) => renderProjectCard(project))}
		{usageOutput("projects", "projects [go <id>]")}
	</div>
);

export const renderEducation = (content: PortfolioContent) => (
	<div data-testid="education" className="space-y-4">
		{content.education.map((entry) => (
			<div key={`${entry.degree}-${entry.period}`} className="space-y-1">
				<div className="text-base font-semibold text-brand-foreground">
					{entry.degree}
				</div>
				<div className="text-sm text-brand-muted">{entry.institution}</div>
				<div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">
					{entry.period}
				</div>
				<div className="max-w-3xl text-sm leading-6 text-brand-foreground">
					{entry.detail}
				</div>
			</div>
		))}
	</div>
);

export const renderSocials = (content: PortfolioContent) => (
	<div data-testid="socials" className="space-y-4">
		<div className="text-sm leading-7 text-brand-muted">
			GitHub for code, LinkedIn for context, X for the running commentary.
		</div>
		<div className="grid gap-2 text-sm">
			{content.socials.map((social) => (
				<div
					key={social.id}
					className="flex flex-col gap-1 sm:flex-row sm:items-center"
				>
					<span className="w-28 font-semibold text-brand-foreground">
						{social.id}. {social.label}
					</span>
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						className={linkClassName}
					>
						{social.display}
					</a>
				</div>
			))}
		</div>
		{usageOutput("socials", "socials [go <id>]")}
	</div>
);

export const renderThemes = (content: PortfolioContent) => (
	<div data-testid="themes" className="space-y-4">
		<div className="grid gap-3 md:grid-cols-2">
			{content.themePresets.map((theme) => (
				<div key={theme.name} className={`space-y-2 ${cardClassName}`}>
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-sm font-semibold text-brand-foreground">
							{theme.name}
						</span>
						<span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accentSoft">
							{theme.label}
						</span>
					</div>
					<div className="flex items-center gap-1.5">
						{(
							[
								theme.tokens.background,
								theme.tokens.panel,
								theme.tokens.foreground,
								theme.tokens.accent,
								theme.tokens.accentSoft,
							] as string[]
						).map((color, index) => (
							<span
								key={index}
								className="h-3 w-3 rounded-full border border-brand-panelEdge/30"
								style={{ backgroundColor: color }}
							/>
						))}
					</div>
					<div className="text-sm leading-6 text-brand-muted">
						{theme.description}
					</div>
				</div>
			))}
		</div>
		<div className="max-w-2xl text-sm leading-7 text-brand-muted">
			Use <span className={commandClassName}>themes set &lt;name&gt;</span> to
			switch palettes.
		</div>
		{usageOutput("themes", "themes [set <name>]")}
	</div>
);

const labStatusStyles: Record<string, { dot: string; text: string }> = {
	Active: {
		dot: "bg-emerald-400",
		text: "text-emerald-400",
	},
	Playable: {
		dot: "bg-brand-accentSoft",
		text: "text-brand-accentSoft",
	},
	Experimental: {
		dot: "bg-yellow-400",
		text: "text-yellow-400",
	},
	"Long-running": {
		dot: "bg-brand-muted",
		text: "text-brand-muted",
	},
};

const renderLabStatus = (status: string) => {
	const styles = labStatusStyles[status] ?? {
		dot: "bg-brand-muted",
		text: "text-brand-muted",
	};
	return (
		<div className="flex items-center gap-1.5">
			<span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
			<span className={`text-xs uppercase tracking-[0.18em] ${styles.text}`}>
				{status}
			</span>
		</div>
	);
};

export const renderLab = (content: PortfolioContent) => (
	<div data-testid="lab" className="space-y-4">
		<div className="max-w-4xl text-sm leading-7 text-brand-muted">
			{content.lab.summary}
		</div>
		{content.lab.entries.map((entry) => (
			<div key={entry.name} className={`space-y-2 ${entryClassName}`}>
				<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
					<div className="text-base font-semibold text-brand-foreground">
						{entry.name}
					</div>
					{renderLabStatus(entry.status)}
				</div>
				<div className="max-w-4xl text-sm leading-6 text-brand-muted">
					{entry.detail}
				</div>
				<div className="text-sm text-brand-muted">
					Stack: {entry.stack.join(" · ")}
				</div>
			</div>
		))}
	</div>
);
