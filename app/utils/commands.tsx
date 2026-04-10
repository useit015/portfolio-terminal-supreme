import { ReactNode } from "react";
import {
	CommandCategory,
	CommandDescriptor,
	CommandRenderContext,
	CommandVisibility,
	ParsedCommand,
	PortfolioContent,
	PortfolioProject,
	ShellState,
	ValueEntry,
	VirtualFsNode,
} from "../types";
import { getThemeByName } from "./theme";

const commandClassName = "font-semibold text-brand-accent";
const linkClassName =
	"w-fit text-brand-accent underline decoration-dotted underline-offset-4 transition-colors hover:bg-brand-accent hover:text-brand-background focus:bg-brand-accent focus:text-brand-background focus:outline-none";

// Shared card/entry containers — use these consistently across all render functions
const cardClassName =
	"border border-brand-panelEdge/80 bg-brand-panelInset/80 p-4";
const entryClassName =
	"border-b border-brand-panelEdge/70 pb-4 last:border-b-0 last:pb-0";

const CATEGORY_LABELS: Record<CommandCategory, string> = {
	profile: "Profile",
	work: "Work",
	shell: "Shell",
	navigation: "Navigation",
	play: "Side Quests",
};

const ROOT_PATH = "/";

export const COMMAND_REGISTRY: CommandDescriptor[] = [
	{
		name: "welcome",
		description: "display the welcome section",
		category: "profile",
		visibility: "public",
		usage: "welcome",
		examples: ["welcome"],
	},
	{
		name: "help",
		description: "show public commands",
		category: "navigation",
		visibility: "public",
		usage: "help",
		examples: ["help"],
	},
	{
		name: "ls",
		description: "list files in the virtual portfolio shell",
		category: "navigation",
		visibility: "public",
		usage: "ls [path]",
		examples: ["ls", "ls projects"],
		aliases: ["dir"],
	},
	{
		name: "cd",
		description: "change virtual directory",
		category: "navigation",
		visibility: "public",
		usage: "cd <path>",
		examples: ["cd projects", "cd ..", "cd ~"],
	},
	{
		name: "cat",
		description: "print a file or section",
		category: "navigation",
		visibility: "public",
		usage: "cat <topic>",
		examples: ["cat about", "cat projects/whichmodel"],
	},
	{
		name: "tree",
		description: "show the public directory tree",
		category: "navigation",
		visibility: "public",
		usage: "tree",
		examples: ["tree"],
	},
	{
		name: "grep",
		description: "search across the portfolio content",
		category: "navigation",
		visibility: "public",
		usage: "grep <term>",
		examples: ["grep react", "grep zambia"],
	},
	{
		name: "man",
		description: "show command details and examples",
		category: "navigation",
		visibility: "public",
		usage: "man <command>",
		examples: ["man cd", "man grep"],
	},
	{
		name: "about",
		description: "overview of Oussama Nahiz",
		category: "profile",
		visibility: "public",
		usage: "about",
		examples: ["about", "cat about"],
		aliases: ["bio"],
	},
	{
		name: "now",
		description: "current focus and role target",
		category: "profile",
		visibility: "public",
		usage: "now",
		examples: ["now", "cat now"],
	},
	{
		name: "values",
		description: "working principles",
		category: "profile",
		visibility: "public",
		usage: "values",
		examples: ["values", "cat values"],
	},
	{
		name: "stats",
		description: "hard-number career anchors",
		category: "profile",
		visibility: "public",
		usage: "stats",
		examples: ["stats", "cat stats"],
	},
	{
		name: "skills",
		description: "stack map and technical breadth",
		category: "profile",
		visibility: "public",
		usage: "skills",
		examples: ["skills", "cat skills"],
		aliases: ["stack"],
	},
	{
		name: "education",
		description: "education history",
		category: "profile",
		visibility: "public",
		usage: "education",
		examples: ["education", "cat education"],
	},
	{
		name: "socials",
		description: "public profiles and contact routes",
		category: "profile",
		visibility: "public",
		usage: "socials [go <id>]",
		examples: ["socials", "socials go 1"],
		aliases: ["contact"],
	},
	{
		name: "experience",
		description: "full work history",
		category: "work",
		visibility: "public",
		usage: "experience",
		examples: ["experience", "cat experience"],
		aliases: ["exp"],
	},
	{
		name: "projects",
		description: "browse selected shipped projects",
		category: "work",
		visibility: "public",
		usage: "projects [go <id>]",
		examples: ["projects", "projects go 2"],
	},
	{
		name: "lab",
		description: "side projects and curiosity",
		category: "work",
		visibility: "public",
		usage: "lab",
		examples: ["lab", "cat lab/overview"],
		aliases: ["play"],
	},
	{
		name: "themes",
		description: "list or switch themes",
		category: "shell",
		visibility: "public",
		usage: "themes [set <name>]",
		examples: ["themes", "themes set espresso"],
	},
	{
		name: "history",
		description: "show command history",
		category: "shell",
		visibility: "public",
		usage: "history",
		examples: ["history"],
	},
	{
		name: "pwd",
		description: "print current virtual working directory",
		category: "shell",
		visibility: "public",
		usage: "pwd",
		examples: ["pwd"],
	},
	{
		name: "whoami",
		description: "show current user",
		category: "shell",
		visibility: "public",
		usage: "whoami",
		examples: ["whoami"],
	},
	{
		name: "echo",
		description: "print whatever you pass in",
		category: "shell",
		visibility: "public",
		usage: "echo <text>",
		examples: ["echo hello world"],
	},
	{
		name: "email",
		description: "open an email draft",
		category: "shell",
		visibility: "public",
		usage: "email",
		examples: ["email"],
	},
	{
		name: "gui",
		description: "open an external profile",
		category: "shell",
		visibility: "public",
		usage: "gui",
		examples: ["gui"],
	},
	{
		name: "clear",
		description: "clear terminal output",
		category: "shell",
		visibility: "public",
		usage: "clear",
		examples: ["clear"],
	},
	{
		name: "resume",
		description: "condensed one-page overview — fast path for recruiters",
		category: "profile",
		visibility: "public",
		usage: "resume",
		examples: ["resume", "cv"],
		aliases: ["cv"],
	},
	{
		name: "42",
		description: "why the 42 / 1337 thread matters",
		category: "play",
		visibility: "hinted",
		usage: "42",
		examples: ["42"],
	},
	{
		name: "morocco",
		description: "the Casablanca / Mohammedia / Khouribga thread",
		category: "play",
		visibility: "hinted",
		usage: "morocco",
		examples: ["morocco"],
	},
	{
		name: "sudo",
		description: "playful recruiter call to action",
		category: "play",
		visibility: "hinted",
		usage: "sudo hire-me",
		examples: ["sudo hire-me"],
	},
	{
		name: "souk",
		description: "game-dev detour",
		category: "play",
		visibility: "hidden",
		usage: "souk",
		examples: ["souk"],
	},
	{
		name: "rescue",
		description: "broken-codebase mode",
		category: "play",
		visibility: "hidden",
		usage: "rescue",
		examples: ["rescue"],
	},
];

