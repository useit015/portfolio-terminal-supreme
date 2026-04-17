import { useEffect, useState } from "react";

export const useClock = () => {
	const [time, setTime] = useState<string>("");

	useEffect(() => {
		const tick = () =>
			setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
		tick();
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	}, []);

	return time;
};
