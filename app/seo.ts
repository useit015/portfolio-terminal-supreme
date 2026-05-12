import type { MetadataRoute } from "next";
import content from "./content";

export const SITE_URL = "https://me-sandy-rho.vercel.app";
export const SITE_NAME = "Oussama Nahiz Portfolio";
export const SITE_TITLE = "Oussama Nahiz - Senior Full-Stack Engineer";
export const SITE_DESCRIPTION =
	"Senior full-stack engineer and 42 Network graduate in Casablanca with 9+ years shipping React, Node.js, TypeScript, Next.js, and AI product work across fintech, healthcare, agritech, and developer tools.";
export const SITE_KEYWORDS = [
	"Oussama Nahiz",
	"Senior Full-Stack Engineer",
	"React engineer",
	"Node.js engineer",
	"TypeScript engineer",
	"Next.js developer",
	"AI product engineer",
	"LLM integration",
	"Toptal developer",
	"42 Network graduate",
	"Casablanca software engineer",
	"Morocco software engineer",
];
export const LAST_UPDATED = "2026-05-12";

export function absoluteUrl(path = "/") {
	return new URL(path, SITE_URL).toString();
}

export const sharedOpenGraph = {
	type: "profile",
	locale: "en_US",
	url: absoluteUrl(),
	siteName: SITE_NAME,
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	images: [
		{
			url: absoluteUrl("/opengraph-image"),
			width: 1200,
			height: 630,
			alt: "Oussama Nahiz portfolio preview",
		},
	],
} satisfies NonNullable<import("next").Metadata["openGraph"]>;

export const sharedTwitter = {
	card: "summary_large_image",
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	images: [absoluteUrl("/opengraph-image")],
} satisfies NonNullable<import("next").Metadata["twitter"]>;

export function sitemapEntries(): MetadataRoute.Sitemap {
	const lastModified = new Date(LAST_UPDATED);

	return [
		{
			url: absoluteUrl(),
			lastModified,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: absoluteUrl("/terminal"),
			lastModified,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}

export function portfolioJsonLd() {
	const skills = content.skills.flatMap((group) => group.items);
	const sameAs = content.socials.map((social) => social.href);

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": absoluteUrl("/#website"),
				url: absoluteUrl(),
				name: SITE_NAME,
				description: SITE_DESCRIPTION,
				inLanguage: "en",
				publisher: {
					"@id": absoluteUrl("/#person"),
				},
			},
			{
				"@type": "ProfilePage",
				"@id": absoluteUrl("/#profile"),
				url: absoluteUrl(),
				name: SITE_TITLE,
				description: SITE_DESCRIPTION,
				dateModified: LAST_UPDATED,
				inLanguage: "en",
				mainEntity: {
					"@id": absoluteUrl("/#person"),
				},
			},
			{
				"@type": "Person",
				"@id": absoluteUrl("/#person"),
				name: content.identity.name,
				url: absoluteUrl(),
				email: `mailto:${content.identity.email}`,
				jobTitle: content.identity.role,
				description: content.identity.intro,
				address: {
					"@type": "PostalAddress",
					addressLocality: "Casablanca",
					addressCountry: "MA",
				},
				sameAs,
				knowsAbout: skills,
				alumniOf: content.education.map((entry) => ({
					"@type": "EducationalOrganization",
					name: entry.institution,
				})),
				hasOccupation: {
					"@type": "Occupation",
					name: content.identity.role,
					skills,
				},
			},
		],
	};
}
