import { CSSProperties } from "react";
import { PortfolioContent, ThemePreset } from "../types";

export const THEME_STYLE_KEYS = [
	"--bg-color",
	"--fg-color",
	"--panel-color",
	"--panel-edge",
	"--panel-inset",
	"--page-glow",
	"--page-shine",
	"--surface-sheen",
	"--accent-color",
	"--accent-soft",
	"--muted-color",
	"--prompt-user",
	"--prompt-host",
	"--prompt-input",
	"--header-glow",
	"--chrome-close",
	"--chrome-minimize",
	"--chrome-maximize",
	"--shadow-color",
	"--scanline-color",
	"--font-stack",
] as const;

type ThemeStyleKey = (typeof THEME_STYLE_KEYS)[number];
export type ThemeStyle = CSSProperties & Record<ThemeStyleKey, string>;

export const getThemeByName = (
	content: PortfolioContent,
	name: string,
): ThemePreset | undefined =>
	content.themePresets.find((theme) => theme.name === name);

export const getThemePreset = (
	content: PortfolioContent,
	themeName: string,
): ThemePreset => getThemeByName(content, themeName) ?? content.themePresets[0];

export const getThemeStyle = (theme: ThemePreset["tokens"]): ThemeStyle =>
	({
		"--bg-color": theme.background,
		"--fg-color": theme.foreground,
		"--panel-color": theme.panel,
		"--panel-edge": theme.panelEdge,
		"--panel-inset": theme.panelInset,
		"--page-glow": theme.pageGlow,
		"--page-shine": theme.pageShine,
		"--surface-sheen": theme.surfaceSheen,
		"--accent-color": theme.accent,
		"--accent-soft": theme.accentSoft,
		"--muted-color": theme.muted,
		"--prompt-user": theme.promptUser,
		"--prompt-host": theme.promptHost,
		"--prompt-input": theme.promptInput,
		"--header-glow": theme.headerGlow,
		"--chrome-close": theme.chromeClose,
		"--chrome-minimize": theme.chromeMinimize,
		"--chrome-maximize": theme.chromeMaximize,
		"--shadow-color": theme.shadow,
		"--scanline-color": theme.scanline,
		"--font-stack": theme.fontStack,
	}) as ThemeStyle;
