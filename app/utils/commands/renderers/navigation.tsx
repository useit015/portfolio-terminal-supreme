import { CommandDescriptor, PortfolioContent } from "../../../types";
import { ROOT_PATH } from "../constants";
import { formatPromptPath, getChildren, getNodeAtPath, getNodePath } from "../filesystem";

type TreeLine = {
	prefix: string;
	connector: string;
	name: string;
	isDir: boolean;
};

export const renderLs = (
	content: PortfolioContent,
	currentPath: string,
	targetPath: string,
) => {
	const node = targetPath === ROOT_PATH ? undefined : getNodeAtPath(content, targetPath);

	const entries =
		node?.type === "file" ? [node] : getChildren(content, targetPath, "public-only");

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
		lines.push({
			prefix,
			connector,
			name: child.name,
			isDir: child.type === "dir",
		});

		if (child.type === "dir") {
			const childPrefix = `${prefix}${isLast ? "    " : "│   "}`;
			lines.push(...buildTreeLines(content, getNodePath(child), childPrefix));
		}
	});

	return lines;
};

export const renderTree = (content: PortfolioContent) => {
	const lines = buildTreeLines(content, ROOT_PATH);
	return (
		<div data-testid="tree-output" className="space-y-2">
			<div className="text-xs uppercase tracking-[0.18em] text-brand-accentSoft">
				public tree
			</div>
			<div className="overflow-x-auto text-sm leading-6">
				<div className="text-brand-muted">~</div>
				{lines.map((line, index) => (
					<div key={index} className="flex">
						<span className="whitespace-pre text-brand-muted">
							{line.prefix}
							{line.connector}{" "}
						</span>
						<span
							className={
								line.isDir
									? "font-semibold text-brand-accentSoft"
									: "text-brand-foreground"
							}
						>
							{line.name}
							{line.isDir ? "/" : ""}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export const renderMan = (subject: CommandDescriptor) => (
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
			text: content.skills.flatMap((group) => [group.category, ...group.items]).join(" "),
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
			text: content.values.flatMap((value) => [value.title, value.detail]).join(" "),
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

export const renderGrep = (content: PortfolioContent, term: string) => {
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
