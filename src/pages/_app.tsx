import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { ThemeContextProvider } from "../context/ThemeContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ThemeContextProvider>
			<SessionProvider session={session}>
				{/* <Layout> */}
					<Component {...pageProps} />
				{/* </Layout> */}
			</SessionProvider>
		</ThemeContextProvider>
	);
}

export default MyApp;
