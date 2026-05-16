import {
	EducationEntry,
	LabEntry,
	PortfolioExperienceEntry,
	PortfolioProject,
} from "../types";

export const experience: PortfolioExperienceEntry[] = [
	{
		company: "Acurai",
		role: "Senior Software Engineer",
		period: "Jan 2025 - Jun 2025",
		website: "https://acur.ai/",
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
		website: "https://www.linkedin.com/company/lendstack",
		summary:
			"Co-founded a microfinance operating system and led the technical side from zero to live pilots.",
		bullets: [
			"Led a 9-person engineering team inside a 14-person startup.",
			"Shipped to 2 live pilot clients in Zambia with 12 prospects in the pipeline.",
			"Owned architecture across Next.js, Node.js microservices, KYC, OCR, and AI-assisted workflows.",
		],
	},
	{
		company: "Toptal",
		role: "Senior Software Engineer",
		period: "Apr 2022 - Oct 2024",
		website: "https://www.toptal.com/",
		summary:
			"Worked through Toptal across 8 engagements and 7 clients over 30 months, spanning agricultural AI, insurance, media, fintech, data visualization, and AI SaaS.",
		bullets: [
			"Delivered senior full-stack work across React, Node.js, TypeScript, MongoDB, AWS, and data-visualization stacks.",
			"Worked with clients including Blue River Technology, Axion Ray, What's Next Media, Top Shelf Insurance, DSF OpCo, Amina El Abed, and iTech Insurance.",
			"Delivered several engagements in parallel with startup and product leadership work.",
		],
	},
	{
		company: "Axion Ray",
		role: "Senior Software Engineer",
		period: "May 2024 - Oct 2024",
		website: "https://www.axion.com/",
		summary:
			"Built AI-powered SaaS configuration tooling for the data-operations module as part of a small product-focused team.",
		bullets: [
			"Built reusable UI components including checkboxes, file uploaders, and radio controls.",
			"Wired backend integrations into the React front end on a Node.js and MongoDB stack.",
			"Delivered features across a React, TypeScript, Node.js, and MongoDB codebase.",
		],
	},
	{
		company: "What's Next Media",
		role: "Senior Software Engineer",
		period: "Sep 2023 - Jan 2024",
		website: "https://www.pymnts.com/",
		summary:
			"Built interactive data products for reporting on payments and the connected economy.",
		bullets: [
			"Built interactive data-visualization components in React.",
			"Implemented server-side Node.js work with SQL, MongoDB, and third-party APIs.",
			"Shipped editorial-grade visualizations designed for readability and reuse.",
		],
	},
	{
		company: "Blue River Technology",
		role: "Senior Software Engineer",
		period: "Apr 2022 - Aug 2022",
		website: "https://www.bluerivertechnology.com/",
		summary:
			"Built tooling for See & Spray computer-vision ground-truth data collection at the John Deere-acquired agricultural AI company.",
		bullets: [
			"Solo-built Clicky Clicky, a web labeling tool for See & Spray boom-height data collection.",
			"Built the dashboard for creating jobs, assigning work, and collecting labeling results.",
			"Deployed the tooling and validated output against Radar measurements.",
			"Migrated the Spyglass platform from vanilla JavaScript to React while fixing existing bugs.",
		],
	},
	{
		company: "VO2 Group",
		role: "Senior Software Engineer",
		period: "Jan 2021 - Jan 2022",
		website: "https://www.vo2-group.com/",
		summary:
			"Shipped healthcare and health-tech software as the senior engineer on two products.",
		bullets: [
			"Solo-built the Radiometer Course Creator on React, Node.js, TypeScript, AWS SAM, and PostgreSQL as part of a six-figure enterprise deal.",
			"Led a 3-engineer rebuild of AXA Health Keeper and its migration from Quasar/Vue to React and React Native.",
			"Built an in-house JavaScript API layer for AQURE that saved about $20K per year in licensing.",
		],
	},
	{
		company: "Spotbills",
		role: "Full-stack Developer",
		period: "Sep 2020 - Dec 2020",
		website: "https://www.linkedin.com/company/spotbills/",
		summary:
			"Built real-time communication infrastructure for Peer, a hybrid mobile chat, file-sharing, and audio/video calling app.",
		bullets: [
			"Built the signaling server with NestJS, TypeScript, Redis, MongoDB, Socket.IO, and WebRTC.",
			"Participated in architecture, development, testing, and deployment for the Flutter-based mobile app.",
			"Helped the team launch on schedule.",
		],
	},
	{
		company: "Caronae Systems",
		role: "Senior Software Engineer",
		period: "Apr 2020 - Sep 2020",
		website: "https://caronae.com/",
		summary:
			"Led front-end work for a no-code KYC journey builder and owned identity-verification integrations.",
		bullets: [
			"Led a 3-engineer front-end team building journey-authoring workflows.",
			"Solo-built the runtime front end for JSON-defined verification journeys.",
			"Owned integrations for government ID recognition, face match, and liveness checks.",
		],
	},
	{
		company: "SQLI Digital Experience",
		role: "Senior Software Engineer",
		period: "Feb 2020 - Jul 2020",
		website: "https://www.sqli.com/",
		summary:
			"Worked on the global Nespresso eCommerce platform inside a large multi-team delivery environment.",
		bullets: [
			"Implemented a checkout flow that let customers buy products without completing full account registration.",
			"Wrote Jest and Enzyme tests for shipped features.",
			"Helped modernize older AngularJS and jQuery parts of the codebase.",
		],
	},
	{
		company: "Independent / Freelance",
		role: "Full-stack Developer",
		period: "May 2016 - Dec 2019",
		summary:
			"Delivered client web projects before the later senior, startup, and Toptal chapters.",
		bullets: [
			"Built websites, landing pages, WordPress builds, Shopify storefronts, web portals, and internal tools.",
			"Worked across PHP, Node.js, MySQL, Vue, React, WordPress, and Shopify depending on client needs.",
			"Handled scoping, delivery, and direct client communication for local and international clients.",
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
		name: "Open Design",
		tag: "ai design tooling",
		description:
			"A local-first design-agent product that connects coding-agent CLIs, design systems, and sandboxed previews into a deployable workflow.",
		stack: ["TypeScript", "Local daemon", "Web app", "SQLite", "Design systems"],
		outcome: "Open-source product surface with public repository proof.",
		link: "https://github.com/nexu-io/open-design",
	},
	{
		id: 3,
		name: "Sigil",
		tag: "creator tools",
		description:
			"A creator studio for converting video and images into shareable ASCII previews, with a studio UI, player packages, CLI automation, and Rust conversion tooling.",
		stack: ["Next.js", "React", "TypeScript", "Rust", "Supabase"],
		outcome: "329+ commits locally across studio, player, CLI, and conversion layers.",
	},
	{
		id: 4,
		name: "Asset Forge",
		tag: "ai game assets",
		description:
			"A full-stack asset-generation tool for game and character assets, with auth, storage, fal.ai generation, and quality-analysis workflows.",
		stack: ["React", "Vite", "Express", "TypeScript", "Supabase", "Cloudflare R2"],
		outcome: "Full product slice across frontend, backend, persistence, and media pipelines.",
	},
	{
		id: 5,
		name: "souk-fighter",
		tag: "game-tech",
		description:
			"A KOF-style browser fighting game with a custom .sfpack bundle format, character tooling, and fixed-timestep engine.",
		stack: ["React 19", "Pixi.js 8", "Tailwind CSS 4", "IndexedDB"],
		outcome: "Shows engine work, gameplay systems, asset tooling, and UI craft.",
		link: "https://github.com/useit015/souk-fighter",
	},
	{
		id: 6,
		name: "Radiometer Course Creator",
		tag: "enterprise health-tech",
		description:
			"A course-authoring platform for Radiometer's AQURE healthcare ecosystem, solo-built end to end.",
		stack: ["React", "Node.js", "TypeScript", "AWS SAM", "PostgreSQL"],
		outcome: "Delivered as part of a six-figure enterprise deal.",
		link: "https://www.toptal.com/developers/resume/oussama-nahiz",
	},
	{
		id: 7,
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
		"The lab is where I keep active tooling and experiments that show range before they become lead portfolio pieces.",
	entries: [
		{
			name: "Scripter + script-tool",
			status: "Active",
			detail:
				"Research & Script Terminal UI backed by a TypeScript generation CLI with prompt regression evals and structured API envelopes.",
			stack: ["Next.js", "TypeScript", "Promptfoo", "Provider APIs"],
		},
		{
			name: "Sigil production previews",
			status: "Active",
			detail:
				"Feature work around instant production preview flows for ASCII video and image conversion.",
			stack: ["Next.js", "React", "Rust", "Supabase"],
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
				"Ongoing Three.js and web-graphics research to understand the edges of browser game engines and tooling.",
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
