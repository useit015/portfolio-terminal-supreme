import { PortfolioContent, ValueEntry } from "../../../types";
import {
	cardClassName,
	commandClassName,
	linkClassName,
	sectionLabel,
} from "./common";

export const renderWelcome = (content: PortfolioContent) => (
	<div data-testid="welcome" className="max-w-4xl space-y-6">
		<pre className="hidden overflow-x-auto text-[0.67rem] font-semibold leading-[1.05rem] text-brand-accent sm:block">
			{content.welcome.ascii.join("\n")}
		</pre>
		<pre className="overflow-x-auto text-[0.62rem] font-semibold leading-4 text-brand-accent sm:hidden">
			{content.welcome.mobileAscii.join("\n")}
		</pre>
		<div className="space-y-3">
			{content.welcome.introLines.map((line, index) => (
				<p
					key={line}
					className={
						index === 0
							? "text-xl font-semibold leading-snug text-brand-foreground md:text-2xl"
							: "text-sm leading-7 text-brand-muted md:text-base"
					}
				>
					{line}
				</p>
			))}
		</div>
		<div className="text-sm text-brand-muted">
			<span className={commandClassName}>help</span> for commands ·{" "}
			<span className={commandClassName}>about</span> ·{" "}
			<span className={commandClassName}>projects</span> ·{" "}
			<span className={commandClassName}>contact</span>
		</div>
	</div>
);

