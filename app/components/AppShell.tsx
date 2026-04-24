"use client";

import { useEffect, useState } from "react";
import content from "../content";
import {
	getThemePreset,
	getThemeStyle,
	THEME_STYLE_KEYS,
} from "../utils/theme";
import Terminal from "./Terminal";

const CONSOLE_ASCII = content.welcome.ascii.join("\n");

export default function AppShell() {
	const [activeThemeName, setActiveThemeName] = useState(content.defaultTheme);
	const activeTheme = getThemePreset(content, activeThemeName);
	const themeStyle = getThemeStyle(activeTheme.tokens);

	useEffect(() => {
		const rootStyle = document.documentElement.style;

		for (const key of THEME_STYLE_KEYS) {
			const value = themeStyle[key];
			if (typeof value === "string") {
				rootStyle.setProperty(key, value);
			}
		}

		return () => {
			for (const key of THEME_STYLE_KEYS) {
				rootStyle.removeProperty(key);
			}
		};
	}, [themeStyle]);

	useEffect(() => {
		console.log(
			`%c${CONSOLE_ASCII}`,
			"color:#3fb950;background:#0d1117;font-family:'Courier New',monospace;font-size:7px;line-height:9px;padding:4px 0;display:block;",
		);
		console.log(
			"%coussama%c@%cterminal",
			"color:#58a6ff;font-weight:bold;font-size:14px;font-family:monospace;",
			"color:#8b949e;font-size:14px;font-family:monospace;",
			"color:#7ee787;font-weight:bold;font-size:14px;font-family:monospace;",
		);
		console.log(
			"%cYou found the console. That's the right instinct.",
			"color:#8b949e;font-size:12px;",
		);
		console.log(
			"%c→  useit015@gmail.com",
			"color:#3fb950;font-size:12px;font-family:monospace;",
		);
		console.log(
			"%c→  github.com/useit015",
			"color:#3fb950;font-size:12px;font-family:monospace;",
		);
		console.log(
			"%c─────────────────────────────────────────────────",
			"color:#30363d;font-size:12px;",
		);
		console.log(
			"%cTry `neofetch` in the terminal. Or just keep digging.",
			"color:#8b949e;font-size:11px;font-style:italic;",
		);
	}, []);

	return (
		<main
			className="h-full overflow-hidden bg-brand-background text-brand-foreground"
			data-testid="app-shell"
			style={themeStyle}
			aria-label="Terminal interface"
		>
			<Terminal
				activeThemeName={activeThemeName}
				content={content}
				onThemeChange={setActiveThemeName}
			/>
		</main>
	);
}
