import { PortfolioContent } from "./types";
import { easterEggs } from "./content-data/easter-eggs";
import { filesystem } from "./content-data/filesystem";
import { defaultTheme, themePresets } from "./content-data/themes";
import {
	highlights,
	identity,
	links,
	now,
	skills,
	socials,
	sourceOfTruth,
	stats,
	values,
	welcome,
} from "./content-data/profile";
import { education, experience, lab, projects } from "./content-data/career";

const content: PortfolioContent = {
	identity,
	welcome,
	links,
	socials,
	highlights,
	skills,
	experience,
	education,
	projects,
	now,
	values,
	stats,
	sourceOfTruth,
	lab,
	filesystem,
	easterEggs,
	themePresets,
	defaultTheme,
};

export default content;
