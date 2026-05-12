import { describe, expect, it } from "vitest";
import manifest from "./manifest";
import robots from "./robots";
import {
	absoluteUrl,
	portfolioJsonLd,
	sitemapEntries,
	SITE_DESCRIPTION,
	SITE_URL,
} from "./seo";

describe("SEO configuration", () => {
	it("generates absolute canonical URLs from the production alias", () => {
		expect(absoluteUrl()).toBe(`${SITE_URL}/`);
		expect(absoluteUrl("/terminal")).toBe(`${SITE_URL}/terminal`);
	});

	it("advertises crawlable public routes in the sitemap", () => {
		const entries = sitemapEntries();

		expect(entries).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ url: `${SITE_URL}/`, priority: 1 }),
				expect.objectContaining({
					url: `${SITE_URL}/terminal`,
					priority: 0.7,
				}),
			]),
		);
	});

	it("connects robots.txt to the sitemap", () => {
		expect(robots()).toEqual({
			rules: {
				userAgent: "*",
				allow: "/",
			},
			sitemap: `${SITE_URL}/sitemap.xml`,
		});
	});

	it("advertises a multi-size favicon in the web manifest", () => {
		expect(manifest().icons).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					src: "/favicon.ico",
					sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
					type: "image/x-icon",
				}),
			]),
		);
	});

	it("describes the portfolio as a profile page for structured data", () => {
		const jsonLd = portfolioJsonLd();

		expect(JSON.stringify(jsonLd)).toContain(SITE_DESCRIPTION);
		expect(jsonLd["@graph"]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					"@type": "ProfilePage",
					mainEntity: { "@id": `${SITE_URL}/#person` },
				}),
				expect.objectContaining({
					"@type": "Person",
					name: "Oussama Nahiz",
					sameAs: expect.arrayContaining([
						"https://github.com/useit015",
						"https://linkedin.com/in/useit015",
					]),
				}),
			]),
		);
	});
});