const COMMAND_MAP = new Map<string, CommandDescriptor>();
for (const spec of COMMAND_REGISTRY) {
	COMMAND_MAP.set(spec.name, spec);
	for (const alias of spec.aliases ?? []) {
		COMMAND_MAP.set(alias, spec);
	}
}

const sectionLabel = (label: string) => (
	<div className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-brand-muted">
		{label}
	</div>
);

const usageOutput = (command: string, usage: string) => (
	<div
		data-testid={`${command}-invalid-arg`}
		className="text-sm text-brand-muted"
	>
		<span data-testid="usage-output">Usage: {usage}</span>
	</div>
);

const errorOutput = (message: string) => (
	<div data-testid="shell-error" className="text-sm text-brand-foreground">
		<span className="text-[var(--chrome-close)]">shell:</span> {message}
	</div>
);

const getNodePath = (node: VirtualFsNode) =>
	normalizePath(`${node.path === ROOT_PATH ? "" : node.path}/${node.name}`);

const getNodeVisibility = (node: VirtualFsNode): CommandVisibility =>
	node.visibility ?? "public";

const normalizePath = (value: string) => {
	const segments = value.split("/").filter(Boolean);
	const normalized: string[] = [];

	for (const segment of segments) {
		if (segment === "." || segment === "") {
			continue;
		}

		if (segment === "..") {
			normalized.pop();
			continue;
		}

		normalized.push(segment);
	}

	return normalized.length === 0 ? ROOT_PATH : `/${normalized.join("/")}`;
};

