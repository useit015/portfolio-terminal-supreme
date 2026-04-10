"use client";

import {
	KeyboardEvent,
	startTransition,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	CommandEntry,
	ParsedCommand,
	PortfolioContent,
} from "../types";
import {
	formatPromptPath,
	getAutocomplete,
	parseCommand,
	renderCommandOutput,
} from "../utils/commands";
import { getThemeByName } from "../utils/theme";

interface TerminalProps {
	content: PortfolioContent;
	activeThemeName: string;
	onThemeChange: (themeName: string) => void;
}

const PromptLine = ({
	identity,
	path,
	command,
}: {
	identity: PortfolioContent["identity"];
	path: string;
	command?: string;
}) => (
	<div className="flex flex-wrap items-center gap-1 text-sm md:text-base">
		<span className="font-semibold text-[var(--prompt-user)]">
			{identity.username}
		</span>
		<span className="text-[var(--prompt-host)]">@</span>
		<span className="font-semibold text-[var(--prompt-host)]">
			{identity.hostname}
		</span>
		<span className="text-[var(--prompt-host)]">:</span>
		<span className="text-brand-muted">{path}</span>
		<span className="text-[var(--prompt-host)]">$</span>
		{command ? (
			<span className="ml-1 break-all text-[var(--prompt-input)]">
				{command}
			</span>
		) : null}
	</div>
);

const getInitialEntry = (content: PortfolioContent): CommandEntry => {
	const parsed = parseCommand("welcome", content, { currentPath: "/" });

	return {
		input: "welcome",
		parsed,
		promptPath: "~",
		output: renderCommandOutput(parsed, content, {
			history: ["welcome"],
			currentPath: "/",
		}),
	};
};

const AUTO_SCROLL_THRESHOLD = 48;

const isNearBottom = (element: HTMLDivElement) =>
	element.scrollHeight - element.scrollTop - element.clientHeight <=
	AUTO_SCROLL_THRESHOLD;

