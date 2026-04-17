import {
	IndexedLink,
	NowContent,
	PortfolioContent,
	PortfolioLink,
	PortfolioSkillGroup,
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
		"Senior full-stack engineer and 42-grad with 9+ years shipping production software across React, Node.js, TypeScript, and AI.",
	summary:
		"I work best on end-to-end product problems: architecture, infrastructure, front end, testing, deployment, and the messy delivery work around them.",
	availability:
		"Open to senior, staff, and founding engineer roles, plus selective consulting where I can own a meaningful slice of product delivery.",
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
		"Terminal portfolio. Version 1.0.0.",
		"Try `ls`, `tree`, or `grep react`. `help` shows the public surface. Curiosity handles the rest.",
	],
	version: "1.0.0",
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
	"Solo-built the Radiometer Course Creator and helped close a six-figure enterprise deal.",
	"Led a 9-person engineering team as co-founder and CTO at LendStack.",
	"Delivered 8 Toptal engagements across healthcare, insurance, media, agritech, and AI.",
];

export const skills: PortfolioSkillGroup[] = [
	{
		category: "Core stack",
		items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "HTML/CSS"],
	},
	{
		category: "Backend and data",
		items: ["NestJS", "Express", "PostgreSQL", "MongoDB", "Redis", "REST APIs"],
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
];

export const now: NowContent = {
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
};

export const values: ValueEntry[] = [
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
];

export const stats: StatEntry[] = [
	{
		value: "9+",
		label: "years shipping product software",
		detail:
			"Across freelance work, enterprise teams, startups, and independent research.",
	},
	{
		value: "8",
		label: "Toptal engagements delivered",
		detail: "Healthcare, insurance, media, agritech, AI, and emergency fixes.",
	},
	{
		value: "2",
		label: "live Zambia pilot clients",
		detail: "LendStack reached production with 12 more prospects in the pipeline.",
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
