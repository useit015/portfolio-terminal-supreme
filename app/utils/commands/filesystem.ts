import { CommandVisibility, PortfolioContent, VirtualFsNode } from "../../types";
import { ROOT_PATH } from "./constants";

export const formatPromptPath = (currentPath: string) =>
	currentPath === ROOT_PATH ? "~" : `~${currentPath}`;

export const formatAbsolutePath = (
	content: PortfolioContent,
	currentPath: string,
) => `${content.identity.homePath}${currentPath === ROOT_PATH ? "" : currentPath}`;

export const getNodePath = (node: VirtualFsNode) =>
	normalizePath(`${node.path === ROOT_PATH ? "" : node.path}/${node.name}`);

export const getNodeVisibility = (node: VirtualFsNode): CommandVisibility =>
	node.visibility ?? "public";

export const normalizePath = (value: string) => {
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

export const resolvePathInput = (target: string, currentPath: string) => {
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

export const getNodeAtPath = (content: PortfolioContent, path: string) =>
	content.filesystem.find((node) => getNodePath(node) === path);

export const getChildren = (
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

export const resolveFsTarget = (
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

const formatPathCompletion = (
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

export const getPathSuggestions = (
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
		(node) => formatPathCompletion(rawPartial, node.name),
	);

	if (!includeSpecial) {
		return suggestions;
	}

	const specialTokens = ["..", "~", "/"].filter((token) =>
		token.startsWith(rawPartial),
	);

	return [...specialTokens, ...suggestions];
};
