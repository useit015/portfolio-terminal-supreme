const NPM_PACKAGES = [
	{ name: "typescript", version: "5.0.0" },
	{ name: "react", version: "19.0.0" },
	{ name: "next", version: "15.0.0" },
	{ name: "tailwindcss", version: "4.0.0" },
	{ name: "vitest", version: "4.0.0" },
	{ name: "curiosity", version: "∞.0.0" },
];

export const renderNpm = (args: string[]) => {
	const sub = args[0];
	const script = args[1];

	if (sub === "install" || sub === "i" || sub === "ci") {
		return (
			<div data-testid="npm-output" className="space-y-1 text-sm">
				<div className="text-brand-muted">
					npm warn deprecated regret@1.0.0 — switch to{" "}
					<span className="text-brand-foreground">ship-it</span>
				</div>
				<div className="text-brand-muted">
					npm warn deprecated waiting@9.0.0 — use{" "}
					<span className="text-brand-foreground">execute</span> instead
				</div>
				<div className="mt-1.5 space-y-0.5">
					{NPM_PACKAGES.map((pkg) => (
						<div key={pkg.name}>
							<span className="text-brand-accent">+</span>{" "}
							<span className="font-semibold text-brand-foreground">
								{pkg.name}
							</span>
							<span className="text-brand-muted">@{pkg.version}</span>
						</div>
					))}
				</div>
				<div className="mt-1.5 text-brand-foreground">
					added {NPM_PACKAGES.length} packages in portfolio time
				</div>
			</div>
		);
	}

	if (sub === "run") {
		if (script === "dev") {
			return (
				<div data-testid="npm-output" className="text-sm text-brand-foreground">
					▲ Next.js — already running. You&apos;re looking at it.
				</div>
			);
		}
		if (script === "build") {
			return (
				<div data-testid="npm-output" className="space-y-0.5 text-sm">
					<div className="text-brand-muted">▲ Next.js 15.0.0</div>
					<div className="text-brand-muted">
						Creating an optimized production build ...
					</div>
					<div className="text-brand-accent">✓ Compiled successfully.</div>
					<div className="text-brand-foreground">
						Built and deployed. You&apos;re looking at it.
					</div>
				</div>
			);
		}
		if (script === "test") {
			return (
				<div data-testid="npm-output" className="text-sm text-brand-muted">
					Try <span className="font-semibold text-brand-accent">vitest run</span>{" "}
					— or just trust the 16 passing tests.
				</div>
			);
		}
	}

	if (sub === "audit") {
		return (
			<div data-testid="npm-output" className="space-y-0.5 text-sm">
				<div className="text-brand-foreground">found 0 vulnerabilities</div>
				<div className="text-brand-muted">(curiosity is not a known CVE)</div>
			</div>
		);
	}

	return (
		<div data-testid="npm-output" className="text-sm text-brand-muted">
			npm: try <span className="font-semibold text-brand-accent">npm install</span>{" "}
			· <span className="font-semibold text-brand-accent">npm run dev</span> ·{" "}
			<span className="font-semibold text-brand-accent">npm run build</span>
		</div>
	);
};
