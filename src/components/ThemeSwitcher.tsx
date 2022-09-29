import Image from "next/image";
import { useContext } from "react";

import { ThemeContext, THEMES } from "../context/ThemeContext";
import darkIcon from "../assets/images/dark-theme-icon.svg";
import lightIcon from "../assets/images/light-theme-icon.svg";

const ThemeSwitcher = () => {
	const themeContext = useContext(ThemeContext);

	return (
		<button
			className="absolute top-4 right-4 p-2"
			onClick={themeContext.toggleTheme}
		>
			{themeContext.theme === THEMES.LIGHT ? (
				<Image src={darkIcon} alt="dark theme icon" width={40} height={40} />
			) : (
				<Image
					src={lightIcon}
					alt="light theme icon"
					width={40}
					height={40}
					className="filter invert"
				/>
			)}
		</button>
	);
};

export default ThemeSwitcher;