export default function Terminal({
	content,
	activeThemeName,
	onThemeChange,
}: TerminalProps) {
	const [currentPath, setCurrentPath] = useState("/");
	const [input, setInput] = useState("");
	const [draftInput, setDraftInput] = useState("");
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [hints, setHints] = useState<string[]>([]);
	const [submittedCommands, setSubmittedCommands] = useState<string[]>([
		"welcome",
	]);
	const [entries, setEntries] = useState<CommandEntry[]>([
		getInitialEntry(content),
	]);

	const inputRef = useRef<HTMLInputElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const shouldAutoScrollRef = useRef(true);

	const promptPath = formatPromptPath(currentPath);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		const scrollElement = scrollRef.current;

		if (!scrollElement || !shouldAutoScrollRef.current) {
			return;
		}

		scrollElement.scrollTop = scrollElement.scrollHeight;
	}, [entries, hints]);

	useEffect(() => {
		const scrollElement = scrollRef.current;

		if (!scrollElement) {
			return;
		}

		shouldAutoScrollRef.current = isNearBottom(scrollElement);
	}, []);

	const focusInput = () => {
		if (!window.getSelection()?.toString()) {
			inputRef.current?.focus();
		}
	};

	const syncAutoScrollPreference = () => {
		const scrollElement = scrollRef.current;

		if (!scrollElement) {
			return;
		}

		shouldAutoScrollRef.current = isNearBottom(scrollElement);
	};

	const clearTerminal = () => {
		shouldAutoScrollRef.current = true;

		startTransition(() => {
			setEntries([]);
			setSubmittedCommands([]);
		});
		setInput("");
		setDraftInput("");
		setHistoryIndex(-1);
		setHints([]);
	};

	const handleThemeSwitch = (parsed: ParsedCommand) => {
		if (
			parsed.command === "themes" &&
			parsed.args[0] === "set" &&
			parsed.args[1] &&
			getThemeByName(content, parsed.args[1])
		) {
			onThemeChange(parsed.args[1]);
		}
	};

	const handlePathSwitch = (parsed: ParsedCommand) => {
		if (
			parsed.command === "cd" &&
			parsed.status === "valid" &&
			parsed.resolvedPath
		) {
			setCurrentPath(parsed.resolvedPath);
		}
	};

	const handleRedirect = (parsed: ParsedCommand) => {
		if (typeof window === "undefined" || parsed.status !== "valid") {
			return;
		}

		if (parsed.command === "email") {
			window.open(`mailto:${content.identity.email}`, "_self");
			return;
		}

		if (parsed.command === "gui") {
			window.open(content.identity.guiUrl, "_blank", "noopener,noreferrer");
			return;
		}

		if (
			parsed.command === "projects" &&
			parsed.args[0] === "go" &&
			parsed.args[1]
		) {
			const project = content.projects.find(
				(entry) => entry.id.toString() === parsed.args[1],
			);
			if (project) {
				window.open(project.link, "_blank", "noopener,noreferrer");
			}
			return;
		}

		if (
			parsed.command === "socials" &&
			parsed.args[0] === "go" &&
			parsed.args[1]
		) {
			const social = content.socials.find(
				(entry) => entry.id.toString() === parsed.args[1],
			);
			if (social) {
				window.open(social.href, "_blank", "noopener,noreferrer");
			}
		}
	};

	const executeCommand = (rawInput: string) => {
		const trimmedInput = rawInput.trim();
		const promptPathAtExecution = formatPromptPath(currentPath);
		const parsed = parseCommand(rawInput, content, { currentPath });

		if (parsed.status === "empty") {
			return;
		}

		if (parsed.command === "clear" && parsed.status === "valid") {
			clearTerminal();
			return;
		}

		const nextPath =
			parsed.command === "cd" &&
			parsed.status === "valid" &&
			parsed.resolvedPath
				? parsed.resolvedPath
				: currentPath;

		const nextHistory = [...submittedCommands, trimmedInput];
		const nextEntry: CommandEntry = {
			input: trimmedInput,
			parsed,
			promptPath: promptPathAtExecution,
			output: renderCommandOutput(parsed, content, {
				history: nextHistory,
				currentPath: nextPath,
			}),
		};

		handleThemeSwitch(parsed);
		handlePathSwitch(parsed);
		handleRedirect(parsed);

		startTransition(() => {
			setSubmittedCommands(nextHistory);
			setEntries((previous) => [...previous, nextEntry]);
		});

		setInput("");
		setDraftInput("");
		setHistoryIndex(-1);
		setHints([]);
	};

	const handleAutocomplete = () => {
		const completion = getAutocomplete(input, content, { currentPath });

		if (completion.nextInput) {
			setInput(completion.nextInput);
			setHints([]);
			return;
		}

		setHints(completion.hints);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const ctrlI = event.ctrlKey && event.key.toLowerCase() === "i";
		const ctrlL = event.ctrlKey && event.key.toLowerCase() === "l";
		const ctrlC = event.ctrlKey && event.key.toLowerCase() === "c";

		if (event.key === "Enter") {
			event.preventDefault();
			executeCommand(input);
			return;
		}

		if (event.key === "Tab" || ctrlI) {
			event.preventDefault();
			handleAutocomplete();
			return;
		}

		if (ctrlL) {
			event.preventDefault();
			clearTerminal();
			return;
		}

		if (event.key === "Escape" || ctrlC) {
			event.preventDefault();
			setInput("");
			setDraftInput("");
			setHistoryIndex(-1);
			setHints([]);
			return;
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();

			if (submittedCommands.length === 0) {
				return;
			}

			if (historyIndex === -1) {
				setDraftInput(input);
				const lastIndex = submittedCommands.length - 1;
				setHistoryIndex(lastIndex);
				setInput(submittedCommands[lastIndex]);
				setHints([]);
				return;
			}

			if (historyIndex > 0) {
				const nextIndex = historyIndex - 1;
				setHistoryIndex(nextIndex);
				setInput(submittedCommands[nextIndex]);
				setHints([]);
			}

			return;
		}

		if (event.key === "ArrowDown") {
			event.preventDefault();

			if (historyIndex === -1) {
				return;
			}

			const nextIndex = historyIndex + 1;
			if (nextIndex < submittedCommands.length) {
				setHistoryIndex(nextIndex);
				setInput(submittedCommands[nextIndex]);
			} else {
				setHistoryIndex(-1);
				setInput(draftInput);
			}
			setHints([]);
		}
	};

	return (
		<div
			className="flex h-full min-h-0 overflow-hidden overscroll-none bg-brand-background px-3 py-4 font-mono text-brand-foreground md:px-6 md:py-7"
			data-theme={activeThemeName}
			onClick={focusInput}
		>
			<div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col overflow-hidden border border-brand-panelEdge bg-brand-panel shadow-[0_32px_80px_var(--shadow-color)]">
				<div className="flex flex-wrap items-center gap-3 border-b border-brand-panelEdge bg-brand-panelInset px-4 py-3">
					<div className="flex items-center gap-2">
						<span
							className="h-3 w-3 rounded-full bg-[var(--chrome-close)]"
							data-testid="chrome-close"
						/>
						<span className="h-3 w-3 rounded-full bg-[var(--chrome-minimize)]" />
						<span className="h-3 w-3 rounded-full bg-[var(--chrome-maximize)]" />
					</div>
					<div className="min-w-0 flex-1"></div>
					<div className="text-right text-[0.7rem] uppercase tracking-[0.22em] text-brand-accentSoft">
						{content.identity.username}@{content.identity.hostname}
					</div>
				</div>

				<div
					ref={scrollRef}
					className="terminal-surface min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-6 md:py-5"
					data-testid="terminal-scroll-region"
					onScroll={syncAutoScrollPreference}
				>
					<div className="space-y-6">
						{entries.map((entry, index) => (
							<div key={`${entry.input}-${index}`} className="animate-fade-in">
								<div className="mb-2">
									<PromptLine
										identity={content.identity}
										path={entry.promptPath}
										command={entry.input}
									/>
								</div>
								<div className="md:pl-4">{entry.output}</div>
							</div>
						))}
					</div>
				</div>

				<div className="border-t border-brand-panelEdge/70 bg-brand-panel px-4 py-4 md:px-6 md:py-5">
					{hints.length > 0 ? (
						<div className="mb-4 flex flex-wrap gap-2">
							{hints.map((hint) => (
								<span
									key={hint}
									className="border border-brand-panelEdge bg-brand-panelInset px-2 py-1 text-xs text-brand-muted"
								>
									{hint}
								</span>
							))}
						</div>
					) : input === "" ? (
						<div className="mb-3 flex flex-wrap gap-2">
							{["resume", "about", "experience", "projects", "skills"].map(
								(cmd) => (
									<button
										key={cmd}
										type="button"
										onClick={() => executeCommand(cmd)}
										className="border border-brand-panelEdge bg-brand-panelInset px-2.5 py-1 text-xs text-brand-accent transition-colors hover:bg-brand-accent hover:text-brand-background focus:bg-brand-accent focus:text-brand-background focus:outline-none"
									>
										{cmd}
									</button>
								),
							)}
						</div>
					) : null}

					<div className="flex items-start gap-2">
						<PromptLine identity={content.identity} path={promptPath} />
						<input
							ref={inputRef}
							aria-label="Terminal input"
							title="terminal-input"
							type="text"
							value={input}
							placeholder="type a command, Tab to autocomplete"
							onChange={(event) => {
								setInput(event.target.value);
								setHints([]);
							}}
							onKeyDown={handleKeyDown}
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck={false}
							className="mt-[1px] min-w-0 flex-1 bg-transparent text-sm text-[var(--prompt-input)] caret-[var(--header-glow)] outline-none placeholder:text-brand-muted/50 md:text-base"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