const resolvePathInput = (target: string, currentPath: string) => {
	if (target === "" || target === "~") {
		return ROOT_PATH;
	}

	if (target === "/") {
		return ROOT_PATH;
	}

	if (target.startsWith("~/")) {
		return normalizePath(target.slice(1));
	}

	if (target.startsWith("/")) {
		return normalizePath(target);
	}

	return normalizePath(
		`${currentPath === ROOT_PATH ? "" : currentPath}/${target}`,
	);
};

const getNodeAtPath = (content: PortfolioContent, path: string) =>
	content.filesystem.find((node) => getNodePath(node) === path);

const getChildren = (
	content: PortfolioContent,
	path: string,
	visibility: CommandVisibility | "public-only" = "public-only",
) =>
	content.filesystem
		.filter((node) => {
			if (node.path !== path) {
				return false;
			}

			if (visibility === "public-only") {
				return getNodeVisibility(node) === "public";
			}

			return getNodeVisibility(node) === visibility;
		})
		.sort((left, right) => {
			if (left.type !== right.type) {
				return left.type === "dir" ? -1 : 1;
			}

			return left.name.localeCompare(right.name);
		});

const getAutocompleteChildren = (
	content: PortfolioContent,
	path: string,
	partial: string,
) =>
	content.filesystem
		.filter((node) => {
			if (node.path !== path) {
				return false;
			}

			const visibility = getNodeVisibility(node);
			if (visibility === "hidden") {
				return false;
			}

			if (visibility === "hinted" && partial.length < 2) {
				return false;
			}

			return node.name.startsWith(partial);
		})
		.sort((left, right) => left.name.localeCompare(right.name));

const findUniqueNodeByName = (content: PortfolioContent, name: string) => {
	const matches = content.filesystem.filter((node) => node.name === name);
	return matches.length === 1 ? matches[0] : undefined;
};

export const formatPromptPath = (currentPath: string) =>
	currentPath === ROOT_PATH ? "~" : `~${currentPath}`;

export const formatAbsolutePath = (
	content: PortfolioContent,
	currentPath: string,
) =>
	`${content.identity.homePath}${currentPath === ROOT_PATH ? "" : currentPath}`;

export const getCommandSpec = (token: string) =>
	COMMAND_MAP.get(token.toLowerCase());

export const getPublicCommands = () =>
	COMMAND_REGISTRY.filter((command) => command.visibility === "public");

export const getPublicCommandCount = () => getPublicCommands().length;

const resolveFsTarget = (
	content: PortfolioContent,
	target: string,
	currentPath: string,
) => {
	const directPath = resolvePathInput(target, currentPath);

	if (directPath === ROOT_PATH) {
		return { path: ROOT_PATH, node: undefined };
	}

	const directNode = getNodeAtPath(content, directPath);
	if (directNode) {
		return { path: directPath, node: directNode };
	}

	if (
		!target.includes("/") &&
		target !== "." &&
		target !== ".." &&
		target !== "~"
	) {
		const fallbackNode = findUniqueNodeByName(content, target);
		if (fallbackNode) {
			return { path: getNodePath(fallbackNode), node: fallbackNode };
		}
	}

	return { error: `${target}: No such file or directory` };
};

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

const formatPathCompletion = (
	currentPath: string,
	partial: string,
	nodeName: string,
) => {
	if (partial === "") {
		return nodeName;
	}

	if (partial.includes("/")) {
		const lastSlashIndex = partial.lastIndexOf("/");
		const prefix = partial.slice(0, lastSlashIndex + 1);
		return `${prefix}${nodeName}`;
	}

	if (partial.startsWith("~/")) {
		const prefix = partial.slice(0, partial.lastIndexOf("/") + 1);
		return `${prefix}${nodeName}`;
	}

	if (partial.startsWith("/")) {
		const prefix = partial.slice(0, partial.lastIndexOf("/") + 1);
		return `${prefix}${nodeName}`;
	}

	return nodeName;
};

