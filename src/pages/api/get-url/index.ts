import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const slug = req.query["slug"];
	try {
		const response = await (
			await fetch(`http://localhost:3000/api/get-slug/${slug}`)
		).json();
		console.log("data in FE", response);
		return res.json(response);
	} catch (error) {
		return res.json(error);
	}
}
