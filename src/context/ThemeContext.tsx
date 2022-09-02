import { createContext, useState } from "react";

export const THEMES = {
	LIGHT: "light",
	DARK: "dark",
};

export const ThemeContext = createContext({
	theme: THEMES.LIGHT,
	setTheme: (theme: string) => {},
});

export const ThemeContextProvider = ({ children }: any) => {
	const [theme, setTheme] = useState(THEMES.LIGHT);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
