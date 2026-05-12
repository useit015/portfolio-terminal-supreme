import { ImageResponse } from "next/og";
import {
	SITE_DESCRIPTION,
	SITE_TITLE,
} from "./seo";

export const alt = "Oussama Nahiz portfolio preview";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					alignItems: "stretch",
					background: "#181210",
					color: "#f8f1e7",
					display: "flex",
					fontFamily: "Arial, sans-serif",
					height: "100%",
					justifyContent: "center",
					padding: "64px",
					width: "100%",
				}}
			>
				<div
					style={{
						border: "2px solid rgba(245, 158, 11, 0.5)",
						display: "flex",
						flexDirection: "column",
						height: "100%",
						justifyContent: "space-between",
						padding: "54px",
						width: "100%",
					}}
				>
					<div
						style={{
							color: "#f59e0b",
							fontSize: 28,
							fontWeight: 700,
							letterSpacing: 4,
							textTransform: "uppercase",
						}}
					>
						React / Node / TypeScript / AI
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
						<h1
							style={{
								fontSize: 82,
								fontWeight: 800,
								letterSpacing: 0,
								lineHeight: 0.95,
								margin: 0,
								maxWidth: 920,
							}}
						>
							{SITE_TITLE}
						</h1>
						<p
							style={{
								color: "#d8c7b4",
								fontSize: 30,
								lineHeight: 1.35,
								margin: 0,
								maxWidth: 960,
							}}
						>
							{SITE_DESCRIPTION}
						</p>
					</div>
					<div style={{ display: "flex", gap: 18 }}>
						{["9+ years", "8 Toptal engagements", "42 Network"].map((item) => (
							<div
								key={item}
								style={{
									background: "rgba(245, 158, 11, 0.13)",
									border: "1px solid rgba(245, 158, 11, 0.4)",
									color: "#ffd68a",
									display: "flex",
									fontSize: 24,
									fontWeight: 700,
									padding: "14px 18px",
								}}
							>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		),
		size,
	);
}
