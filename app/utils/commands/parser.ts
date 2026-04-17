import { ParsedCommand, PortfolioContent, ShellState } from "../../types";
import { getThemeByName } from "../theme";
import { ROOT_PATH } from "./constants";
import { getCommandSpec } from "./registry";
import { resolveFsTarget } from "./filesystem";

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
		case "matrix":
		case "coffee":
		case "neofetch":
			return {
				raw,
				normalized,
				command,
				args,
				status: args.length === 0 ? "valid" : "usage",
				usage: spec.usage,
			};

		case "uname":
		case "fortune":
			return {
				raw,
				normalized,
				command,
				args,
				status: "valid",
			};

		case "git":
		case "npm":
		case "docker":
			return {
				raw,
				normalized,
				command,
				args,
				status: "valid",
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

			const resolved = resolveFsTarget(content, args[0], shellState.currentPath);
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

			const resolved = resolveFsTarget(content, args[0], shellState.currentPath);
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

			const resolved = resolveFsTarget(content, args[0], shellState.currentPath);
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
