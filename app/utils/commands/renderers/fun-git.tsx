const GIT_LOG_ENTRIES = [
	{
		hash: "a7f3c91",
		refs: "HEAD -> main",
		message: "feat: add delight layer to terminal portfolio",
	},
	{
		hash: "b2e1d40",
		refs: "",
		message: "feat: ship Acurai chat, wiki, and brain builder",
	},
	{
		hash: "3e8f2c4",
		refs: "",
		message:
			"feat: co-found LendStack, lead 9-person team to live pilots in Zambia",
	},
	{
		hash: "1a9b3c7",
		refs: "",
		message: "fix: rescue Blue River vanilla JS codebase mid-sprint",
	},
	{
		hash: "6f2a8bd",
		refs: "",
		message: "feat: ship Axion Ray data-ops configuration portal",
	},
	{
		hash: "8c1d4e7",
		refs: "",
		message: "feat: build What's Next Media connected-economy data visuals",
	},
	{
		hash: "9d2e5a1",
		refs: "",
		message: "feat: solo-build Radiometer, help close six-figure enterprise deal",
	},
	{
		hash: "c4f1b8e",
		refs: "",
		message:
			"feat: deliver 8 Toptal engagements across healthcare, AI, and media",
	},
	{
		hash: "5f6a7d8",
		refs: "",
		message: "feat: build Peer signaling server for real-time chat and video",
	},
	{
		hash: "2c8d4a1",
		refs: "",
		message: "feat: ship Nespresso checkout work at SQLI Digital Experience",
	},
	{
		hash: "4e9b0f2",
		refs: "",
		message: "init: freelance client work across websites, storefronts, and tools",
	},
	{
		hash: "7b3d9a2",
		refs: "",
		message: "feat: graduate 1337 / 42 — C, Unix, systems, peer review",
	},
	{
		hash: "0a1b2c3",
		refs: "origin/curiosity",
		message: "init: start learning C because the internet said it was hard",
	},
];

export const renderGit = (args: string[]) => {
	const sub = args[0];
	const flags = args.slice(1);

	if (!sub) {
		return (
			<div data-testid="git-output" className="space-y-1 text-sm">
				<div className="text-brand-foreground">
					usage: git [--version] [--help] &lt;command&gt; [&lt;args&gt;]
				</div>
				<div className="mt-2 text-brand-muted">
					Try:{" "}
					{[
						"git log",
						"git log --oneline",
						"git status",
						"git blame",
						"git diff",
						"git push",
					].map((cmd, index, all) => (
						<span key={cmd}>
							<span className="font-semibold text-brand-accent">{cmd}</span>
							{index < all.length - 1 ? (
								<span className="text-brand-muted"> · </span>
							) : null}
						</span>
					))}
				</div>
			</div>
		);
	}

	if (sub === "log") {
		const oneline = flags.includes("--oneline");
		return (
			<div data-testid="git-output" className="space-y-2 text-sm">
				{GIT_LOG_ENTRIES.map((entry) =>
					oneline ? (
						<div key={entry.hash} className="flex flex-wrap gap-2">
							<span className="shrink-0 font-semibold text-brand-accentSoft">
								{entry.hash}
							</span>
							{entry.refs ? (
								<span className="text-brand-accent">({entry.refs})</span>
							) : null}
							<span className="text-brand-foreground">{entry.message}</span>
						</div>
					) : (
						<div
							key={entry.hash}
							className="space-y-0.5 border-b border-brand-panelEdge/40 pb-2 last:border-0 last:pb-0"
						>
							<div className="text-brand-accentSoft">
								commit {entry.hash}
								{entry.refs ? (
									<span className="ml-2 text-brand-accent">({entry.refs})</span>
								) : null}
							</div>
							<div className="text-brand-muted">
								Author: Oussama Nahiz &lt;useit015@gmail.com&gt;
							</div>
							<div className="mt-1 text-brand-foreground">{entry.message}</div>
						</div>
					),
				)}
			</div>
		);
	}

	if (sub === "status") {
		return (
			<div data-testid="git-output" className="space-y-1 text-sm">
				<div className="text-brand-foreground">On branch main</div>
				<div className="text-brand-foreground">
					Your branch is up to date with &apos;origin/main&apos;.
				</div>
				<div className="mt-2 font-semibold text-brand-accent">
					nothing to commit, portfolio is clean
				</div>
			</div>
		);
	}

	if (sub === "diff") {
		return (
			<div data-testid="git-output" className="text-sm text-brand-muted">
				(no diff — everything shipped)
			</div>
		);
	}

	if (sub === "blame") {
		return (
			<div data-testid="git-output" className="space-y-0.5 text-sm">
				<div className="flex gap-3">
					<span className="shrink-0 text-brand-accentSoft">a7f3c91</span>
					<span className="text-brand-muted">(Oussama Nahiz)</span>
					<span className="text-brand-foreground">all of it</span>
				</div>
				<div className="flex gap-3">
					<span className="shrink-0 text-brand-accentSoft">c4f1b8e</span>
					<span className="text-brand-muted">(42 / 1337)</span>
					<span className="text-brand-foreground">the low-level foundations</span>
				</div>
				<div className="flex gap-3">
					<span className="shrink-0 text-brand-accentSoft">0a1b2c3</span>
					<span className="text-brand-muted">(curiosity)</span>
					<span className="text-brand-foreground">
						the initial commit, 9 years ago
					</span>
				</div>
			</div>
		);
	}

	if (sub === "init") {
		return (
			<div data-testid="git-output" className="text-sm text-brand-muted">
				Reinitialized existing Git repository in /home/oussama/portfolio
			</div>
		);
	}

	if (sub === "commit") {
		return (
			<div data-testid="git-output" className="text-sm text-brand-muted">
				nothing to commit, working tree clean
			</div>
		);
	}

	if (sub === "push") {
		return (
			<div data-testid="git-output" className="space-y-0.5 text-sm">
				<div className="text-brand-muted">Enumerating objects: 1, done.</div>
				<div className="text-brand-muted">
					Writing objects: 100% (1/1), done.
				</div>
				<div className="mt-1 text-brand-foreground">
					To github.com:useit015/me-portfolio-term.git
				</div>
				<div className="text-brand-accent">a7f3c91..main  main → main</div>
			</div>
		);
	}

	if (sub === "clone") {
		return (
			<div data-testid="git-output" className="space-y-0.5 text-sm">
				<div className="text-brand-muted">Cloning into &apos;portfolio&apos;...</div>
				<div className="text-brand-muted">
					remote: Enumerating objects: 42, done.
				</div>
				<div className="text-brand-accent">
					Already up to date. You&apos;re already here.
				</div>
			</div>
		);
	}

	return (
		<div data-testid="git-output" className="text-sm text-brand-muted">
			git: &apos;{args.join(" ")}&apos; is not a git command here. Try:{" "}
			<span className="font-semibold text-brand-accent">git log</span> ·{" "}
			<span className="font-semibold text-brand-accent">git status</span>
		</div>
	);
};
