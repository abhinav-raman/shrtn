import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../../constants/url";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const slug = req.query["slug"];

	try {
		const response = await (
			await fetch(`${BASE_URL}/api/get-slug/${slug}`)
		).json();
		return res.json({ ...response, url: BASE_URL });
	} catch (error) {
		return res.json(error);
	}
}
