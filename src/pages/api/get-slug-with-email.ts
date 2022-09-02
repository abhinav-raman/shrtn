import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const email = req.query["email"];

	if (!email || typeof email !== "string") {
		return res.status(404).json({ error: "Missing email." });
	}

	const data = await prisma.shortLink.findMany({
		where: {
			userEmail: {
				equals: email,
			},
		},
	});

	if (!data) {
		return res
			.status(200)
			.json({ status: 404, error: "No Data found" });
	}

	return res
		.status(200)
		.json({ status: 200, data: JSON.parse(JSON.stringify(data)) });
}
