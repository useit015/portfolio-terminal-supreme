import { KeyboardEvent, startTransition, useEffect, useRef, useState } from "react";
import { CommandEntry, ParsedCommand, PortfolioContent } from "../../types";
import {
	formatPromptPath,
	getAutocomplete,
	parseCommand,
	renderCommandOutput,
} from "../../utils/commands";
import { getThemeByName } from "../../utils/theme";

const AUTO_SCROLL_THRESHOLD = 48;

const isNearBottom = (element: HTMLDivElement) =>
	element.scrollHeight - element.scrollTop - element.clientHeight <=
	AUTO_SCROLL_THRESHOLD;

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

interface UseTerminalSessionOptions {
	content: PortfolioContent;
	onThemeChange: (themeName: string) => void;
}

export const useTerminalSession = ({
	content,
	onThemeChange,
}: UseTerminalSessionOptions) => {
	const [currentPath, setCurrentPath] = useState("/");
	const [input, setInput] = useState("");
	const [draftInput, setDraftInput] = useState("");
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [hints, setHints] = useState<string[]>([]);
	const [submittedCommands, setSubmittedCommands] = useState<string[]>(["welcome"]);
	const [entries, setEntries] = useState<CommandEntry[]>([getInitialEntry(content)]);

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
			parsed.command === "cd" && parsed.status === "valid" && parsed.resolvedPath
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

	return {
		entries,
		hints,
		input,
		inputRef,
		promptPath,
		scrollRef,
		focusInput,
		syncAutoScrollPreference,
		handleKeyDown,
		handleInputChange: (value: string) => {
			setInput(value);
			setHints([]);
		},
	};
};
