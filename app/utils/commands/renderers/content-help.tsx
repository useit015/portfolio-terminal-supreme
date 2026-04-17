import { CommandCategory, CommandDescriptor, PortfolioContent } from "../../../types";
import { CATEGORY_LABELS } from "../constants";
import { getPublicCommands } from "../registry";
import { sectionLabel } from "./common";

export const renderHelp = (content: PortfolioContent) => {
	const groups = getPublicCommands().reduce<Record<CommandCategory, CommandDescriptor[]>>(
		(accumulator, command) => {
			accumulator[command.category] ??= [];
			accumulator[command.category].push(command);
			return accumulator;
		},
		{
			navigation: [],
			profile: [],
			work: [],
			shell: [],
			play: [],
		},
	);

	return (
		<div data-testid="help" className="space-y-5">
			{(["navigation", "profile", "work", "shell"] as CommandCategory[]).map(
				(category) =>
					groups[category].length > 0 ? (
						<div key={category} className="space-y-2">
							{sectionLabel(CATEGORY_LABELS[category])}
							<div className="grid gap-1 text-sm sm:grid-cols-[minmax(0,13rem)_1fr]">
								{groups[category].map((command) => (
									<div key={command.name} className="contents">
										<div className="font-semibold text-brand-foreground">
											{command.name}
										</div>
										<div className="text-brand-foreground">
											{command.description}
										</div>
									</div>
								))}
							</div>
						</div>
					) : null,
			)}
			<div className="grid gap-1 text-sm sm:grid-cols-[minmax(0,5rem)_1fr]">
				{[
					{ glyph: "⇥", desc: "autocomplete command, path, or subcommand" },
					{ glyph: "↑↓", desc: "move through command history without losing draft" },
					{ glyph: "⌃L", desc: "clear terminal output" },
					{ glyph: "⎋ / ⌃C", desc: "clear the current line" },
				].map(({ glyph, desc }) => (
					<div key={glyph} className="contents">
						<div className="font-semibold text-brand-accentSoft">{glyph}</div>
						<div className="text-brand-muted">{desc}</div>
					</div>
				))}
				<div className="col-span-full mt-1 text-brand-muted">
					{content.easterEggs.hints[1]}
				</div>
			</div>
		</div>
	);
};
