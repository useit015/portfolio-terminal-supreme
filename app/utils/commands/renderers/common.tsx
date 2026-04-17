export const commandClassName = "font-semibold text-brand-accent";
export const linkClassName =
	"w-fit text-brand-accent underline decoration-dotted underline-offset-4 transition-colors hover:bg-brand-accent hover:text-brand-background focus:bg-brand-accent focus:text-brand-background focus:outline-none";
export const cardClassName =
	"border border-brand-panelEdge/80 bg-brand-panelInset/80 p-4";
export const entryClassName =
	"border-b border-brand-panelEdge/70 pb-4 last:border-b-0 last:pb-0";

export const sectionLabel = (label: string) => (
	<div className="mb-2 flex items-center gap-2 text-sm text-brand-accent">
		<span aria-hidden className="select-none">
			──
		</span>
		<span className="font-semibold lowercase">{label}</span>
	</div>
);

export const usageOutput = (command: string, usage: string) => (
	<div data-testid={`${command}-invalid-arg`} className="text-sm text-brand-muted">
		<span data-testid="usage-output">Usage: {usage}</span>
	</div>
);

export const errorOutput = (message: string) => (
	<div data-testid="shell-error" className="text-sm text-brand-foreground">
		<span className="text-[var(--chrome-close)]">shell:</span> {message}
	</div>
);

export const renderGeneralOutput = (value: string, testId: string) => (
	<div data-testid={testId} className="text-sm text-brand-foreground">
		{value}
	</div>
);

export const renderEmptyAction = (testId: string) => <span data-testid={testId} />;

export const renderEasterEggBlock = (
	testId: string,
	block: { title: string; lines: string[] },
) => (
	<div data-testid={testId} className="space-y-3">
		<div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accentSoft">
			{block.title}
		</div>
		<div className="grid gap-2 text-sm leading-7 text-brand-foreground">
			{block.lines.map((line) => (
				<div key={line}>{line}</div>
			))}
		</div>
	</div>
);

export const renderHistory = (history: string[]) => (
	<div data-testid="history" className="space-y-0.5 text-sm">
		{history.length === 0 ? (
			<div className="text-brand-muted">No commands in session history.</div>
		) : (
			history.map((command, index) => (
				<div key={`${command}-${index}`} className="flex gap-3">
					<span className="w-6 shrink-0 select-none text-right text-brand-muted">
						{index + 1}
					</span>
					<span className="text-brand-foreground">{command}</span>
				</div>
			))
		)}
	</div>
);

export const renderEcho = (raw: string) => {
	const echoInput = raw.trim().slice(4).trim();
	const cleaned = echoInput.replace(/^(['"`])(.*)\1$/, "$2");

	return (
		<div data-testid="echo-output" className="text-sm text-brand-foreground">
			{cleaned}
		</div>
	);
};
