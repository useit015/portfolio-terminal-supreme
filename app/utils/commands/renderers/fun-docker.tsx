const DOCKER_CONTAINERS = [
	{
		id: "a3f9b2c1",
		image: "oussama/portfolio:1.0",
		created: "just now",
		status: "Up always",
		ports: "0.0.0.0:80->80",
		name: "portfolio",
	},
	{
		id: "b7e3f1a2",
		image: "oussama/curiosity:∞",
		created: "9 years ago",
		status: "Up",
		ports: "—",
		name: "exploration",
	},
	{
		id: "c2d4f6a8",
		image: "useit015/whichmodel:1.0",
		created: "6 months ago",
		status: "Up stable",
		ports: "—",
		name: "whichmodel",
	},
];

export const renderDocker = (args: string[]) => {
	const sub = args[0];

	if (sub === "ps") {
		return (
			<div data-testid="docker-output" className="overflow-x-auto text-xs">
				<div className="mb-1.5 grid grid-cols-[5rem_1fr_1fr_1fr_1fr_5rem] gap-3 font-semibold uppercase tracking-[0.12em] text-brand-accentSoft">
					<span>CONTAINER</span>
					<span>IMAGE</span>
					<span>CREATED</span>
					<span>STATUS</span>
					<span>PORTS</span>
					<span>NAME</span>
				</div>
				{DOCKER_CONTAINERS.map((container) => (
					<div
						key={container.id}
						className="grid grid-cols-[5rem_1fr_1fr_1fr_1fr_5rem] gap-3 text-brand-muted"
					>
						<span className="font-semibold text-brand-foreground">
							{container.id}
						</span>
						<span>{container.image}</span>
						<span>{container.created}</span>
						<span className="text-brand-accent">{container.status}</span>
						<span>{container.ports}</span>
						<span className="font-semibold text-brand-foreground">
							{container.name}
						</span>
					</div>
				))}
			</div>
		);
	}

	if (sub === "run") {
		return (
			<div data-testid="docker-output" className="text-sm text-brand-muted">
				docker run: this isn&apos;t that kind of portfolio. Try{" "}
				<span className="font-semibold text-brand-accent">docker ps</span> to see
				what&apos;s running.
			</div>
		);
	}

	if (sub === "build") {
		return (
			<div data-testid="docker-output" className="space-y-0.5 text-sm">
				<div className="text-brand-muted">Step 1/1 : FROM oussama/curiosity:∞</div>
				<div className="text-brand-muted"> ---&gt; Already up to date.</div>
				<div className="text-brand-accent">Successfully built a7f3c91</div>
				<div className="text-brand-foreground">
					Deployed. You&apos;re looking at it.
				</div>
			</div>
		);
	}

	if (sub === "images") {
		return (
			<div data-testid="docker-output" className="space-y-1 text-xs">
				<div className="mb-1 font-semibold uppercase tracking-[0.12em] text-brand-accentSoft">
					REPOSITORY · TAG · SIZE
				</div>
				{DOCKER_CONTAINERS.map((container) => (
					<div key={container.id} className="flex gap-4 text-brand-muted">
						<span className="text-brand-foreground">
							{container.image.split(":")[0]}
						</span>
						<span>{container.image.split(":")[1]}</span>
						<span>{container.id}</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div data-testid="docker-output" className="text-sm text-brand-muted">
			docker: try{" "}
			<span className="font-semibold text-brand-accent">docker ps</span> ·{" "}
			<span className="font-semibold text-brand-accent">docker images</span> ·{" "}
			<span className="font-semibold text-brand-accent">docker build</span>
		</div>
	);
};
