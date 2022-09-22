import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeLogin from "../components/HomeLogin";
import LinkCreateForm from "../components/LinkCreateForm";
import ThemeSwitcher from "../components/ThemeSwitcher";

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);
	return {
		props: {
			userData: session,
		},
	};
};

type HomeProps = {
	userData: Session | null;
};

const Home: NextPage<HomeProps> = ({ userData }: HomeProps) => {
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
			<main className="flex w-full justify-center p-4 h-[calc(60vh-6rem)]">
				<ThemeSwitcher />
				<HomeLogin userData={userData} />
				<span className="border-l border-l-gray-600 h-full rounded"></span>
				<LinkCreateForm />
			</main>
			<Footer />
		</>
	);
};

export default Home;
