"use client";

import Link from "next/link";
import { PortfolioContent } from "../types";
import { PromptLine } from "./terminal/prompt-line";
import { useClock } from "./terminal/use-clock";
import { useTerminalSession } from "./terminal/use-terminal-session";

interface TerminalProps {
	content: PortfolioContent;
	activeThemeName: string;
	onThemeChange: (themeName: string) => void;
}

export default function Terminal({
	content,
	activeThemeName,
	onThemeChange,
}: TerminalProps) {
	const clock = useClock();
	const {
		entries,
		focusInput,
		handleInputChange,
		handleKeyDown,
		hints,
		input,
		inputRef,
		promptPath,
		scrollRef,
		syncAutoScrollPreference,
	} = useTerminalSession({ content, onThemeChange });

	return (
		<div
			className="flex h-full min-h-0 overflow-hidden overscroll-none bg-brand-background font-mono text-brand-foreground"
			data-theme={activeThemeName}
			onClick={focusInput}
		>
			<div className="flex h-full min-h-0 w-full flex-col overflow-hidden border-y border-brand-panelEdge bg-brand-panel">
				<div className="flex items-center gap-4 border-b border-brand-panelEdge bg-brand-panel px-4 py-2 text-sm md:px-8">
					<span
						className="font-semibold text-brand-accent"
						data-testid="chrome-close"
					>
						{content.identity.username.toUpperCase()}
					</span>
					<span className="text-brand-muted">/</span>
					<span className="text-brand-muted" suppressHydrationWarning>
						session {clock || "--:--:--"}
					</span>
					<div className="min-w-0 flex-1" />
					<Link
						href="/"
						onClick={(e) => e.stopPropagation()}
						className="rounded-sm text-brand-muted hover:text-brand-accentSoft focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--panel-color)]"
					>
						readable view ↗
					</Link>
					<span
						aria-hidden
						className="inline-flex items-center gap-2 text-brand-muted"
					>
						<span className="h-1.5 w-1.5 animate-pulse bg-brand-accent" />
						live
					</span>
				</div>

				<div
					ref={scrollRef}
					className="terminal-surface min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 md:px-8 md:py-6"
					data-testid="terminal-scroll-region"
					onScroll={syncAutoScrollPreference}
					role="log"
					aria-live="polite"
					aria-label="Terminal output"
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

				<div className="border-t border-brand-panelEdge/70 bg-brand-panel px-4 py-3 md:px-8 md:py-4">
					{hints.length > 0 ? (
						<div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-muted">
							{hints.map((hint) => (
								<span key={hint}>{hint}</span>
							))}
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
							onChange={(event) => handleInputChange(event.target.value)}
							onKeyDown={handleKeyDown}
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck={false}
							className="mt-[1px] min-w-0 flex-1 bg-transparent text-sm text-[var(--prompt-input)] caret-[var(--header-glow)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--panel-color)] md:text-base rounded-sm"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
