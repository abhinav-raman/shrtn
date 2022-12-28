import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
} from "next";
import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeLogin from "../components/HomeLogin";
import ThemeSwitcher from "../components/ThemeSwitcher";
import dynamic from "next/dynamic";

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);
	const host = context.req.headers.host;

	return {
		props: {
			userData: session,
			host: host,
		},
	};
};

const LinkCreateForm = dynamic(() => import("../components/LinkCreateForm"));

export default function Home(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	useEffect(() => {
		console.log(props.host);
	}, []);
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
			<main className="flex flex-col-reverse w-full justify-center p-4 md:h-[calc(60vh-6rem)] md:flex-row">
				<ThemeSwitcher />
				<HomeLogin userData={props.userData} />
				<span className="border-gray-600 border-b w-full h-full rounded hidden md:inline md:w-auto md:border-l md:border-b-0" />
				<LinkCreateForm host={props.host} />
			</main>
			<Footer />
		</>
	);
}
