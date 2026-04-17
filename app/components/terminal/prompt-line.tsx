import { PortfolioContent } from "../../types";

interface PromptLineProps {
	identity: PortfolioContent["identity"];
	path: string;
	command?: string;
}

export const PromptLine = ({ identity, path, command }: PromptLineProps) => (
	<div className="flex flex-wrap items-center gap-1 text-sm md:text-base">
		<span className="font-semibold text-[var(--prompt-user)]">
			{identity.username}
		</span>
		<span className="text-brand-muted">@</span>
		<span className="font-semibold text-[var(--prompt-host)]">
			{identity.hostname}
		</span>
		<span className="text-brand-muted">:</span>
		<span className="text-brand-muted">{path}</span>
		<span className="text-brand-muted">$</span>
		{command ? (
			<span className="ml-1 break-all text-[var(--prompt-input)]">{command}</span>
		) : null}
	</div>
);
