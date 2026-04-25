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
			"Building independent AI and product-engineering work across model tooling, browser games, and graphics experiments.",
		bullets: [
			"Authored whichmodel, an MIT-licensed TypeScript CLI for choosing AI models across OpenRouter, FAL, and Replicate.",
			"Built souk-fighter, a KOF-style browser fighting game with Pixi.js 8, React 19, Tailwind CSS 4, and a custom .sfpack asset format.",
			"Continuing Three.js and game-engine exploration while taking on selective product/client work.",
		],
	},
	{
		company: "Acurai",
		role: "Senior Software Engineer",
		period: "Jan 2025 - Jun 2025",
		summary:
			"Built the product UI for an AI startup focused on reducing hallucinations in large language models.",
		bullets: [
			"Shipped the front-end product surface across Chat, Wiki, and Brain Builder.",
			"Worked across TypeScript, Next.js, Node.js, and OpenAI-integrated workflows.",
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
			"Delivered 8 engagements across 7 clients including Blue River Technology, Axion Ray, What's Next Media, and Top Shelf Insurance.",
		bullets: [
			"Solo-built Clicky Clicky for Blue River's See & Spray ground-truth collection workflow.",
			"Built AI SaaS configuration tooling, connected-economy data visualization, insurance systems, and rescue fixes in codebases I did not write.",
			"Worked across React, Node.js, TypeScript, MongoDB, AWS, data visualization, image annotation, and backend integrations.",
		],
	},
	{
		company: "VO2 Group",
		role: "Senior Software Engineer",
		period: "Jan 2021 - Jan 2022",
		summary:
			"Shipped healthcare and health-tech software as the senior engineer on two products.",
		bullets: [
			"Solo-built the Radiometer Course Creator on React, Node.js, TypeScript, AWS SAM, and PostgreSQL as part of a six-figure enterprise deal.",
			"Led a 3-engineer rebuild of AXA Health Keeper and its migration from Quasar/Vue to React and React Native.",
			"Built an in-house JavaScript API layer for AQURE that saved about $20K per year in licensing.",
		],
	},
	{
		company: "Caronae Systems",
		role: "Senior Software Engineer",
		period: "Apr 2020 - Sep 2020",
		summary:
			"Led front-end work for a no-code KYC journey builder and owned identity-verification integrations.",
		bullets: [
			"Led a 3-engineer front-end team building journey-authoring workflows.",
			"Solo-built the runtime front end for JSON-defined verification journeys.",
			"Owned integrations for government ID recognition, face match, and liveness checks.",
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
			"European Bachelor's Degree in Computer Science: Networks and Security",
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
			"A TypeScript CLI that recommends the right AI model for a task across OpenRouter, FAL, and Replicate.",
		stack: ["TypeScript", "Node.js", "OpenRouter", "Replicate", "FAL"],
		outcome: "MIT licensed. v1.0.0. 90+ commits.",
		link: "https://github.com/useit015/whichmodel",
	},
	{
		id: 2,
		name: "souk-fighter",
		tag: "game-tech",
		description:
			"A KOF-style browser fighting game with a custom .sfpack bundle format, character tooling, and fixed-timestep engine.",
		stack: ["React 19", "Pixi.js 8", "Tailwind CSS 4", "IndexedDB"],
		outcome: "Shows engine work, gameplay systems, asset tooling, and UI craft.",
		link: "https://github.com/useit015/souk-fighter",
	},
	{
		id: 3,
		name: "Radiometer Course Creator",
		tag: "enterprise health-tech",
		description:
			"A course-authoring platform for Radiometer's AQURE healthcare ecosystem, solo-built end to end.",
		stack: ["React", "Node.js", "TypeScript", "AWS SAM", "PostgreSQL"],
		outcome: "Delivered as part of a six-figure enterprise deal.",
		link: "https://www.toptal.com/developers/resume/oussama-nahiz",
	},
	{
		id: 4,
		name: "Clicky Clicky",
		tag: "computer vision ops",
		description:
			"A labeling tool and dashboard for Blue River Technology's See & Spray boom-height ground-truth workflow.",
		stack: ["React", "NestJS", "MongoDB", "Docker", "Leaflet", "AWS"],
		outcome: "Solo-built for Blue River Technology, a John Deere-acquired agricultural AI company.",
		link: "https://www.toptal.com/developers/resume/oussama-nahiz",
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
