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

export type CommandVisibility = 'public' | 'hinted' | 'hidden';
export type CommandCategory =
  | 'profile'
  | 'work'
  | 'shell'
  | 'navigation'
  | 'play';

export interface VirtualFsNode {
  name: string;
  path: string;
  type: 'dir' | 'file';
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
  lab: {
    summary: string;
    entries: LabEntry[];
  };
  filesystem: VirtualFsNode[];
  easterEggs: EasterEggContent;
  themePresets: ThemePreset[];
  defaultTheme: string;
}

export type CommandName =
  | '42'
  | 'about'
  | 'cat'
  | 'cd'
  | 'clear'
  | 'echo'
  | 'education'
  | 'email'
  | 'experience'
  | 'grep'
  | 'gui'
  | 'help'
  | 'history'
  | 'lab'
  | 'ls'
  | 'man'
  | 'morocco'
  | 'now'
  | 'projects'
  | 'pwd'
  | 'rescue'
  | 'resume'
  | 'skills'
  | 'socials'
  | 'souk'
  | 'stats'
  | 'sudo'
  | 'themes'
  | 'tree'
  | 'values'
  | 'welcome'
  | 'whoami';

export interface CommandDescriptor {
  name: CommandName;
  description: string;
  category: CommandCategory;
  visibility: CommandVisibility;
  usage: string;
  examples: string[];
  aliases?: string[];
}

export type ParsedCommandStatus =
  | 'empty'
  | 'valid'
  | 'usage'
  | 'not-found'
  | 'error';

export interface ParsedCommand {
  raw: string;
  normalized: string;
  command: CommandName | null;
  args: string[];
  status: ParsedCommandStatus;
  usage?: string;
  errorMessage?: string;
  resolvedPath?: string;
  subject?: string;
}

export interface ShellState {
  currentPath: string;
}

export interface CommandRenderContext {
  history: string[];
  currentPath: string;
}

export interface CommandEntry {
  input: string;
  parsed: ParsedCommand;
  output: React.ReactNode;
  promptPath: string;
}
