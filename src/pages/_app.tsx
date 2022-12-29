import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "../context/ThemeContext";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ThemeContextProvider>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</ThemeContextProvider>
	);
}

export default MyApp;
