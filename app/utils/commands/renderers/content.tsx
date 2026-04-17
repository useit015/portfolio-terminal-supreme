import { ReactNode } from "react";
import { CommandRenderContext, PortfolioContent } from "../../../types";
import { renderEasterEggBlock, renderHistory } from "./common";
import { renderHelp } from "./content-help";
import {
	renderAbout,
	renderNow,
	renderResume,
	renderSkills,
	renderStats,
	renderValues,
	renderWelcome,
} from "./content-profile";
import {
	renderEducation,
	renderExperience,
	renderLab,
	renderProjectCard,
	renderProjects,
	renderSocials,
	renderThemes,
} from "./content-work";

export const renderContentByKey = (
	renderKey: string,
	content: PortfolioContent,
	context: CommandRenderContext,
): ReactNode => {
	if (renderKey.startsWith("project:")) {
		const id = Number(renderKey.split(":")[1]);
		const project = content.projects.find((entry) => entry.id === id);

		return project ? (
			<div data-testid={`project-${project.id}`} className="space-y-4">
				{renderProjectCard(project)}
			</div>
		) : null;
	}

	switch (renderKey) {
		case "about":
			return renderAbout(content);
		case "resume":
			return renderResume(content);
		case "now":
			return renderNow(content);
		case "values":
			return renderValues(content.values);
		case "stats":
			return renderStats(content);
		case "skills":
			return renderSkills(content);
		case "experience":
			return renderExperience(content);
		case "projects":
			return renderProjects(content);
		case "education":
			return renderEducation(content);
		case "socials":
			return renderSocials(content);
		case "themes":
			return renderThemes(content);
		case "lab":
			return renderLab(content);
		case "welcome":
			return renderWelcome(content);
		case "help":
			return renderHelp(content);
		case "42":
			return renderEasterEggBlock("42-output", content.easterEggs.fortyTwo);
		case "morocco":
			return renderEasterEggBlock("morocco-output", content.easterEggs.morocco);
		case "souk":
			return renderEasterEggBlock("souk-output", content.easterEggs.souk);
		case "rescue":
			return renderEasterEggBlock("rescue-output", content.easterEggs.rescue);
		case "history":
			return renderHistory(context.history);
		default:
			return null;
	}
};
