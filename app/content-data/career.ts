import {
	EducationEntry,
	LabEntry,
	PortfolioExperienceEntry,
	PortfolioProject,
} from "../types";

export const experience: PortfolioExperienceEntry[] = [
	{
		company: "Independent",
		role: "AI Developer & Researcher",
		period: "Oct 2024 - Present",
		summary:
			"Building AI developer tools, experimental web software, and real-time interactive systems.",
		bullets: [
			"Built whichmodel, an open-source TypeScript CLI for choosing AI models across providers.",
			"Built souk-fighter, a browser fighting game with Pixi.js 8, React 19, and Tailwind 4.",
			"Kept exploring 3D engine work and public-safe Web3 tooling curiosity.",
		],
	},
	{
		company: "Acurai",
		role: "Senior Software Developer",
		period: "Jan 2025 - Jun 2025",
		summary:
			"Shipped the main front-end product surface for an AI startup focused on reducing hallucinations.",
		bullets: [
			"Owned and shipped Chat, Wiki, and Brain Builder.",
			"Worked across TypeScript, Next.js, Node.js, and AI integration workflows.",
		],
	},
	{
		company: "LendStack",
		role: "Co-Founder & CTO",
		period: "Oct 2023 - May 2024",
		summary:
			"Co-founded a microfinance operating system and led the technical side from zero to live pilots.",
		bullets: [
			"Led a 9-person engineering team inside a 14-person startup.",
			"Shipped to 2 live pilot clients in Zambia with 12 prospects in the pipeline.",
			"Owned architecture across Next.js, Node.js microservices, KYC, OCR, and AI-assisted workflows.",
		],
	},
	{
		company: "Toptal Clients",
		role: "Senior Software Engineer",
		period: "Apr 2022 - Oct 2024",
		summary:
			"Delivered 8 engagements for clients including Blue River Technology, Axion Ray, and What’s Next Media.",
		bullets: [
			"Built Clicky Clicky for Blue River’s See & Spray workflow.",
			"Handled rescue-style fixes, migrations, and delivery pressure across unfamiliar codebases.",
			"Built data-visualization experiences and backend integrations for connected-economy reporting.",
		],
	},
	{
		company: "VO2 Group",
		role: "Senior Software Engineer",
		period: "Jan 2021 - Jan 2022",
		summary:
			"Delivered enterprise software across healthcare and health-tech products.",
		bullets: [
			"Solo-built the Radiometer Course Creator on React, Node.js, TypeScript, AWS SAM, and PostgreSQL.",
			"Led a 3-engineer team on AXA Health Keeper and its migration from Quasar/Vue to React and React Native.",
		],
	},
];

export const education: EducationEntry[] = [
	{
		degree: "42 Senior Degree in Computer Science",
		institution: "1337 (42 Network), Khouribga, Morocco",
		period: "2018 - 2023",
		detail:
			"Peer-reviewed, project-based computer science program with strong low-level systems, Unix, networking, and algorithmic foundations.",
	},
	{
		degree:
			"European Bachelor’s Degree in Computer Science: Networks and Security",
		institution: "FEDE, Mohammedia, Morocco",
		period: "2014 - 2015",
		detail:
			"European-accredited program covering network architecture, TCP/IP stack fundamentals, cryptography, and systems security. The curriculum ran alongside early web projects that turned into the real education.",
	},
];

export const projects: PortfolioProject[] = [
	{
		id: 1,
		name: "whichmodel",
		tag: "open source",
		description:
			"A TypeScript CLI for choosing the right AI model across OpenRouter, FAL, and Replicate.",
		stack: ["TypeScript", "Node.js", "OpenRouter", "Replicate", "FAL"],
		outcome: "MIT licensed. v1.0.0. 90+ commits.",
		link: "https://github.com/useit015/whichmodel",
	},
	{
		id: 2,
		name: "souk-fighter",
		tag: "game-tech",
		description:
			"A browser fighting game with a custom asset format, character tooling, and fixed-timestep engine.",
		stack: ["React 19", "Pixi.js 8", "Tailwind CSS 4", "IndexedDB"],
		outcome: "A strong example of engine work, gameplay systems, and UI craft.",
		link: "https://github.com/useit015/souk-fighter",
	},
	{
		id: 3,
		name: "Radiometer Course Creator",
		tag: "enterprise health-tech",
		description:
			"A course-authoring platform for Radiometer’s AQURE healthcare ecosystem.",
		stack: ["React", "Node.js", "TypeScript", "AWS SAM", "PostgreSQL"],
		outcome: "Built solo and helped close a six-figure enterprise deal.",
		link: "https://github.com/useit015",
	},
	{
		id: 4,
		name: "Clicky Clicky",
		tag: "computer vision ops",
		description:
			"A labeling tool and dashboard for See & Spray ground-truth collection.",
		stack: ["React", "NestJS", "MongoDB", "Docker", "Leaflet", "AWS"],
		outcome: "Built for Blue River Technology as part of a Toptal engagement.",
		link: "https://github.com/useit015",
	},
];

export const lab: { summary: string; entries: LabEntry[] } = {
	summary:
		"The lab is where I keep the work that proves range: not every build needs to be monetized to be technically serious.",
	entries: [
		{
			name: "whichmodel",
			status: "Active",
			detail:
				"Open-source CLI for choosing AI models across providers. Built because model choice was getting noisy and repetitive.",
			stack: ["TypeScript", "Node.js", "OpenRouter", "Replicate", "FAL"],
		},
		{
			name: "souk-fighter",
			status: "Playable",
			detail:
				"KOF-style browser fighting game with custom asset packs, IndexedDB persistence, and a fixed-timestep engine.",
			stack: ["React 19", "Pixi.js 8", "Tailwind CSS 4", "IndexedDB"],
		},
		{
			name: "3D exploration",
			status: "Experimental",
			detail:
				"Ongoing Three.js research to understand the edges of web-based game engines and graphics tooling.",
			stack: ["Three.js", "TypeScript", "Web graphics"],
		},
		{
			name: "Web3 / blockchain curiosity",
			status: "Long-running",
			detail:
				"Hands-on technical exposure since 2017 through tooling experiments, protocol curiosity, and ecosystem research.",
			stack: ["Web3.js", "Solidity", "Blockchain"],
		},
	],
};
