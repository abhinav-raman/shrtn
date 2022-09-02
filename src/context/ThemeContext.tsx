import { createContext, useEffect, useRef, useState } from "react";

export const THEMES = {
	LIGHT: "light",
	DARK: "dark",
};

export const ThemeContext = createContext({
	theme: THEMES.LIGHT,
	toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: any) => {
	const bodyRef = useRef<HTMLBodyElement | null>(null);
	const [theme, setTheme] = useState(THEMES.LIGHT);

	useEffect(() => {
		bodyRef.current = document.querySelector("body");
	}, []);

	const toggleThemeHandler = () => {
		setTheme((prevTheme) =>
			prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
		);
		bodyRef.current?.classList.toggle("dark");
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
			{children}
		</ThemeContext.Provider>
	);
};
