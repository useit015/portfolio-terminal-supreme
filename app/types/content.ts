import { CommandVisibility } from "./shared";

export interface PortfolioLink {
	label: string;
	href: string;
	display: string;
}

export interface IndexedLink {
	id: number;
	label: string;
	href: string;
	display: string;
}

export interface PortfolioSkillGroup {
	category: string;
	description?: string;
	items: string[];
}

export interface PortfolioExperienceEntry {
	company: string;
	role: string;
	period: string;
	summary: string;
	bullets: string[];
}

export interface PortfolioProject {
	id: number;
	name: string;
	tag: string;
	description: string;
	stack: string[];
	outcome: string;
	link: string;
}

export interface EducationEntry {
	degree: string;
	institution: string;
	period: string;
	detail: string;
}

export interface ThemeTokens {
	background: string;
	foreground: string;
	panel: string;
	panelEdge: string;
	panelInset: string;
	pageGlow: string;
	pageShine: string;
	surfaceSheen: string;
	accent: string;
	accentSoft: string;
	muted: string;
	promptUser: string;
	promptHost: string;
	promptInput: string;
	headerGlow: string;
	chromeClose: string;
	chromeMinimize: string;
	chromeMaximize: string;
	shadow: string;
	scanline: string;
	fontStack: string;
}

export interface ThemePreset {
	name: string;
	label: string;
	description: string;
	tokens: ThemeTokens;
}

export interface WelcomeContent {
	ascii: string[];
	avatarAscii: string[];
	mobileAscii: string[];
	introLines: string[];
	version: string;
}

export interface NowContent {
	headline: string;
	buildMode: string;
	summary: string;
	bullets: string[];
}

export interface ValueEntry {
	title: string;
	detail: string;
}

export interface StatEntry {
	value: string;
	label: string;
	detail: string;
}

export interface SourceOfTruthContent {
	headline: string;
	summary: string;
	bullets: string[];
}

export interface LabEntry {
	name: string;
	status: string;
	detail: string;
	stack: string[];
}

export interface TextBlock {
	title: string;
	lines: string[];
}

export interface VirtualFsNode {
	name: string;
	path: string;
	type: "dir" | "file";
	description: string;
	renderKey?: string;
	visibility?: CommandVisibility;
}

export interface EasterEggContent {
	hints: string[];
	fortyTwo: TextBlock;
	morocco: TextBlock;
	hireMe: TextBlock;
	souk: TextBlock;
	rescue: TextBlock;
}

export interface PortfolioContent {
	identity: {
		title: string;
		username: string;
		hostname: string;
		name: string;
		role: string;
		location: string;
		intro: string;
		summary: string;
		availability: string;
		email: string;
		guiUrl: string;
		homePath: string;
		whoami: string;
	};
	welcome: WelcomeContent;
	links: PortfolioLink[];
	socials: IndexedLink[];
	highlights: string[];
	skills: PortfolioSkillGroup[];
	experience: PortfolioExperienceEntry[];
	education: EducationEntry[];
	projects: PortfolioProject[];
	now: NowContent;
	values: ValueEntry[];
	stats: StatEntry[];
	sourceOfTruth: SourceOfTruthContent;
	lab: {
		summary: string;
		entries: LabEntry[];
	};
	filesystem: VirtualFsNode[];
	easterEggs: EasterEggContent;
	themePresets: ThemePreset[];
	defaultTheme: string;
}