const getPathSuggestions = (
	content: PortfolioContent,
	currentPath: string,
	partial: string,
	includeSpecial: boolean,
) => {
	const rawPartial = partial.trim();
	const lastSlashIndex = rawPartial.lastIndexOf("/");
	const hasSlash = lastSlashIndex >= 0;

	let parentPath = currentPath;
	let leaf = rawPartial;

	if (rawPartial.startsWith("~/")) {
		const rest = rawPartial.slice(2);
		const slashIndex = rest.lastIndexOf("/");
		const base = slashIndex >= 0 ? `~/${rest.slice(0, slashIndex)}` : "~";
		parentPath = resolvePathInput(base, currentPath);
		leaf = slashIndex >= 0 ? rest.slice(slashIndex + 1) : rest;
	} else if (rawPartial.startsWith("/")) {
		const base = hasSlash ? rawPartial.slice(0, lastSlashIndex + 1) : "/";
		parentPath = resolvePathInput(base, currentPath);
		leaf = hasSlash
			? rawPartial.slice(lastSlashIndex + 1)
			: rawPartial.slice(1);
	} else if (hasSlash) {
		const base = rawPartial.slice(0, lastSlashIndex);
		parentPath = resolvePathInput(base, currentPath);
		leaf = rawPartial.slice(lastSlashIndex + 1);
	}

	const suggestions = getAutocompleteChildren(content, parentPath, leaf).map(
		(node) => formatPathCompletion(currentPath, rawPartial, node.name),
	);

	if (!includeSpecial) {
		return suggestions;
	}

	const specialTokens = ["..", "~", "/"].filter((token) =>
		token.startsWith(rawPartial),
	);

	return [...specialTokens, ...suggestions];
};

export const parseCommand = (
	input: string,
	content: PortfolioContent,
	shellState: ShellState,
): ParsedCommand => {
	const raw = input;
	const normalized = input.trim().toLowerCase();

	if (normalized === "") {
		return {
			raw,
			normalized,
			command: null,
			args: [],
			status: "empty",
		};
	}

	const [commandToken, ...args] = normalized.split(/\s+/);
	const spec = getCommandSpec(commandToken);

	if (!spec) {
		return {
			raw,
			normalized,
			command: null,
			args,
			status: "not-found",
		};
	}

	const command = spec.name;

	switch (command) {
		case "about":
		case "clear":
		case "education":
		case "email":
		case "experience":
		case "gui":
		case "help":
		case "history":
		case "lab":
		case "now":
		case "pwd":
		case "skills":
		case "stats":
		case "tree":
		case "values":
		case "welcome":
		case "whoami":
		case "42":
		case "morocco":
		case "souk":
		case "rescue":
			return {
				raw,
				normalized,
				command,
				args,
				status: args.length === 0 ? "valid" : "usage",
				usage: spec.usage,
			};

		case "resume":
			return {
				raw,
				normalized,
				command,
				args,
				status: args.length === 0 ? "valid" : "usage",
				usage: spec.usage,
			};

		case "echo":
			return {
				raw,
				normalized,
				command,
				args,
				status: args.length > 0 ? "valid" : "usage",
				usage: spec.usage,
			};

		case "projects": {
			const validRedirect =
				args.length === 2 &&
				args[0] === "go" &&
				content.projects.some((project) => project.id.toString() === args[1]);

			return {
				raw,
				normalized,
				command,
				args,
				status: args.length === 0 || validRedirect ? "valid" : "usage",
				usage: spec.usage,
			};
		}

		case "socials": {
			const validRedirect =
				args.length === 2 &&
				args[0] === "go" &&
				content.socials.some((social) => social.id.toString() === args[1]);

			return {
				raw,
				normalized,
				command,
				args,
				status: args.length === 0 || validRedirect ? "valid" : "usage",
				usage: spec.usage,
			};
		}

		case "themes": {
			const validThemeSwitch =
				args.length === 2 &&
				args[0] === "set" &&
				Boolean(getThemeByName(content, args[1]));

			return {
				raw,
				normalized,
				command,
				args,
				status: args.length === 0 || validThemeSwitch ? "valid" : "usage",
				usage: spec.usage,
			};
		}

		case "ls": {
			if (args.length > 1) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "usage",
					usage: spec.usage,
				};
			}

			if (args.length === 0) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "valid",
					resolvedPath: shellState.currentPath,
				};
			}

			const resolved = resolveFsTarget(
				content,
				args[0],
				shellState.currentPath,
			);
			if (resolved.error) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "error",
					errorMessage: `ls: ${resolved.error}`,
				};
			}

			return {
				raw,
				normalized,
				command,
				args,
				status: "valid",
				resolvedPath: resolved.path,
			};
		}

		case "cd": {
			if (args.length > 1) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "usage",
					usage: spec.usage,
				};
			}

			if (args.length === 0) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "valid",
					resolvedPath: ROOT_PATH,
				};
			}

			const resolved = resolveFsTarget(
				content,
				args[0],
				shellState.currentPath,
			);
			if (resolved.error) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "error",
					errorMessage: `cd: ${resolved.error}`,
				};
			}

			if (resolved.path !== ROOT_PATH && resolved.node?.type !== "dir") {
				return {
					raw,
					normalized,
					command,
					args,
					status: "error",
					errorMessage: `cd: ${args[0]}: Not a directory`,
				};
			}

			return {
				raw,
				normalized,
				command,
				args,
				status: "valid",
				resolvedPath: resolved.path,
			};
		}

		case "cat": {
			if (args.length !== 1) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "usage",
					usage: spec.usage,
				};
			}

			const resolved = resolveFsTarget(
				content,
				args[0],
				shellState.currentPath,
			);
			if (resolved.error) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "error",
					errorMessage: `cat: ${resolved.error}`,
				};
			}

			if (resolved.path === ROOT_PATH || resolved.node?.type !== "file") {
				return {
					raw,
					normalized,
					command,
					args,
					status: "error",
					errorMessage: `cat: ${args[0]}: Is a directory`,
				};
			}

			return {
				raw,
				normalized,
				command,
				args,
				status: "valid",
				resolvedPath: resolved.path,
			};
		}

		case "grep": {
			if (args.length === 0) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "usage",
					usage: spec.usage,
				};
			}

			return {
				raw,
				normalized,
				command,
				args,
				status: "valid",
				subject: args.join(" "),
			};
		}

		case "man": {
			if (args.length !== 1) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "usage",
					usage: spec.usage,
				};
			}

			const subject = getCommandSpec(args[0]);
			if (!subject) {
				return {
					raw,
					normalized,
					command,
					args,
					status: "error",
					errorMessage: `man: ${args[0]}: No manual entry for ${args[0]}`,
				};
			}

			return {
				raw,
				normalized,
				command,
				args,
				status: "valid",
				subject: subject.name,
			};
		}

		case "sudo":
			return {
				raw,
				normalized,
				command,
				args,
				status: args.length === 1 && args[0] === "hire-me" ? "valid" : "usage",
				usage: spec.usage,
			};
	}
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
			const indexedItems =
				command === "projects" ? content.projects : content.socials;
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

