import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req, res } = context;
	const { slug } = context.query;

	console.log(slug);

	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session || !session.user || !session.user.email) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
				error: "You must be logged in to view this page",
			},
		};
	}

	if (slug) {
		const slugData = await (
			await fetch(
				`${BASE_URL}/api/get-slug-with-email?email=${session.user.email}`
			)
		).json();
    console.log(slugData);
    
		return {
			redirect: {
				destination: slugData.data[0].url,
				permanent: true,
			},
		};
	}

	return {
		redirect: {
			destination: "/",
			permanent: false,
			error: "Cannot find data.",
		},
	};
}

export default function Slug() {
  
}
