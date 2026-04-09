'use client';

import React, { useState, useEffect, useRef, KeyboardEvent, useMemo } from 'react';
import { PortfolioContent, CommandOutput, CommandType } from '../types';
import { processCommand, COMMANDS } from '../utils/commands';

interface TerminalProps {
  content: PortfolioContent;
}

const NON_HISTORY_TYPES = new Set<CommandType>(['banner', 'system']);

const getCommandType = (cmd: string): CommandType => {
  const normalized = cmd.trim().toLowerCase();

  if (normalized === '') {
    return 'error';
  }

  if (COMMANDS.some((command) => command.name === normalized)) {
    return normalized as CommandType;
  }

  return 'error';
};

export default function Terminal({ content }: TerminalProps) {
  const initialHistory = useMemo<CommandOutput[]>(() => {
    const bannerOutput = processCommand('banner', content);
    const bootOutput = (
      <div className="mt-2 space-y-1 text-sm text-brand-muted">
        {content.boot.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    );

    return [
      { type: 'banner', input: 'banner', output: bannerOutput },
      { type: 'system', input: 'system', output: bootOutput },
    ];
  }, [content]);

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>(initialHistory);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleContainerClick = () => {
    if (!window.getSelection()?.toString()) {
      inputRef.current?.focus();
    }
  };

  const commandHistory = history.filter((entry) => !NON_HISTORY_TYPES.has(entry.type) && entry.input.trim() !== '');

  const executeCommand = (cmd: string) => {
    if (cmd.trim() === '') {
      return;
    }

    if (cmd.trim().toLowerCase() === 'clear') {
      setHistory([
        initialHistory[0],
        {
          type: 'system',
          input: 'system',
          output: (
            <div className="mt-2 space-y-1 text-sm text-brand-muted">
              <div>Session cleared.</div>
              <div>Type <span className="text-brand-accent">help</span> to continue.</div>
            </div>
          ),
        },
      ]);
      return;
    }

    const output = processCommand(cmd, content);
    setHistory((prev) => [...prev, { type: getCommandType(cmd), input: cmd, output }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
      setHistoryIndex(-1);
      setDraftInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.name.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match.name);
      }
    } else if (e.key === 'Escape' || (e.key === 'c' && e.ctrlKey)) {
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex === -1) {
        setDraftInput(input);
        const lastCmdIndex = commandHistory.length - 1;
        if (lastCmdIndex >= 0) {
          setHistoryIndex(lastCmdIndex);
          setInput(commandHistory[lastCmdIndex].input);
        }
      } else {
        const nextIndex = historyIndex - 1;
        if (nextIndex >= 0) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex].input);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex].input);
        } else {
          setHistoryIndex(-1);
          setInput(draftInput);
        }
      }
    }
  };

  const style = {
    '--bg-color': content.theme.background,
    '--fg-color': content.theme.foreground,
    '--panel-color': content.theme.panel,
    '--panel-edge': content.theme.panelEdge,
    '--accent-color': content.theme.accent,
    '--accent-soft': content.theme.accentSoft,
    '--muted-color': content.theme.muted,
    '--prompt-user': content.theme.promptUser,
    '--prompt-host': content.theme.promptHost,
    '--prompt-input': content.theme.promptInput,
    '--header-glow': content.theme.headerGlow,
    '--font-stack': content.theme.fontStack,
  } as React.CSSProperties;

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-brand-background px-4 py-6 font-mono text-brand-foreground md:px-8 md:py-10"
      style={style}
      onClick={handleContainerClick}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_28%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
        <div className="grid gap-3 md:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-brand-panelEdge bg-brand-panel/70 p-5 backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accentSoft">Identity</div>
            <div className="mt-3 text-2xl font-semibold text-brand-foreground">{content.identity.name}</div>
            <div className="mt-1 text-sm text-brand-accent">{content.identity.role}</div>
            <div className="mt-3 max-w-2xl text-sm leading-7 text-brand-muted">{content.identity.summary}</div>
          </div>
          <div className="rounded-2xl border border-brand-panelEdge bg-brand-panel/70 p-5 backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accentSoft">Quick start</div>
            <div className="mt-3 grid gap-2 text-sm text-brand-muted">
              <div>`about` for positioning</div>
              <div>`experience` for delivery history</div>
              <div>`projects` for selected work</div>
              <div>`contact` for direct links</div>
            </div>
          </div>
        </div>

        <div className="relative flex h-[72vh] min-h-[520px] flex-col overflow-hidden rounded-3xl border border-brand-panelEdge bg-brand-panel shadow-[0_28px_80px_rgba(5,10,20,0.45)]">
          <div className="flex h-12 shrink-0 items-center gap-3 border-b border-brand-panelEdge px-5">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-brand-accentSoft/80" />
              <div className="h-3 w-3 rounded-full bg-brand-accent/70" />
              <div className="h-3 w-3 rounded-full bg-brand-foreground/50" />
            </div>
            <div className="flex-1 text-center text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
              {content.identity.username}@{content.identity.hostname}
            </div>
            <div className="rounded-full border border-brand-panelEdge px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-accentSoft">
              Live
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
            <div className="space-y-4">
              {history.map((entry, i) => (
                <div key={`${entry.input}-${i}`} className="animate-fade-in">
                  {!NON_HISTORY_TYPES.has(entry.type) && (
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm md:text-base">
                      <span className="font-semibold text-[var(--prompt-user)]">{content.identity.username}</span>
                      <span className="text-[var(--prompt-host)]">@</span>
                      <span className="font-semibold text-[var(--prompt-host)]">{content.identity.hostname}</span>
                      <span className="text-[var(--prompt-host)]">$</span>
                      <span className="ml-1 text-[var(--prompt-input)]">{entry.input}</span>
                    </div>
                  )}
                  <div className="overflow-x-hidden leading-relaxed md:ml-4">
                    {entry.output}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 text-sm md:text-base">
                <span className="font-semibold text-[var(--prompt-user)]">{content.identity.username}</span>
                <span className="text-[var(--prompt-host)]">@</span>
                <span className="font-semibold text-[var(--prompt-host)]">{content.identity.hostname}</span>
                <span className="text-[var(--prompt-host)]">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="ml-1 flex-1 bg-transparent text-[var(--prompt-input)] caret-[var(--header-glow)] outline-none"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  aria-label="Terminal Input"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="border-t border-brand-panelEdge bg-black/10 px-5 py-3 text-xs text-brand-muted">
            Designed from a terminal starter, rebuilt around real project history and portfolio content.
          </div>
        </div>

        <div className="flex items-center justify-between px-1 text-xs uppercase tracking-[0.22em] text-brand-muted">
          <div>Type `help` to explore</div>
          <div>Built for direct hire, consulting, and product collaboration</div>
        </div>
      </div>
    </div>
  );
}
