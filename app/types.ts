export interface PortfolioLink {
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
  name: string;
  tag: string;
  description: string;
  stack: string[];
  outcome: string;
  link: string;
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
  };
  banner: string[];
  boot: string[];
  links: PortfolioLink[];
  highlights: string[];
  skills: PortfolioSkillGroup[];
  experience: PortfolioExperienceEntry[];
  projects: PortfolioProject[];
  theme: {
    background: string;
    foreground: string;
    panel: string;
    panelEdge: string;
    accent: string;
    accentSoft: string;
    muted: string;
    promptUser: string;
    promptHost: string;
    promptInput: string;
    headerGlow: string;
    fontStack: string;
  };
}

export type CommandType =
  | 'help'
  | 'banner'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'clear'
  | 'error'
  | 'system';

export interface CommandOutput {
  type: CommandType;
  input: string;
  output: React.ReactNode;
}
