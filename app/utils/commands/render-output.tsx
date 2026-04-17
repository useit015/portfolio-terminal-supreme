import { ReactNode } from "react";
import {
	CommandDescriptor,
	CommandRenderContext,
	ParsedCommand,
	PortfolioContent,
} from "../../types";
import { KNOWN_TOOL_REPLIES, ROOT_PATH } from "./constants";
import { formatAbsolutePath, formatPromptPath, getNodeAtPath } from "./filesystem";
import { getCommandSpec } from "./registry";
import {
	errorOutput,
	renderEasterEggBlock,
	renderEcho,
	renderEmptyAction,
	renderGeneralOutput,
	usageOutput,
} from "./renderers/common";
import { renderContentByKey } from "./renderers/content";
import {
	renderCoffee,
	renderDocker,
	renderFortune,
	renderGit,
	renderMatrix,
	renderNeofetch,
	renderNpm,
	renderUname,
} from "./renderers/fun";
import { renderGrep, renderLs, renderMan, renderTree } from "./renderers/navigation";

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
		const firstToken = parsed.normalized.split(/\s+/)[0];
		const knownReply = KNOWN_TOOL_REPLIES[firstToken];
		if (knownReply) {
			return (
				<div data-testid="not-found-output" className="text-sm text-brand-muted">
					{knownReply}
				</div>
			);
		}

		return (
			<div data-testid="not-found-output" className="text-sm text-brand-foreground">
				<span className="text-[var(--chrome-close)]">command not found:</span>{" "}
				{parsed.normalized}. Type{" "}
				<span className="font-semibold text-brand-accent">help</span> for public
				commands.
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

		case "neofetch":
			return renderNeofetch(content);

		case "uname":
			return renderUname(content, parsed.args);

		case "matrix":
			return renderMatrix();

		case "coffee":
			return renderCoffee();

		case "fortune":
			return renderFortune();

		case "git":
			return renderGit(parsed.args);

		case "npm":
			return renderNpm(parsed.args);

		case "docker":
			return renderDocker(parsed.args);

		case "projects":
			return parsed.args.length === 0
				? renderContentByKey("projects", content, context)
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

			return node?.renderKey ? renderContentByKey(node.renderKey, content, context) : null;
		}

		case "cd":
			return renderGeneralOutput(
				`Path: ${formatPromptPath(parsed.resolvedPath ?? context.currentPath)}`,
				"cd-output",
			);

		case "themes":
			if (parsed.args[0] === "set" && parsed.args[1]) {
				const theme = content.themePresets.find((entry) => entry.name === parsed.args[1]);

				return theme ? (
					<div data-testid="themes-output" className="space-y-1 text-sm">
						<div className="text-brand-foreground">Theme: {theme.name}</div>
						<div className="text-brand-muted">{theme.label}</div>
					</div>
				) : (
					renderEmptyAction("themes-output")
				);
			}

			return renderContentByKey("themes", content, context);

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
