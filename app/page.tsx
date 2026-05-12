import Portfolio from "./components/portfolio/Portfolio";
import { portfolioJsonLd } from "./seo";

export default function Home() {
	const jsonLd = JSON.stringify(portfolioJsonLd()).replace(/</g, "\\u003c");

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: jsonLd }}
			/>
			<Portfolio />
		</>
	);
}
