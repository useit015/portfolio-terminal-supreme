import type { Metadata } from "next";
import AppShell from "../components/AppShell";
import {
	absoluteUrl,
	sharedOpenGraph,
	sharedTwitter,
	SITE_DESCRIPTION,
} from "../seo";

export const metadata: Metadata = {
	title: "Interactive Terminal Portfolio",
	description:
		"Interactive terminal version of Oussama Nahiz's software engineering portfolio, with commands for experience, projects, skills, education, and contact links.",
	alternates: {
		canonical: "/terminal",
	},
	openGraph: {
		...sharedOpenGraph,
		url: absoluteUrl("/terminal"),
		title: "Interactive Terminal Portfolio | Oussama Nahiz",
		description: SITE_DESCRIPTION,
	},
	twitter: {
		...sharedTwitter,
		title: "Interactive Terminal Portfolio | Oussama Nahiz",
	},
};

export default function TerminalPage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <AppShell />
    </div>
  );
}
