"use client";

import { useEffect, useState } from "react";
import content from "../content";
import {
	getThemePreset,
	getThemeStyle,
	THEME_STYLE_KEYS,
} from "../utils/theme";
import Terminal from "./Terminal";

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

	return (
		<main
			className="h-full overflow-hidden bg-brand-background text-brand-foreground"
			data-testid="app-shell"
			style={themeStyle}
		>
			<Terminal
				activeThemeName={activeThemeName}
				content={content}
				onThemeChange={setActiveThemeName}
			/>
		</main>
	);
}
