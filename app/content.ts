import { PortfolioContent } from "./types";

const monoFontStack =
	'"IBM Plex Mono", "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace';

const content: PortfolioContent = {
	identity: {
		title: "Oussama Nahiz | Terminal Portfolio",
		username: "oussama",
		hostname: "terminal",
		name: "Oussama Nahiz",
		role: "Senior Full-Stack Engineer",
		location: "Casablanca Metropolitan Area, Morocco",
		intro:
			"Senior full-stack engineer and 42-grad with 9+ years shipping production software across React, Node.js, TypeScript, and AI.",
		summary:
			"I work best on end-to-end product problems: architecture, infrastructure, front end, testing, deployment, and the messy delivery work around them.",
		availability:
			"Open to senior, staff, and founding engineer roles, plus selective consulting where I can own a meaningful slice of product delivery.",
		email: "useit015@gmail.com",
		guiUrl: "https://linkedin.com/in/useit015",
		homePath: "/home/oussama/portfolio",
		whoami: "visitor",
	},
	welcome: {
		ascii: [
			"                                                                  .__    .__        ",
			"  ____  __ __  ______ ___________    _____ _____      ____ _____  |  |__ |__|_______",
			" /  _ \\|  |  \\/  ___//  ___/\\__  \\  /     \\\\__  \\    /    \\\\__  \\ |  |  \\|  \\___   /",
			"(  <_> )  |  /\\___ \\ \\___ \\  / __ \\|  Y Y  \\/ __ \\_ |   |  \\/ __ \\|   Y  \\  |/    / ",
			" \\____/|____//____  >____  >(____  /__|_|  (____  / |___|  (____  /___|  /__/_____ \\",
			"                  \\/     \\/      \\/      \\/     \\/       \\/     \\/     \\/         \\/",
		],
		avatarAscii: [
			"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
			"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
			"^^^^^^^^^^^^^```````````^^^^^^^^^^^^^^^^",
			'^^^^^^^^^^^^^```"I;I;I"^``^^^^^^^^^^^^^^',
			'^^^^^^^^^`^``^!!"````^,il```^^^^^^^^^^^^',
			'^^^^^^^^^^^^`<,`^^`````^"!^``^^^^^^^^^^^',
			"^^^^^^^^````i,```````````I^````^^^^^^^^^",
			'^^^^^^^`````_!rpC~":rdZY+l;`````^^^^^^^^',
			"^^^^^^``````1|lYt1jr~[r!1-~~```^^^^^^^^^",
			'^^^^^^^````^<j!Il}";-;I+_}>?````^`^^^^^^',
			'^^^^^^``````i}``"?]-~```:u[^`````^^^^^^^',
			"^^````^^`````a]iJbQQbm?IZq,`````^^^^^^`^",
			"^^^^^^^`^````\\#M?~}{+lJkWr^````^^^^^^^^^",
			"^^^^^^^^`````,qMk{Zk1x&MaC;````````^^^^^",
			"^^^^^^^^^^```^}o*o8%%8*q!w&<``````^^^^^^",
			"^^^^^``````^<nkzq*%%**\\,Q$$&o|i^````````",
			'^`^^^```:upa%Y8j^^I;"`,m$$$&8Wh8p}^`````',
			"^^^``:C@&#@B8$*&?^```!dB@hMo%$$$@aaori^`",
			"````l*$$$$$$$$@*d]^`^zp8$$$$$$$$$$$$Mbb~",
			"```:OoW$$$$$$$$$8J,ImMo$$$$$$$$$$$$WW$$&",
			"```[8Zo@h$$$$$$$$$|Z*@$$$$$$$$$$$$B*$$$$",
			"```x$#k%$$$$$$$$$BdB$$$$$$$$$$$$$$b$$$$$",
		],
		mobileAscii: [
			"  ____                              ",
			" / __ \\__  ______________ _____ _   ",
			"/ / / / / / / ___/ ___/ __ `/ __ `/ ",
			"/ /_/ / /_/ (__  |__  ) /_/ / /_/ / ",
			"\\____/\\__,_/____/____/\\__,_/\\__,_/  ",
		],
		introLines: [
			"Terminal portfolio. Version 1.0.0.",
			"Try `ls`, `tree`, or `grep react`. `help` shows the public surface. Curiosity handles the rest.",
		],
		version: "1.0.0",
	},
	links: [
		{
			label: "Email",
			href: "mailto:useit015@gmail.com",
			display: "useit015@gmail.com",
		},
		{
			label: "GitHub",
			href: "https://github.com/useit015",
			display: "github.com/useit015",
		},
		{
			label: "LinkedIn",
			href: "https://linkedin.com/in/useit015",
			display: "linkedin.com/in/useit015",
		},
		{
			label: "Toptal",
			href: "https://www.toptal.com/developers/resume/oussama-nahiz",
			display: "toptal.com/developers/resume/oussama-nahiz",
		},
	],
	socials: [
		{
			id: 1,
			label: "GitHub",
			href: "https://github.com/useit015",
			display: "github.com/useit015",
		},
		{
			id: 2,
			label: "LinkedIn",
			href: "https://linkedin.com/in/useit015",
			display: "linkedin.com/in/useit015",
		},
		{
			id: 3,
			label: "Toptal",
			href: "https://www.toptal.com/developers/resume/oussama-nahiz",
			display: "toptal.com/developers/resume/oussama-nahiz",
		},
	],
	highlights: [
		"Solo-built the Radiometer Course Creator and helped close a six-figure enterprise deal.",
		"Led a 9-person engineering team as co-founder and CTO at LendStack.",
		"Delivered 8 Toptal engagements across healthcare, insurance, media, agritech, and AI.",
	],
	skills: [
		{
			category: "Core stack",
			items: [
				"TypeScript",
				"JavaScript",
				"React",
				"Next.js",
				"Node.js",
				"HTML/CSS",
			],
		},
		{
			category: "Backend and data",
			items: [
				"NestJS",
				"Express",
				"PostgreSQL",
				"MongoDB",
				"Redis",
				"REST APIs",
			],
		},
		{
			category: "Cloud and delivery",
			items: ["AWS SAM", "Lambda", "API Gateway", "S3", "Docker", "CI/CD"],
		},
		{
			category: "AI and ML-adjacent",
			items: [
				"OpenAI APIs",
				"OpenRouter",
				"Replicate",
				"FAL",
				"annotation workflows",
				"OCR/KYC flows",
			],
		},
		{
			category: "Breadth signals",
			items: [
				"React Native",
				"Pixi.js 8",
				"Three.js",
				"WebRTC",
				"Web3.js",
				"Unix/Linux",
			],
		},
	],
	experience: [
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
	],
	education: [
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
	],
	projects: [
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
			outcome:
				"A strong example of engine work, gameplay systems, and UI craft.",
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
			outcome:
				"Built for Blue River Technology as part of a Toptal engagement.",
			link: "https://github.com/useit015",
		},
	],
	now: {
		headline:
			"Shipping end-to-end product work while staying close to AI tooling, side projects, and game-engine experiments.",
		buildMode:
			"Best fit: senior, staff, or founding-engineer roles where one person needs to own the vertical slice and keep momentum high.",
		summary:
			"I am optimizing for teams that value technical depth, calm execution, and someone who can move from messy requirements to shipped software without waiting for perfect conditions.",
		bullets: [
			"Open to senior, staff, and founding engineer roles.",
			"Current public side work: whichmodel, souk-fighter, and ongoing 3D graphics exploration.",
			"Strongest in product teams that need both architecture judgment and hands-on delivery.",
		],
	},
	values: [
		{
			title: "Own the full product slice",
			detail:
				"My highest-value work tends to be end-to-end: architecture, infrastructure, front end, back end, testing, and shipping.",
		},
		{
			title: "Be the rescue engineer when it matters",
			detail:
				"I am comfortable walking into unfamiliar code under time pressure and turning it back into a working delivery lane.",
		},
		{
			title: "Build with constraints",
			detail:
				"Bootstrapped startup work, solo builds, and client delivery taught me to move with the conditions in front of me, not the ideal ones.",
		},
		{
			title: "Keep curiosity alive",
			detail:
				"I build some things because they should exist, and some things because I want to learn how they work.",
		},
	],
	stats: [
		{
			value: "9+",
			label: "years shipping product software",
			detail:
				"Across freelance work, enterprise teams, startups, and independent research.",
		},
		{
			value: "8",
			label: "Toptal engagements delivered",
			detail:
				"Healthcare, insurance, media, agritech, AI, and emergency fixes.",
		},
		{
			value: "2",
			label: "live Zambia pilot clients",
			detail:
				"LendStack reached production with 12 more prospects in the pipeline.",
		},
		{
			value: "1",
			label: "six-figure enterprise build",
			detail:
				"Radiometer Course Creator was solo-built and helped close the deal.",
		},
		{
			value: "42",
			label: "Network graduate",
			detail:
				"1337 / 42 provided the low-level systems foundation behind the breadth.",
		},
		{
			value: "9",
			label: "engineers led directly",
			detail: "At LendStack inside a 14-person startup.",
		},
	],
	lab: {
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
	},
	filesystem: [
		{
			name: "about",
			path: "/",
			type: "file",
			description: "overview + selected proof points",
			renderKey: "about",
		},
		{
			name: "now",
			path: "/",
			type: "file",
			description: "current focus and role target",
			renderKey: "now",
		},
		{
			name: "values",
			path: "/",
			type: "file",
			description: "working principles",
			renderKey: "values",
		},
		{
			name: "stats",
			path: "/",
			type: "file",
			description: "hard-number career anchors",
			renderKey: "stats",
		},
		{
			name: "skills",
			path: "/",
			type: "file",
			description: "stack map and technical breadth",
			renderKey: "skills",
		},
		{
			name: "experience",
			path: "/",
			type: "file",
			description: "full work history",
			renderKey: "experience",
		},
		{
			name: "education",
			path: "/",
			type: "file",
			description: "formal education history",
			renderKey: "education",
		},
		{
			name: "socials",
			path: "/",
			type: "file",
			description: "public profiles and contact routes",
			renderKey: "socials",
		},
		{
			name: "themes",
			path: "/",
			type: "file",
			description: "available full-app palettes",
			renderKey: "themes",
		},
		{
			name: "projects",
			path: "/",
			type: "dir",
			description: "selected shipped work",
		},
		{
			name: "lab",
			path: "/",
			type: "dir",
			description: "side projects and curiosity",
		},
		{
			name: "meta",
			path: "/",
			type: "dir",
			description: "shell guidance and landing copy",
		},
		{
			name: "whichmodel",
			path: "/projects",
			type: "file",
			description: "AI model selection CLI",
			renderKey: "project:1",
		},
		{
			name: "souk-fighter",
			path: "/projects",
			type: "file",
			description: "browser fighting game",
			renderKey: "project:2",
		},
		{
			name: "radiometer",
			path: "/projects",
			type: "file",
			description: "six-figure enterprise healthcare build",
			renderKey: "project:3",
		},
		{
			name: "clicky-clicky",
			path: "/projects",
			type: "file",
			description: "computer-vision operations tooling",
			renderKey: "project:4",
		},
		{
			name: "overview",
			path: "/lab",
			type: "file",
			description: "public lab notes",
			renderKey: "lab",
		},
		{
			name: "42",
			path: "/lab",
			type: "file",
			description: "why 42 matters here",
			renderKey: "42",
			visibility: "hinted",
		},
		{
			name: "morocco",
			path: "/lab",
			type: "file",
			description: "Casablanca, Mohammedia, Khouribga",
			renderKey: "morocco",
			visibility: "hinted",
		},
		{
			name: "souk",
			path: "/lab",
			type: "file",
			description: "game-dev detour",
			renderKey: "souk",
			visibility: "hidden",
		},
		{
			name: "rescue",
			path: "/lab",
			type: "file",
			description: "broken-codebase mode",
			renderKey: "rescue",
			visibility: "hidden",
		},
		{
			name: "welcome",
			path: "/meta",
			type: "file",
			description: "landing copy",
			renderKey: "welcome",
		},
		{
			name: "help",
			path: "/meta",
			type: "file",
			description: "command manual index",
			renderKey: "help",
		},
	],
	easterEggs: {
		hints: [
			"Not every useful word is listed in `help`.",
			"If you think like a shell user, the site usually rewards it.",
			"The lab directory is calmer on the surface than underneath it.",
		],
		fortyTwo: {
			title: "42 / 1337",
			lines: [
				"42 mattered because it forced range early: C, C++, Unix, networking, graphics, and project work without hand-holding.",
				"It also reinforced a habit that still shows up in my work: learn under ambiguity, review in public, ship anyway.",
				"A lot of the breadth on this site makes more sense once you know the 42 thread is underneath it.",
			],
		},
		morocco: {
			title: "Morocco Thread",
			lines: [
				"Casablanca is the operating base. Mohammedia and Khouribga are part of the longer technical map.",
				"FEDE in Mohammedia covers the formal degree thread. 1337 in Khouribga covers the 42 systems thread.",
				"Some of the work shipped from Morocco into global products; some of it stayed local and taught better judgment.",
			],
		},
		hireMe: {
			title: "sudo hire-me",
			lines: [
				"Permission granted.",
				"If you need a senior builder who can own architecture, delivery, and the awkward parts in between, email me or use LinkedIn.",
				"useit015@gmail.com",
				"linkedin.com/in/useit015",
			],
		},
		souk: {
			title: "souk-fighter",
			lines: [
				"This one exists because web apps were not enough.",
				"I wanted a fighting game with real timing constraints, custom asset bundles, and enough engine work to make the browser sweat a little.",
				"It is the cleanest proof that curiosity still gets real engineering time.",
			],
		},
		rescue: {
			title: "Rescue Mode",
			lines: [
				"There is a recurring pattern in my work: drop into the messy codebase, find the real blocker, and reopen the delivery lane.",
				"Examples: Spyglass vanilla JS to React at Blue River, DSF OpCo emergency frontend fixes, iTech Insurance PDF export unblock, AXA migration work.",
				"Not glamorous, but it is a useful professional trait.",
			],
		},
	},
	themePresets: [
		{
			name: "dark",
			label: "Dark Operator",
			description:
				"Editorial dark shell with GitHub-era greens and crisp blue prompt cues.",
			tokens: {
				background: "#0d1117",
				foreground: "#d0d7de",
				panel: "#11161d",
				panelEdge: "#30363d",
				panelInset: "#161b22",
				pageGlow: "rgba(63, 185, 80, 0.12)",
				pageShine: "rgba(255, 255, 255, 0.03)",
				surfaceSheen: "rgba(255, 255, 255, 0.01)",
				accent: "#3fb950",
				accentSoft: "#7ee787",
				muted: "#8b949e",
				promptUser: "#58a6ff",
				promptHost: "#7ee787",
				promptInput: "#d0d7de",
				headerGlow: "#3fb950",
				chromeClose: "#ef6b73",
				chromeMinimize: "#d29922",
				chromeMaximize: "#3fb950",
				shadow: "rgba(1, 4, 9, 0.45)",
				scanline: "rgba(255, 255, 255, 0.03)",
				fontStack: monoFontStack,
			},
		},
		{
			name: "light",
			label: "Light Signal",
			description:
				"Bright paper terminal with teal structure and slate prompt contrast.",
			tokens: {
				background: "#eef2f6",
				foreground: "#1f2937",
				panel: "#ffffff",
				panelEdge: "#cbd5e1",
				panelInset: "#f8fafc",
				pageGlow: "rgba(20, 184, 166, 0.1)",
				pageShine: "rgba(15, 118, 110, 0.05)",
				surfaceSheen: "rgba(15, 23, 42, 0.03)",
				accent: "#0f766e",
				accentSoft: "#0ea5a4",
				muted: "#64748b",
				promptUser: "#0f766e",
				promptHost: "#334155",
				promptInput: "#0f172a",
				headerGlow: "#14b8a6",
				chromeClose: "#ef4444",
				chromeMinimize: "#f59e0b",
				chromeMaximize: "#14b8a6",
				shadow: "rgba(15, 23, 42, 0.12)",
				scanline: "rgba(15, 23, 42, 0.02)",
				fontStack: monoFontStack,
			},
		},
		{
			name: "blue-matrix",
			label: "Blue Matrix",
			description:
				"Cold neon terminal with cyan energy, cobalt edges, and icy prompts.",
			tokens: {
				background: "#050816",
				foreground: "#dbeafe",
				panel: "#09101f",
				panelEdge: "#1d4ed8",
				panelInset: "#0c1427",
				pageGlow: "rgba(34, 211, 238, 0.16)",
				pageShine: "rgba(96, 165, 250, 0.06)",
				surfaceSheen: "rgba(56, 189, 248, 0.04)",
				accent: "#22d3ee",
				accentSoft: "#67e8f9",
				muted: "#7dd3fc",
				promptUser: "#38bdf8",
				promptHost: "#67e8f9",
				promptInput: "#e0f2fe",
				headerGlow: "#22d3ee",
				chromeClose: "#38bdf8",
				chromeMinimize: "#22d3ee",
				chromeMaximize: "#67e8f9",
				shadow: "rgba(8, 47, 73, 0.35)",
				scanline: "rgba(34, 211, 238, 0.05)",
				fontStack: monoFontStack,
			},
		},
		{
			name: "espresso",
			label: "Espresso",
			description:
				"Warm cafe shell with amber controls, mocha panels, and soft contrast.",
			tokens: {
				background: "#241c18",
				foreground: "#f5e6d3",
				panel: "#2f2622",
				panelEdge: "#5f4c42",
				panelInset: "#382d28",
				pageGlow: "rgba(245, 158, 11, 0.13)",
				pageShine: "rgba(255, 247, 237, 0.04)",
				surfaceSheen: "rgba(251, 191, 36, 0.04)",
				accent: "#f59e0b",
				accentSoft: "#fbbf24",
				muted: "#c4a484",
				promptUser: "#f59e0b",
				promptHost: "#fde68a",
				promptInput: "#fff7ed",
				headerGlow: "#f59e0b",
				chromeClose: "#ea580c",
				chromeMinimize: "#f59e0b",
				chromeMaximize: "#fbbf24",
				shadow: "rgba(0, 0, 0, 0.32)",
				scanline: "rgba(255, 251, 235, 0.03)",
				fontStack: monoFontStack,
			},
		},
		{
			name: "gruvbox",
			label: "Gruvbox Dark",
			description:
				"Famous earthy palette with ochre, moss, rust, and paper-toned text.",
			tokens: {
				background: "#282828",
				foreground: "#ebdbb2",
				panel: "#32302f",
				panelEdge: "#504945",
				panelInset: "#3c3836",
				pageGlow: "rgba(250, 189, 47, 0.14)",
				pageShine: "rgba(131, 165, 152, 0.05)",
				surfaceSheen: "rgba(146, 131, 116, 0.05)",
				accent: "#fabd2f",
				accentSoft: "#fe8019",
				muted: "#a89984",
				promptUser: "#83a598",
				promptHost: "#b8bb26",
				promptInput: "#fbf1c7",
				headerGlow: "#fe8019",
				chromeClose: "#fb4934",
				chromeMinimize: "#fabd2f",
				chromeMaximize: "#b8bb26",
				shadow: "rgba(20, 19, 18, 0.36)",
				scanline: "rgba(235, 219, 178, 0.03)",
				fontStack: monoFontStack,
			},
		},
		{
			name: "material-palenight",
			label: "Material Palenight",
			description:
				"Soft indigo terminal with lilac, cyan, and mint accents from the classic editor theme.",
			tokens: {
				background: "#292d3e",
				foreground: "#a6accd",
				panel: "#25293a",
				panelEdge: "#444267",
				panelInset: "#2f334d",
				pageGlow: "rgba(130, 170, 255, 0.12)",
				pageShine: "rgba(199, 146, 234, 0.06)",
				surfaceSheen: "rgba(130, 170, 255, 0.04)",
				accent: "#c792ea",
				accentSoft: "#89ddff",
				muted: "#717cb4",
				promptUser: "#82aaff",
				promptHost: "#c3e88d",
				promptInput: "#eeffff",
				headerGlow: "#89ddff",
				chromeClose: "#f07178",
				chromeMinimize: "#ffcb6b",
				chromeMaximize: "#c3e88d",
				shadow: "rgba(24, 28, 43, 0.42)",
				scanline: "rgba(137, 221, 255, 0.04)",
				fontStack: monoFontStack,
			},
		},
		{
			name: "atom-one-dark",
			label: "Atom One Dark",
			description:
				"IDE-native charcoal palette with electric blue, lime, and lavender highlights.",
			tokens: {
				background: "#282c34",
				foreground: "#abb2bf",
				panel: "#21252b",
				panelEdge: "#3b4048",
				panelInset: "#2c313c",
				pageGlow: "rgba(97, 175, 239, 0.13)",
				pageShine: "rgba(152, 195, 121, 0.05)",
				surfaceSheen: "rgba(198, 120, 221, 0.04)",
				accent: "#61afef",
				accentSoft: "#98c379",
				muted: "#5c6370",
				promptUser: "#61afef",
				promptHost: "#98c379",
				promptInput: "#dcdfe4",
				headerGlow: "#c678dd",
				chromeClose: "#e06c75",
				chromeMinimize: "#e5c07b",
				chromeMaximize: "#98c379",
				shadow: "rgba(16, 18, 22, 0.4)",
				scanline: "rgba(171, 178, 191, 0.03)",
				fontStack: monoFontStack,
			},
		},
	],
	defaultTheme: "espresso",
};

export default content;
