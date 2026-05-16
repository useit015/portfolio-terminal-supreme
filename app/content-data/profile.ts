import {
	IndexedLink,
	NowContent,
	PortfolioContent,
	PortfolioLink,
	PortfolioSkillGroup,
	SourceOfTruthContent,
	StatEntry,
	ValueEntry,
	WelcomeContent,
} from "../types";

export const identity: PortfolioContent["identity"] = {
	title: "Oussama Nahiz | Terminal Portfolio",
	username: "oussama",
	hostname: "terminal",
	name: "Oussama Nahiz",
	role: "Senior Full-Stack Engineer",
	location: "Casablanca Metropolitan Area, Morocco",
	intro:
		"Senior full-stack engineer and 42-grad with 9+ years shipping production software across React, Node.js, TypeScript, and AI product work.",
	summary:
		"I work across the full product slice: architecture, infrastructure, front end, backend services, testing, deployment, and the delivery glue between them.",
	availability:
		"Open to senior, staff, founding-engineer, and selective client work where I can own a meaningful slice of product delivery.",
	email: "useit015@gmail.com",
	guiUrl: "https://linkedin.com/in/useit015",
	homePath: "/home/oussama/portfolio",
	whoami: "visitor",
};

export const welcome: WelcomeContent = {
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
		"Terminal portfolio. Version 1.1.0.",
		"Try `ls`, `tree`, `cat source`, or `grep react`. `help` shows the public surface. Curiosity handles the rest.",
	],
	version: "1.1.0",
};

export const links: PortfolioLink[] = [
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
];

export const socials: IndexedLink[] = [
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
];

export const highlights: string[] = [
	"Solo-built the Radiometer Course Creator, delivered as part of a six-figure enterprise healthcare deal.",
	"Led a 9-person engineering team as co-founder and CTO at LendStack, shipping to 2 live pilot clients.",
	"Delivered 8 Toptal engagements across 7 clients in agriculture AI, insurance, fintech media, AI SaaS, and video.",
];

export const skills: PortfolioSkillGroup[] = [
	{
		category: "Core stack",
		description:
			"The product surface users see and the application layer that keeps it maintainable.",
		items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "HTML/CSS"],
	},
	{
		category: "Backend and data",
		description:
			"APIs, services, and storage for product workflows that need to survive real usage.",
		items: ["NestJS", "Express", "PostgreSQL", "MongoDB", "Redis", "REST APIs"],
	},
	{
		category: "Cloud and delivery",
		description:
			"The deployment path: serverless infrastructure, containers, and release plumbing.",
		items: ["AWS SAM", "Lambda", "API Gateway", "S3", "Docker", "CI/CD"],
	},
	{
		category: "AI and ML-adjacent",
		description:
			"LLM integrations, model-selection workflows, AI media tooling, OCR/KYC, and annotation systems built into real products.",
		items: [
			"OpenAI APIs",
			"OpenRouter",
			"Replicate",
			"FAL",
			"Agentic AI",
			"LLM integration",
		],
	},
	{
		category: "Breadth signals",
		description:
			"Mobile, game-tech, real-time, graphics, and systems breadth that helps in unusual product surfaces.",
		items: [
			"React Native",
			"Pixi.js 8",
			"Three.js",
			"WebRTC",
			"Web3.js",
			"Unix/Linux",
		],
	},
];

export const now: NowContent = {
	headline:
		"Building AI developer tools, creator systems, browser-game experiments, and selective client work while staying hands-on with React, Node.js, and TypeScript.",
	buildMode:
		"Best fit: senior, staff, or founding-engineer roles where one person needs to turn messy requirements into a shipped product slice.",
	summary:
		"I am optimizing for teams that value technical depth, calm execution, and someone who can move from ambiguity to production without waiting for perfect conditions.",
	bullets: [
		"Open to senior, staff, founding-engineer, and selective consulting roles.",
		"Current public side work: whichmodel, Open Design, Sigil, Scripter/script-tool, Asset Forge, souk-fighter, and ongoing game-engine exploration.",
		"Profile copy is maintained from a source-of-truth vault: evidence first, no invented metrics, public/private boundary kept explicit.",
		"Strongest in product teams that need architecture judgment and hands-on delivery in the same person.",
	],
};

export const values: ValueEntry[] = [
	{
		title: "Own the full product slice",
		detail:
			"My best work is end-to-end: architecture, infrastructure, front end, back end, testing, and shipping. I'd rather own the whole thing than hand off at the edges.",
	},
	{
		title: "Be the rescue engineer when it matters",
		detail:
			"I've walked into burning codebases under deadline pressure and turned them around. It's uncomfortable work and I'm used to it.",
	},
	{
		title: "Build with constraints",
		detail:
			"Bootstrapped startup work and client delivery taught me to ship with what's there, not wait for ideal conditions.",
	},
	{
		title: "Keep curiosity alive",
		detail:
			"I build some things because they should exist, and some things because I want to understand how they work.",
	},
];

export const sourceOfTruth: SourceOfTruthContent = {
	headline: "Evidence-backed, not resume confetti.",
	summary:
		"This portfolio is generated from a maintained career source of truth: canonical role notes, project proof, skills evidence, profile drafts, and cleanup/review logs. Public copy stays short, but the claims underneath are tracked.",
	bullets: [
		"Claims trace back to source notes, live-profile reviews, project records, or explicit user-confirmed facts.",
		"Toptal verification is surfaced through the public Top 3% Talent badge and linked resume.",
		"Public-facing text stays separate from raw/private material like rates, earnings, and internal source captures.",
		"The career vault now has a review cadence, templates, cleanup policy, and a local wiki checker for frontmatter, links, and boundary warnings.",
	],
};

export const stats: StatEntry[] = [
	{
		value: "9+",
		label: "years shipping product software",
		detail:
			"Across freelance work, enterprise teams, startups, Toptal engagements, and independent AI/product projects.",
	},
	{
		value: "8",
		label: "Toptal engagements delivered",
		detail: "Across 7 clients in agriculture AI, insurance, fintech media, DLT, AI SaaS, and video.",
	},
	{
		value: "2",
		label: "live Zambia pilot clients",
		detail: "LendStack reached production pilots with 12 more prospects in the pipeline.",
	},
	{
		value: "1",
		label: "six-figure enterprise build",
		detail: "Radiometer Course Creator was solo-built and helped close the deal.",
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
];