const renderProjectCard = (project: PortfolioProject) => (
	<div
		key={project.id}
		className={`space-y-2 ${entryClassName}`}
	>
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

const renderWelcome = (content: PortfolioContent) => (
	<div
		data-testid="welcome"
		className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]"
	>
		<div className="space-y-4">
			<pre className="hidden overflow-x-auto text-[0.67rem] font-semibold leading-[1.05rem] text-brand-accentSoft sm:block">
				{content.welcome.ascii.join("\n")}
			</pre>
			<pre className="overflow-x-auto text-[0.62rem] font-semibold leading-4 text-brand-accentSoft sm:hidden">
				{content.welcome.mobileAscii.join("\n")}
			</pre>
			<div className="space-y-2 text-base leading-7 text-brand-foreground">
				{content.welcome.introLines.map((line) => (
					<p key={line}>{line}</p>
				))}
			</div>
		</div>
		<div className="flex flex-row justify-start max-w-xs">
			<pre className="overflow-x-auto overflow-y-hidden text-[0.7rem] font-semibold leading-[0.7rem] tracking-[-0.08em] text-brand-foreground">
				{content.welcome.avatarAscii.join("\n")}
			</pre>
		</div>
	</div>
);

const renderAbout = (content: PortfolioContent) => (
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

const renderResume = (content: PortfolioContent) => (
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
			Full detail:{" "}
			<span className={commandClassName}>about</span>
			{" · "}
			<span className={commandClassName}>experience</span>
			{" · "}
			<span className={commandClassName}>projects</span>
			{" · "}
			<span className={commandClassName}>skills</span>
		</div>
	</div>
);

const renderNow = (content: PortfolioContent) => (
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

const renderValues = (values: ValueEntry[]) => (
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

const renderStats = (content: PortfolioContent) => (
	<div data-testid="stats" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
		{content.stats.map((stat) => (
			<div
				key={`${stat.value}-${stat.label}`}
				className={`space-y-2 ${cardClassName}`}
			>
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

const renderSkills = (content: PortfolioContent) => (
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

const renderExperience = (content: PortfolioContent) => (
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

const renderProjects = (content: PortfolioContent) => (
	<div data-testid="projects" className="space-y-4">
		<div className="max-w-3xl text-sm leading-7 text-brand-muted">
			Talk is cheap. These are the projects that best show how I build: AI
			tooling, enterprise delivery, product software, and game-tech curiosity.
		</div>
		{content.projects.map((project) => renderProjectCard(project))}
		{usageOutput("projects", "projects [go <id>]")}
	</div>
);

const renderEducation = (content: PortfolioContent) => (
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

const renderSocials = (content: PortfolioContent) => (
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

const renderThemes = (content: PortfolioContent) => (
	<div data-testid="themes" className="space-y-4">
		<div className="grid gap-3 md:grid-cols-2">
			{content.themePresets.map((theme) => (
				<div
					key={theme.name}
					className={`space-y-2 ${cardClassName}`}
				>
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
						).map((color, i) => (
							<span
								key={i}
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
			<span
				className={`text-xs uppercase tracking-[0.18em] ${styles.text}`}
			>
				{status}
			</span>
		</div>
	);
};

const renderLab = (content: PortfolioContent) => (
	<div data-testid="lab" className="space-y-4">
		<div className="max-w-4xl text-sm leading-7 text-brand-muted">
			{content.lab.summary}
		</div>
		{content.lab.entries.map((entry) => (
			<div
				key={entry.name}
				className={`space-y-2 ${entryClassName}`}
			>
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

const renderHistory = (history: string[]) => (
	<div
		data-testid="history"
		className="space-y-1 text-sm text-brand-foreground"
	>
		{history.length === 0 ? (
			<div className="text-brand-muted">No commands in session history.</div>
		) : (
			history.map((command, index) => (
				<div key={`${command}-${index}`}>{command}</div>
			))
		)}
	</div>
);

const renderEcho = (raw: string) => {
	const echoInput = raw.trim().slice(4).trim();
	const cleaned = echoInput.replace(/^(['"`])(.*)\1$/, "$2");

	return (
		<div data-testid="echo-output" className="text-sm text-brand-foreground">
			{cleaned}
		</div>
	);
};

const renderGeneralOutput = (value: string, testId: string) => (
	<div data-testid={testId} className="text-sm text-brand-foreground">
		{value}
	</div>
);

const renderEmptyAction = (testId: string) => <span data-testid={testId} />;

const renderEasterEggBlock = (
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

const renderHelp = (content: PortfolioContent) => {
	const groups = getPublicCommands().reduce<
		Record<CommandCategory, CommandDescriptor[]>
	>(
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

const renderLs = (
	content: PortfolioContent,
	currentPath: string,
	targetPath: string,
) => {
	const node =
		targetPath === ROOT_PATH ? undefined : getNodeAtPath(content, targetPath);

	const entries =
		node?.type === "file"
			? [node]
			: getChildren(content, targetPath, "public-only");

	return (
		<div data-testid="ls-output" className="space-y-2">
			<div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">
				listing{" "}
				{targetPath === currentPath
					? formatPromptPath(currentPath)
					: formatPromptPath(targetPath)}
			</div>
			<div className="space-y-1 text-sm">
				{entries.map((entry) => (
					<div
						key={`${entry.path}-${entry.name}`}
						className="grid gap-1 sm:grid-cols-[7.5rem_12rem_1fr]"
					>
						<span className="text-brand-muted">
							{entry.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--"}
						</span>
						<span
							className={`font-semibold ${entry.type === "dir" ? "text-brand-accentSoft" : "text-brand-foreground"}`}
						>
							{entry.name}
							{entry.type === "dir" ? "/" : ""}
						</span>
						<span className="text-brand-muted">{entry.description}</span>
					</div>
				))}
			</div>
		</div>
	);
};

type TreeLine = { prefix: string; connector: string; name: string; isDir: boolean };

const buildTreeLines = (
	content: PortfolioContent,
	path: string,
	prefix = "",
): TreeLine[] => {
	const children = getChildren(content, path, "public-only");
	const lines: TreeLine[] = [];

	children.forEach((child, index) => {
		const isLast = index === children.length - 1;
		const connector = isLast ? "└──" : "├──";
		lines.push({ prefix, connector, name: child.name, isDir: child.type === "dir" });

		if (child.type === "dir") {
			const childPrefix = `${prefix}${isLast ? "    " : "│   "}`;
			lines.push(...buildTreeLines(content, getNodePath(child), childPrefix));
		}
	});

	return lines;
};

const renderTree = (content: PortfolioContent) => {
	const lines = buildTreeLines(content, ROOT_PATH);
	return (
		<div data-testid="tree-output" className="space-y-2">
			<div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">
				public tree
			</div>
			<div className="overflow-x-auto text-sm leading-6">
				<div className="text-brand-muted">~</div>
				{lines.map((line, i) => (
					<div key={i} className="flex">
						<span className="whitespace-pre text-brand-muted">
							{line.prefix}{line.connector}{" "}
						</span>
						<span
							className={
								line.isDir
									? "font-semibold text-brand-accentSoft"
									: "text-brand-foreground"
							}
						>
							{line.name}{line.isDir ? "/" : ""}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const renderMan = (subject: CommandDescriptor) => (
	<div data-testid="man-output" className="space-y-4">
		<div className="space-y-1">
			<div className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accentSoft">
				Manual
			</div>
			<div className="text-lg font-semibold text-brand-foreground">
				{subject.name}
			</div>
			<div className="text-sm text-brand-muted">{subject.description}</div>
		</div>
		<div className="space-y-1 text-sm">
			<div className="text-brand-muted">Usage</div>
			<div className="text-brand-foreground">{subject.usage}</div>
		</div>
		<div className="space-y-1 text-sm">
			<div className="text-brand-muted">Examples</div>
			{subject.examples.map((example) => (
				<div key={example} className="text-brand-foreground">
					{example}
				</div>
			))}
		</div>
	</div>
);

const searchContent = (content: PortfolioContent, term: string) => {
	const docs = [
		{
			title: "about",
			text: [
				content.identity.intro,
				content.identity.summary,
				...content.highlights,
			].join(" "),
		},
		{
			title: "now",
			text: [
				content.now.headline,
				content.now.summary,
				content.now.buildMode,
				...content.now.bullets,
			].join(" "),
		},
		{
			title: "skills",
			text: content.skills
				.flatMap((group) => [group.category, ...group.items])
				.join(" "),
		},
		{
			title: "experience",
			text: content.experience
				.flatMap((entry) => [
					entry.company,
					entry.role,
					entry.summary,
					...entry.bullets,
				])
				.join(" "),
		},
		{
			title: "projects",
			text: content.projects
				.flatMap((project) => [
					project.name,
					project.description,
					project.outcome,
					...project.stack,
				])
				.join(" "),
		},
		{
			title: "values",
			text: content.values
				.flatMap((value) => [value.title, value.detail])
				.join(" "),
		},
		{
			title: "lab",
			text: [
				content.lab.summary,
				...content.lab.entries.flatMap((entry) => [
					entry.name,
					entry.detail,
					...entry.stack,
				]),
			].join(" "),
		},
		{
			title: "42",
			text: content.easterEggs.fortyTwo.lines.join(" "),
		},
		{
			title: "morocco",
			text: content.easterEggs.morocco.lines.join(" "),
		},
	];

	return docs
		.filter((doc) => doc.text.toLowerCase().includes(term))
		.map((doc) => {
			const lowerText = doc.text.toLowerCase();
			const index = lowerText.indexOf(term);
			const start = Math.max(index - 36, 0);
			const end = Math.min(index + term.length + 72, doc.text.length);
			return {
				title: doc.title,
				snippet: doc.text.slice(start, end).trim(),
			};
		});
};

const renderGrep = (content: PortfolioContent, term: string) => {
	const matches = searchContent(content, term.toLowerCase());

	return (
		<div data-testid="grep-output" className="space-y-0">
			{matches.length === 0 ? (
				<div className="text-sm text-brand-muted">
					grep: no matches for &quot;{term}&quot;
				</div>
			) : (
				matches.map((match) => (
					<div
						key={`${match.title}-${match.snippet}`}
						className="space-y-1 border-b border-brand-panelEdge/50 pb-3 pt-3 first:pt-0 last:border-b-0 last:pb-0"
					>
						<div className="font-semibold text-brand-foreground">{match.title}</div>
						<div className="text-sm leading-6 text-brand-foreground">
							{match.snippet}
						</div>
					</div>
				))
			)}
		</div>
	);
};

const renderContentByKey = (
	renderKey: string,
	content: PortfolioContent,
	context: CommandRenderContext,
): ReactNode => {
	if (renderKey.startsWith("project:")) {
		const id = Number(renderKey.split(":")[1]);
		const project = content.projects.find((entry) => entry.id === id);

		return project ? (
			<div data-testid={`project-${project.id}`} className="space-y-4">
				{renderProjectCard(project)}
			</div>
		) : null;
	}

	switch (renderKey) {
		case "about":
			return renderAbout(content);
		case "resume":
			return renderResume(content);
		case "now":
			return renderNow(content);
		case "values":
			return renderValues(content.values);
		case "stats":
			return renderStats(content);
		case "skills":
			return renderSkills(content);
		case "experience":
			return renderExperience(content);
		case "education":
			return renderEducation(content);
		case "socials":
			return renderSocials(content);
		case "themes":
			return renderThemes(content);
		case "lab":
			return renderLab(content);
		case "welcome":
			return renderWelcome(content);
		case "help":
			return renderHelp(content);
		case "42":
			return renderEasterEggBlock("42-output", content.easterEggs.fortyTwo);
		case "morocco":
			return renderEasterEggBlock("morocco-output", content.easterEggs.morocco);
		case "souk":
			return renderEasterEggBlock("souk-output", content.easterEggs.souk);
		case "rescue":
			return renderEasterEggBlock("rescue-output", content.easterEggs.rescue);
		case "history":
			return renderHistory(context.history);
		default:
			return null;
	}
};

export const renderCommandOutput = (
	parsed: ParsedCommand,
	content: PortfolioContent,
	context: CommandRenderContext,
): ReactNode => {
	if (parsed.status === "empty") {
		return null;
	}

	if (parsed.status === "usage") {
		return usageOutput(parsed.command ?? "command", parsed.usage ?? "");
	}

	if (parsed.status === "error") {
		return errorOutput(parsed.errorMessage ?? "Unknown shell error");
	}

	if (parsed.status === "not-found") {
		return (
			<div
				data-testid="not-found-output"
				className="text-sm text-brand-foreground"
			>
				<span className="text-[var(--chrome-close)]">command not found:</span>{" "}
				{parsed.normalized}. Type <span className={commandClassName}>help</span>{" "}
				for public commands.
			</div>
		);
	}

	switch (parsed.command) {
		case "about":
		case "education":
		case "experience":
		case "help":
		case "history":
		case "lab":
		case "now":
		case "resume":
		case "skills":
		case "socials":
		case "stats":
		case "values":
		case "welcome":
		case "42":
		case "morocco":
		case "souk":
		case "rescue":
			return renderContentByKey(parsed.command, content, context);

		case "projects":
			return parsed.args.length === 0
				? renderProjects(content)
				: renderEmptyAction("projects-redirect");

		case "echo":
			return renderEcho(parsed.raw);

		case "email":
			return renderGeneralOutput(content.identity.email, "email-output");

		case "gui":
			return renderEmptyAction("gui-output");

		case "pwd":
			return renderGeneralOutput(
				formatAbsolutePath(content, context.currentPath),
				"pwd-output",
			);

		case "whoami":
			return renderGeneralOutput(content.identity.whoami, "whoami-output");

		case "ls":
			return renderLs(
				content,
				context.currentPath,
				parsed.resolvedPath ?? context.currentPath,
			);

		case "tree":
			return renderTree(content);

		case "cat": {
			const node =
				parsed.resolvedPath && parsed.resolvedPath !== ROOT_PATH
					? getNodeAtPath(content, parsed.resolvedPath)
					: undefined;

			return node?.renderKey
				? renderContentByKey(node.renderKey, content, context)
				: null;
		}

		case "cd":
			return renderGeneralOutput(
				`Path: ${formatPromptPath(parsed.resolvedPath ?? context.currentPath)}`,
				"cd-output",
			);

		case "themes":
			if (parsed.args[0] === "set" && parsed.args[1]) {
				const theme = getThemeByName(content, parsed.args[1]);

				return theme ? (
					<div data-testid="themes-output" className="space-y-1 text-sm">
						<div className="text-brand-foreground">Theme: {theme.name}</div>
						<div className="text-brand-muted">{theme.label}</div>
					</div>
				) : (
					renderEmptyAction("themes-output")
				);
			}

			return renderThemes(content);

		case "grep":
			return renderGrep(content, parsed.subject ?? "");

		case "man":
			return parsed.subject
				? renderMan(getCommandSpec(parsed.subject) as CommandDescriptor)
				: null;

		case "sudo":
			return renderEasterEggBlock("sudo-output", content.easterEggs.hireMe);
	}
};
