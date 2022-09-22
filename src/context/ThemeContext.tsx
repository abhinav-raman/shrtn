import { createContext, useEffect, useRef, useState } from "react";

type ThemeType = "light" | "dark";

export const THEMES = {
	LIGHT: "light" as ThemeType,
	DARK: "dark" as ThemeType,
};

export const ThemeContext = createContext({
	theme: THEMES.LIGHT,
	toggleTheme: () => {},
});

const handleThemeChangeLogic = (theme: ThemeType) => {
	document.body.classList.remove(THEMES.LIGHT, THEMES.DARK);
	document.body.classList.add(theme);
	localStorage.setItem("user-selected-theme", theme);
};

export const ThemeContextProvider = ({ children }: any) => {
	const bodyRef = useRef<HTMLBodyElement | null>(null);
	const [theme, setTheme] = useState<ThemeType>(THEMES.DARK);

	useEffect(() => {
		bodyRef.current = document.querySelector("body");
		const localTheme = localStorage.getItem("user-selected-theme") as ThemeType;
		console.log("theme", localTheme);
		setTheme(localTheme || THEMES.DARK);
		handleThemeChangeLogic(localTheme || THEMES.DARK);
	}, []);

	const toggleThemeHandler = () => {
		setTheme((prevTheme) => {
			if (prevTheme === THEMES.LIGHT) {
				handleThemeChangeLogic(THEMES.DARK);
				return THEMES.DARK;
			}

			handleThemeChangeLogic(THEMES.LIGHT);
			return THEMES.LIGHT;
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
			{children}
		</ThemeContext.Provider>
	);
};
