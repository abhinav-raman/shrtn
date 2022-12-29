import dynamic from "next/dynamic";
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { getSession } from "next-auth/react";
import { BASE_URL } from "../utils/constants";

const Head = dynamic(() => import("next/head"));
const Footer = dynamic(() => import("../components/Footer"));
const Header = dynamic(() => import("../components/Header"));
const HomeLogin = dynamic(() => import("../components/HomeLogin"));
const ThemeSwitcher = dynamic(() => import("../components/ThemeSwitcher"));
const HomePageLayout = dynamic(() => import("../components/HomePageLayout"));
const LinkCreateForm = dynamic(() => import("../components/LinkCreateForm"));

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);
	const host = context.req.headers.host;

	return {
		props: {
			userData: session,
			host:
				process.env.NODE_ENV === "development" ? BASE_URL.DEV : BASE_URL.PROD,
		},
	};
};

function Home({
	userData,
	host,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head>
				<title>Shrtn</title>
				<meta name="description" content="Shorten your links, fast and easy" />
				<link rel="icon" href="favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="favicon-16x16.png"
				/>
				<link rel="manifest" href="site.webmanifest" />
			</Head>

			<Header />
			<ThemeSwitcher />
			<HomePageLayout
				firstComponent={<HomeLogin userData={userData} />}
				secondComponent={<LinkCreateForm host={host} />}
			/>
			<Footer />
		</>
	);
}

export default Home;
