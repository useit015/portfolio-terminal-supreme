"use client";

import { useEffect, useState } from "react";
import content from "../content";
import {
	chooseLandingTheme,
	readLandingTheme,
	writeLandingTheme,
} from "../utils/theme-rotation";
import {
	getThemePreset,
	getThemeStyle,
	THEME_STYLE_KEYS,
} from "../utils/theme";
import Terminal from "./Terminal";

const CONSOLE_ASCII = content.welcome.ascii.join("\n");

export default function AppShell() {
	const [activeThemeName, setActiveThemeName] = useState(content.defaultTheme);
	const themeNames = content.themePresets.map((theme) => theme.name);
	const activeTheme = getThemePreset(content, activeThemeName);
	const themeStyle = getThemeStyle(activeTheme.tokens);

	useEffect(() => {
		const previousLandingTheme = readLandingTheme(window.localStorage);
		const preHydratedTheme = document.documentElement.getAttribute("data-theme");
		const landingTheme =
			preHydratedTheme &&
			themeNames.includes(preHydratedTheme) &&
			preHydratedTheme === previousLandingTheme
				? preHydratedTheme
				: chooseLandingTheme(themeNames, previousLandingTheme);

		if (landingTheme) {
			setActiveThemeName(landingTheme);
			writeLandingTheme(window.localStorage, landingTheme);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		const { tokens } = activeTheme;
		const mono = "font-family:'Courier New',monospace;";

		console.log(
			`%c${CONSOLE_ASCII}`,
			`color:${tokens.accent};background:${tokens.background};${mono}font-size:7px;line-height:9px;padding:4px 0;display:block;`,
		);
		console.log(
			"%coussama%c@%cterminal",
			`color:${tokens.promptUser};font-weight:bold;font-size:14px;${mono}`,
			`color:${tokens.muted};font-size:14px;${mono}`,
			`color:${tokens.promptHost};font-weight:bold;font-size:14px;${mono}`,
		);
		console.log(
			"%cYou found the console. That's the right instinct.",
			`color:${tokens.muted};font-size:12px;`,
		);
		console.log(
			"%c→  useit015@gmail.com",
			`color:${tokens.accent};font-size:12px;${mono}`,
		);
		console.log(
			"%c→  github.com/useit015",
			`color:${tokens.accent};font-size:12px;${mono}`,
		);
		console.log(
			"%c─────────────────────────────────────────────────",
			`color:${tokens.panelEdge};font-size:12px;`,
		);
		console.log(
			"%cTry `neofetch` in the terminal. Or just keep digging.",
			`color:${tokens.muted};font-size:11px;font-style:italic;`,
		);
	}, [activeTheme]);

	const handleThemeChange = (themeName: string) => {
		setActiveThemeName(themeName);
		writeLandingTheme(window.localStorage, themeName);
	};

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
				onThemeChange={handleThemeChange}
			/>
		</main>
	);
}
