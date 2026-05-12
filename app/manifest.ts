import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "./seo";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		short_name: "Oussama Nahiz",
		description: SITE_DESCRIPTION,
		start_url: "/",
		display: "standalone",
		background_color: "#181210",
		theme_color: "#f59e0b",
		icons: [
			{
				src: "/favicon.svg",
				sizes: "64x64",
				type: "image/svg+xml",
			},
			{
				src: "/favicon.ico",
				sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
				type: "image/x-icon",
			},
		],
	};
}
