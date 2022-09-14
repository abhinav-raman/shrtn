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
	const [theme, setTheme] = useState(THEMES.DARK);

	useEffect(() => {
		bodyRef.current = document.querySelector("body");

		const localTheme = localStorage.getItem("user-selected-theme");
		if (localTheme) {
			setTheme(localTheme);
			bodyRef.current?.classList.add(localTheme);
		}
	}, []);

	const toggleThemeHandler = () => {
		setTheme((prevTheme) => {
			if (prevTheme === THEMES.LIGHT) {
				bodyRef.current?.classList.remove(THEMES.LIGHT);
				bodyRef.current?.classList.add(THEMES.DARK);
				localStorage.setItem("user-selected-theme", THEMES.DARK);
				return THEMES.DARK;
			}

			bodyRef.current?.classList.remove(THEMES.DARK);
			bodyRef.current?.classList.add(THEMES.LIGHT);
			localStorage.setItem("user-selected-theme", THEMES.LIGHT);
			return THEMES.LIGHT;
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
			{children}
		</ThemeContext.Provider>
	);
};
