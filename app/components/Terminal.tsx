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
			<div className="flex h-full min-h-0 w-full flex-col overflow-hidden border-y border-brand-panelEdge bg-brand-panel shadow-[0_18px_60px_color-mix(in_srgb,var(--shadow-color)_70%,transparent)]">
				<div className="flex items-center gap-4 border-b border-brand-panelEdge bg-[color-mix(in_srgb,var(--panel-color)_88%,var(--panel-inset))] px-4 py-2 text-sm md:px-8">
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
						className="border-b border-dashed border-[color-mix(in_srgb,var(--muted-color)_34%,transparent)] text-brand-muted transition-colors hover:border-brand-accentSoft hover:text-brand-accentSoft focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--panel-color)]"
					>
						readable view ↗
					</Link>
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

				<div className="border-t border-brand-panelEdge/70 bg-[color-mix(in_srgb,var(--panel-color)_88%,var(--panel-inset))] px-4 py-3 md:px-8 md:py-4">
					{hints.length > 0 ? (
						<div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-muted">
							{hints.map((hint) => (
								<span key={hint}>{hint}</span>
							))}
						</div>
					) : null}

					<div className="flex items-start gap-2 border border-brand-panelEdge/70 bg-[color-mix(in_srgb,var(--panel-inset)_54%,transparent)] px-3 py-2 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--fg-color)_5%,transparent)] focus-within:border-brand-accent focus-within:shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-color)_35%,transparent)]">
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
							className="mt-[1px] min-w-0 flex-1 cursor-text bg-transparent text-sm text-[var(--prompt-input)] caret-[var(--header-glow)] outline-none md:text-base"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
