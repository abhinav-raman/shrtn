import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { BASE_URL } from "../utils/constants";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req, res } = context;
	const { slug } = context.query;

	console.log(slug);

	const session = await unstable_getServerSession(req, res, authOptions);

	if (slug) {
		const slugData = await (
			await fetch(
				`${
					process.env.NODE_ENV === "development" ? BASE_URL.DEV : BASE_URL.PROD
				}/api/get-url?slug=${slug}`
			)
		).json();
		console.log(slugData);

		return {
			redirect: {
				destination: slugData.data.url,
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

export default function Slug() {}
