"use client";
import { TypeAnimation } from "react-type-animation";

const AnimatedText = () => {
	return (
		<TypeAnimation
			sequence={[
				// Same substring at the start will only be typed once, initially
				"Create and manage issues (tasks, bugs, features).",
				1000,
				"Monitor and update the status of each issue. ",
				1000,
				"Set and track important dates.",
				1000,
				"Assign issues to specific developers or team members.",
				1000,
			]}
			speed={50}
			repeat={Infinity}
		/>
	);
};

export default AnimatedText;
