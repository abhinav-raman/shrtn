import { GetServerSidePropsContext } from "next";
import { BASE_URL } from "../utils/constants";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req, res } = context;
	const { slug } = context.query;

	if (slug) {
		const slugData = await (
			await fetch(
				`${
					process.env.NODE_ENV === "development" ? BASE_URL.DEV : BASE_URL.PROD
				}/api/get-link-from-slug?slug=${slug}`
			)
		).json();

		return {
			redirect: {
				destination: slugData.data.link,
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
