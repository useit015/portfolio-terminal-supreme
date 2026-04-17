import { CommandDescriptor, PortfolioContent, ShellState } from "../../types";
import { getPathSuggestions } from "./filesystem";
import { COMMAND_REGISTRY, getCommandSpec } from "./registry";

const isAutocompleteVisible = (
	command: CommandDescriptor,
	prefixLength: number,
) => {
	if (command.visibility === "hidden") {
		return false;
	}

	if (command.visibility === "hinted") {
		return prefixLength >= 2;
	}

	return true;
};

export const getAutocomplete = (
	input: string,
	content: PortfolioContent,
	shellState: ShellState,
): { nextInput?: string; hints: string[] } => {
	const lowerInput = input.toLowerCase();
	const trimmed = lowerInput.trimStart();

	if (trimmed === "") {
		return { hints: [] };
	}

	const parts = trimmed.split(/\s+/);
	const commandToken = parts[0];
	const commandPrefixLength = commandToken.length;

	if (!trimmed.includes(" ")) {
		const commandMatches = COMMAND_REGISTRY.filter(
			(command) =>
				command.name.startsWith(commandToken) &&
				isAutocompleteVisible(command, commandPrefixLength),
		).map((command) => command.name);

		if (commandMatches.length === 1) {
			return { nextInput: commandMatches[0], hints: [] };
		}

		return { hints: commandMatches };
	}

	const command = getCommandSpec(commandToken)?.name;
	if (!command) {
		return { hints: [] };
	}

	if (command === "themes") {
		if (trimmed === "themes" || trimmed === "themes ") {
			return { nextInput: "themes set ", hints: [] };
		}

		if (
			"set".startsWith(parts[1] ?? "") &&
			parts.length === 2 &&
			!lowerInput.endsWith(" ")
		) {
			return { nextInput: "themes set ", hints: [] };
		}

		if (parts[1] === "set") {
			const partial = lowerInput.endsWith(" ") ? "" : (parts[2] ?? "");
			const themeNames = content.themePresets
				.map((theme) => theme.name)
				.filter((theme) => theme.startsWith(partial));

			if (themeNames.length === 1) {
				return { nextInput: `themes set ${themeNames[0]}`, hints: [] };
			}

			return { hints: themeNames };
		}
	}

	if (command === "projects" || command === "socials") {
		if (trimmed === `${command}` || trimmed === `${command} `) {
			return { nextInput: `${command} go `, hints: [] };
		}

		if (
			"go".startsWith(parts[1] ?? "") &&
			parts.length === 2 &&
			!lowerInput.endsWith(" ")
		) {
			return { nextInput: `${command} go `, hints: [] };
		}

		if (parts[1] === "go") {
			const partial = lowerInput.endsWith(" ") ? "" : (parts[2] ?? "");
			const indexedItems = command === "projects" ? content.projects : content.socials;
			const hints = indexedItems
				.filter((item) => item.id.toString().startsWith(partial))
				.map((item) => `${item.id}.${"name" in item ? item.name : item.label}`);

			if (hints.length === 1) {
				return {
					nextInput: `${command} go ${hints[0].split(".")[0]}`,
					hints: [],
				};
			}

			return { hints };
		}
	}

	if (command === "sudo") {
		if ("hire-me".startsWith(parts[1] ?? "")) {
			return { nextInput: "sudo hire-me", hints: [] };
		}
	}

	if (command === "man") {
		const partial = lowerInput.endsWith(" ") ? "" : (parts[1] ?? "");
		const hints = COMMAND_REGISTRY.filter(
			(entry) =>
				entry.name.startsWith(partial) &&
				isAutocompleteVisible(entry, partial.length),
		).map((entry) => entry.name);

		if (hints.length === 1) {
			return { nextInput: `man ${hints[0]}`, hints: [] };
		}

		return { hints };
	}

	if (command === "cd" || command === "cat" || command === "ls") {
		const partial = lowerInput.endsWith(" ") ? "" : (parts[1] ?? "");
		const hints = getPathSuggestions(
			content,
			shellState.currentPath,
			partial,
			command !== "cat",
		);

		if (hints.length === 1) {
			return { nextInput: `${command} ${hints[0]}`, hints: [] };
		}

		return { hints };
	}

	return { hints: [] };
};
