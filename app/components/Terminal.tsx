'use client';

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Config, CommandOutput } from '../types';
import { processCommand, COMMANDS } from '../utils/commands';

interface TerminalProps {
  config: Config;
}

export default function Terminal({ config }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial banner
  useEffect(() => {
    const bannerOutput = processCommand('banner', config);
    const bootOutput = (
      <div className="mt-2 text-brand-foreground/80 space-y-1">
        <div>Boot sequence complete.</div>
        <div>Loading custom prompt and command registry...</div>
        <div className="mt-4">Type <span className="text-brand-link font-bold">help</span> to explore available commands.</div>
      </div>
    );

    setHistory([
      { type: 'banner', input: 'banner', output: bannerOutput },
      { type: 'system', input: 'system', output: bootOutput }
    ]);
    // Focus input on load
    inputRef.current?.focus();
  }, [config]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus
  const handleContainerClick = () => {
    // Only focus if user isn't selecting text
    if (!window.getSelection()?.toString()) {
      inputRef.current?.focus();
    }
  };

  const executeCommand = (cmd: string) => {
    if (cmd.trim() === '') {
      setHistory(prev => [...prev, { type: 'error', input: '', output: null }]);
      return;
    }

    if (cmd.trim().toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    const output = processCommand(cmd, config);
    setHistory(prev => [...prev, { type: 'success' as any, input: cmd, output }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
      setHistoryIndex(-1);
      setDraftInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find(c => c.name.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match.name);
      }
    } else if (e.key === 'Escape' || (e.key === 'c' && e.ctrlKey)) {
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex === -1) {
        // Save current draft before moving up
        setDraftInput(input);
        // Find last real command input from history
        const lastCmdIndex = history.length - 1;
        if (lastCmdIndex >= 0) {
          setHistoryIndex(lastCmdIndex);
          setInput(history[lastCmdIndex].input);
        }
      } else {
        const nextIndex = historyIndex - 1;
        if (nextIndex >= 0) {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex].input);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex].input);
        } else {
          // Restore draft
          setHistoryIndex(-1);
          setInput(draftInput);
        }
      }
    }
  };

  // Inject CSS variables
  const style = {
    '--bg-color': config.theme.colors.background,
    '--fg-color': config.theme.colors.foreground,
    '--banner-color': config.theme.colors.banner,
    '--link-color': config.theme.colors.link.text,
    '--link-highlight': config.theme.colors.link.highlightColor,
    '--link-highlight-text': config.theme.colors.link.highlightText,
    '--prompt-user': config.theme.colors.prompt.user,
    '--prompt-host': config.theme.colors.prompt.host,
    '--prompt-input': config.theme.colors.prompt.input,
    '--font-family': config.theme.colors.foreground, // Wait, this should be font family
    '--font-stack': config.theme.font.family,
  } as React.CSSProperties;

  return (
    <div 
      className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-white font-mono"
      style={style}
      onClick={handleContainerClick}
    >
      <div className="w-full max-w-4xl h-[80vh] md:h-[600px] border-2 border-black flex flex-col bg-[var(--bg-color)] text-[var(--fg-color)] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        
        {/* Header Bar */}
        <div className="h-8 border-b-2 border-black flex items-center px-4 gap-2 shrink-0 bg-white">
          <div className="flex gap-2 group">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-black group-hover:bg-red-600"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black group-hover:bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 border border-black group-hover:bg-green-600"></div>
          </div>
          <div className="flex-1 text-center text-sm font-bold uppercase tracking-widest hidden sm:block">
            {config.identity.username}@{config.identity.hostname}
          </div>
          <div className="text-xs font-bold border border-black px-2 py-0.5 rounded-sm bg-red-600 text-white">
            BASH
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide" ref={containerRef}>
          {history.map((entry, i) => (
            <div key={i} className="animate-fade-in">
              {entry.type !== 'banner' && entry.type !== 'system' && (
                <div className="flex gap-2 items-center mb-1 text-sm md:text-base">
                  <span className="text-[var(--prompt-user)] font-bold">{config.identity.username}</span>
                  <span className="text-[var(--prompt-host)]">@</span>
                  <span className="text-[var(--prompt-host)] font-bold">{config.identity.hostname}</span>
                  <span className="text-[var(--prompt-host)]">$</span>
                  <span className="text-[var(--prompt-input)] ml-1">{entry.input}</span>
                </div>
              )}
              <div className="ml-0 md:ml-4 leading-relaxed overflow-x-hidden">
                {entry.output}
              </div>
            </div>
          ))}
          
          {/* Current Input */}
          <div className="flex gap-2 items-center text-sm md:text-base">
            <span className="text-[var(--prompt-user)] font-bold">{config.identity.username}</span>
            <span className="text-[var(--prompt-host)]">@</span>
            <span className="text-[var(--prompt-host)] font-bold">{config.identity.hostname}</span>
            <span className="text-[var(--prompt-host)]">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[var(--prompt-input)] ml-1 caret-[var(--banner-color)]"
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
      
      {/* Decorative Box Logo-ish */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-red-600 text-white px-2 py-1 font-bold italic tracking-tighter text-lg rotate-[-5deg] border-2 border-black pointer-events-none select-none hidden md:block">
        SUPREME TERMINAL
      </div>
    </div>
  );
}
