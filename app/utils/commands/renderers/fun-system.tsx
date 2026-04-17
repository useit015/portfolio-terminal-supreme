import { PortfolioContent } from "../../../types";
import { getPublicCommandCount } from "../registry";

const NEOFETCH_SWATCHES = [
	"var(--bg-color)",
	"var(--panel-color)",
	"var(--fg-color)",
	"var(--accent-color)",
	"var(--accent-soft)",
	"var(--muted-color)",
	"var(--chrome-close)",
	"var(--chrome-minimize)",
	"var(--chrome-maximize)",
];

export const renderNeofetch = (content: PortfolioContent) => {
	const publicCount = getPublicCommandCount();
	const title = `${content.identity.username}@${content.identity.hostname}`;
	const info: Array<{ key: string | null; value: string; header?: boolean }> = [
		{ key: null, value: title, header: true },
		{ key: null, value: "─".repeat(title.length) },
		{ key: "OS", value: `Portfolio OS ${content.welcome.version} x86_64` },
		{ key: "Host", value: "Next.js 15 App Router" },
		{ key: "Shell", value: `/bin/portfolio ${content.welcome.version}` },
		{ key: "Uptime", value: "this session" },
		{ key: "Commands", value: `${publicCount} public — explore for more` },
		{ key: "Stack", value: "TypeScript · React · Node.js · PostgreSQL" },
		{ key: "Theme", value: `${content.defaultTheme} (try \`themes set <name>\`)` },
		{ key: null, value: "" },
		{ key: "Contact", value: content.identity.email },
		{ key: "GitHub", value: "github.com/useit015" },
	];

	return (
		<div
			data-testid="neofetch-output"
			className="space-y-4 sm:flex sm:gap-8 sm:space-y-0"
		>
			<pre className="hidden shrink-0 text-[0.55rem] leading-[0.9rem] text-brand-accent sm:block">
				{content.welcome.avatarAscii.join("\n")}
			</pre>
			<div className="space-y-0.5 self-start text-sm">
				{info.map((line, index) => (
					<div key={index} className="flex gap-2">
						{line.key ? (
							<span className="w-16 shrink-0 font-semibold text-brand-accent">
								{line.key}
							</span>
						) : null}
						<span
							className={
								line.header
									? "font-semibold text-brand-foreground"
									: line.key
										? "text-brand-foreground"
										: "text-brand-muted"
							}
						>
							{line.value}
						</span>
					</div>
				))}
				<div className="mt-3 flex gap-1">
					{NEOFETCH_SWATCHES.map((color) => (
						<span
							key={color}
							className="h-4 w-4 border border-brand-panelEdge/40"
							style={{ backgroundColor: color }}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export const renderUname = (content: PortfolioContent, args: string[]) => {
	const full = args.includes("-a") || args.includes("--all");
	return (
		<div data-testid="uname-output" className="text-sm text-brand-foreground">
			{full
				? `Portfolio ${content.identity.hostname} ${content.welcome.version} TypeScript/React/Node.js ${content.identity.homePath}`
				: "Portfolio"}
		</div>
	);
};

export const renderMatrix = () => (
	<div data-testid="matrix-output" className="space-y-1.5 text-sm">
		<div className="font-semibold text-brand-accent">Wake up, Neo...</div>
		<div className="text-brand-muted">The Matrix has you.</div>
		<div className="text-brand-muted">Follow the white rabbit.</div>
		<div className="text-brand-muted">──────────────────────────────</div>
		<div className="text-brand-foreground">
			(This is a terminal portfolio, not a simulation.)
		</div>
		<div className="text-brand-foreground">(Or is it?)</div>
	</div>
);

export const renderCoffee = () => (
	<div data-testid="coffee-output" className="space-y-2 text-sm">
		<pre className="leading-[1.2rem] text-brand-accent">{`    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'`}</pre>
		<div className="text-brand-muted">Brewing... ████████████ 100%</div>
		<div className="text-brand-foreground">
			Done. (Now try <span className="font-semibold text-brand-accent">email</span>{" "}
			while it&apos;s warm.)
		</div>
	</div>
);

const FORTUNES: Array<{ quote: string; author: string | null }> = [
	{
		quote: "Make it work, make it right, make it fast. In that order.",
		author: "Kent Beck",
	},
	{ quote: "Shipping is a feature.", author: "Joel Spolsky" },
	{
		quote: "Simplicity is a prerequisite for reliability.",
		author: "Dijkstra",
	},
	{
		quote:
			"The most dangerous thought you can have as a creative person is to think you know what you're doing.",
		author: "Bret Victor",
	},
	{
		quote:
			"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		author: "Martin Fowler",
	},
	{
		quote:
			"Debugging is twice as hard as writing the code in the first place. Therefore, if you write code as cleverly as possible, you are by definition not smart enough to debug it.",
		author: "Kernighan's Law",
	},
	{
		quote:
			"Programs must be written for people to read, and only incidentally for machines to execute.",
		author: "Harold Abelson",
	},
	{
		quote:
			"A language that doesn't affect the way you think about programming is not worth knowing.",
		author: "Alan Perlis",
	},
	{
		quote: "The art of programming is the art of organizing complexity.",
		author: "Dijkstra",
	},
	{
		quote: "Premature optimization is the root of all evil.",
		author: "Donald Knuth",
	},
	{
		quote:
			"The best performance improvement is the transition from the nonworking state to the working state.",
		author: "John Ousterhout",
	},
	{
		quote:
			"9 years in and still building things because you want to. That's the real metric.",
		author: null,
	},
	{
		quote:
			"The rescue engineer doesn't get the glory. They get the working software.",
		author: null,
	},
	{
		quote: "Working code beats a clean architecture document every time.",
		author: null,
	},
	{
		quote:
			"Every great developer you know got there by solving problems they were unqualified to solve until they did it.",
		author: "Patrick McKenzie",
	},
];

export const renderFortune = () => {
	const index = Math.floor(Date.now() / 86400000) % FORTUNES.length;
	const fortune = FORTUNES[index];
	return (
		<div data-testid="fortune-output" className="max-w-2xl space-y-2">
			<div className="text-sm leading-7 text-brand-foreground">
				&ldquo;{fortune.quote}&rdquo;
			</div>
			{fortune.author ? (
				<div className="text-xs text-brand-muted">— {fortune.author}</div>
			) : null}
		</div>
	);
};