export const renderAbout = (content: PortfolioContent) => (
	<div data-testid="about" className="flex max-w-5xl flex-col gap-5">
		<div className="space-y-2">
			{sectionLabel("About")}
			<p className="text-lg font-semibold leading-snug text-brand-foreground">
				{content.identity.intro}
			</p>
			<p className="max-w-4xl text-sm leading-7 text-brand-muted">
				{content.identity.summary}
			</p>
		</div>
		<div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
			<div className="space-y-4">
				<div className="space-y-2">
					{sectionLabel("Highlights")}
					<div className="grid gap-2 text-sm leading-7 text-brand-foreground">
						{content.highlights.map((item) => (
							<div key={item} className="flex gap-2">
								<span className="shrink-0 select-none text-brand-muted">›</span>
								<span>{item}</span>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-2">
					{sectionLabel("Selected Experience")}
					{content.experience.slice(0, 4).map((entry) => (
						<div key={`${entry.company}-${entry.period}`} className="space-y-1">
							<div className="text-sm font-semibold text-brand-foreground">
								{entry.role} @ {entry.company}
							</div>
							<div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">
								{entry.period}
							</div>
							<div className="text-sm leading-6 text-brand-muted">
								{entry.summary}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="space-y-4">
				<div className="space-y-2">
					{sectionLabel("Links")}
					<div className="grid gap-2 text-sm">
						{content.links.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target={link.href.startsWith("mailto:") ? undefined : "_blank"}
								rel={
									link.href.startsWith("mailto:")
										? undefined
										: "noopener noreferrer"
								}
								className={linkClassName}
							>
								{link.label}: {link.display}
							</a>
						))}
					</div>
				</div>
				<div className="space-y-2">
					{sectionLabel("Current Frame")}
					<p className="text-sm leading-7 text-brand-muted">
						{content.now.buildMode}
					</p>
				</div>
			</div>
		</div>
	</div>
);

export const renderResume = (content: PortfolioContent) => (
	<div data-testid="resume" className="max-w-3xl space-y-5">
		<div className="space-y-1 border-b border-brand-panelEdge/60 pb-4">
			<div className="text-lg font-semibold text-brand-foreground">
				{content.identity.name}
			</div>
			<div className="text-sm text-brand-accentSoft">{content.identity.role}</div>
			<div className="text-xs text-brand-muted">{content.identity.location}</div>
		</div>

		<div className="space-y-2">
			{sectionLabel("Highlights")}
			<div className="grid gap-1 text-sm leading-6 text-brand-foreground">
				{content.highlights.map((item) => (
					<div key={item} className="flex gap-2">
						<span className="shrink-0 select-none text-brand-muted">›</span>
						<span>{item}</span>
					</div>
				))}
			</div>
		</div>

		<div className="space-y-2">
			{sectionLabel("Experience")}
			<div className="space-y-1.5 text-sm">
				{content.experience.map((entry) => (
					<div
						key={`${entry.company}-${entry.period}`}
						className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3"
					>
						<span className="font-semibold text-brand-foreground">
							{entry.role} @ {entry.company}
						</span>
						<span className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">
							{entry.period}
						</span>
					</div>
				))}
			</div>
		</div>

		<div className="space-y-2">
			{sectionLabel("Projects")}
			<div className="space-y-1.5 text-sm">
				{content.projects.map((project) => (
					<div
						key={project.id}
						className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3"
					>
						<span className="font-semibold text-brand-foreground">
							{project.name}
						</span>
						<span className="text-brand-muted">{project.outcome}</span>
					</div>
				))}
			</div>
		</div>

		<div className="space-y-1">
			{sectionLabel("Core Stack")}
			<div className="text-sm text-brand-foreground">
				{content.skills[0].items.join(" · ")}
			</div>
		</div>

		<div className="space-y-1 border-t border-brand-panelEdge/60 pt-4 text-sm">
			{sectionLabel("Contact")}
			<div className="text-brand-muted">{content.identity.email}</div>
		</div>

		<div className="text-xs text-brand-muted">
			Full detail: <span className={commandClassName}>about</span>
			{" · "}
			<span className={commandClassName}>experience</span>
			{" · "}
			<span className={commandClassName}>projects</span>
			{" · "}
			<span className={commandClassName}>skills</span>
		</div>
	</div>
);

export const renderNow = (content: PortfolioContent) => (
	<div data-testid="now" className="space-y-4">
		<div className="space-y-2">
			{sectionLabel("Now")}
			<p className="text-lg font-semibold leading-snug text-brand-foreground">
				{content.now.headline}
			</p>
			<p className="max-w-4xl text-sm leading-7 text-brand-muted">
				{content.now.summary}
			</p>
		</div>
		<div className={`space-y-2 ${cardClassName}`}>
			<div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accentSoft">
				Build Mode
			</div>
			<p className="text-sm leading-7 text-brand-foreground">
				{content.now.buildMode}
			</p>
		</div>
		<div className="grid gap-2 text-sm leading-7 text-brand-foreground">
			{content.now.bullets.map((item) => (
				<div key={item} className="flex gap-2">
					<span className="shrink-0 select-none text-brand-muted">›</span>
					<span>{item}</span>
				</div>
			))}
		</div>
	</div>
);

export const renderValues = (values: ValueEntry[]) => (
	<div data-testid="values" className="space-y-4">
		{values.map((value) => (
			<div key={value.title} className="space-y-1">
				<div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accentSoft">
					{value.title}
				</div>
				<div className="max-w-4xl text-sm leading-7 text-brand-foreground">
					{value.detail}
				</div>
			</div>
		))}
	</div>
);

export const renderStats = (content: PortfolioContent) => (
	<div data-testid="stats" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
		{content.stats.map((stat) => (
			<div key={`${stat.value}-${stat.label}`} className={`space-y-2 ${cardClassName}`}>
				<div className="text-2xl font-semibold text-brand-foreground">
					{stat.value}
				</div>
				<div className="text-xs uppercase tracking-[0.2em] text-brand-foreground">
					{stat.label}
				</div>
				<div className="text-sm leading-6 text-brand-muted">{stat.detail}</div>
			</div>
		))}
	</div>
);

export const renderSkills = (content: PortfolioContent) => (
	<div data-testid="skills" className="space-y-4">
		{content.skills.map((group) => (
			<div key={group.category} className="space-y-1">
				<div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accentSoft">
					{group.category}
				</div>
				<div className="text-sm leading-7 text-brand-foreground">
					{group.items.join(" · ")}
				</div>
			</div>
		))}
	</div>
);
