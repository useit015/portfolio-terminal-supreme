import { ReactNode } from "react";
import { CommandCategory, CommandVisibility } from "./shared";

export type CommandName =
	| "42"
	| "about"
	| "cat"
	| "cd"
	| "clear"
	| "coffee"
	| "docker"
	| "echo"
	| "education"
	| "email"
	| "experience"
	| "fortune"
	| "git"
	| "grep"
	| "gui"
	| "help"
	| "history"
	| "lab"
	| "ls"
	| "man"
	| "matrix"
	| "morocco"
	| "neofetch"
	| "now"
	| "npm"
	| "projects"
	| "pwd"
	| "rescue"
	| "resume"
	| "skills"
	| "socials"
	| "souk"
	| "stats"
	| "sudo"
	| "themes"
	| "tree"
	| "uname"
	| "values"
	| "welcome"
	| "whoami";

export interface CommandDescriptor {
	name: CommandName;
	description: string;
	category: CommandCategory;
	visibility: CommandVisibility;
	usage: string;
	examples: string[];
	aliases?: string[];
}

export type ParsedCommandStatus =
	| "empty"
	| "valid"
	| "usage"
	| "not-found"
	| "error";

export interface ParsedCommand {
	raw: string;
	normalized: string;
	command: CommandName | null;
	args: string[];
	status: ParsedCommandStatus;
	usage?: string;
	errorMessage?: string;
	resolvedPath?: string;
	subject?: string;
}

export interface ShellState {
	currentPath: string;
}

export interface CommandRenderContext {
	history: string[];
	currentPath: string;
}

export interface CommandEntry {
	input: string;
	parsed: ParsedCommand;
	output: ReactNode;
	promptPath: string;
}
