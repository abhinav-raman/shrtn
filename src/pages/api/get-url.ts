import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const slug = req.query["slug"];
	if (!slug || typeof slug !== "string") {
		return res.status(404).json({ error: "Missing slug." });
	}

	const data = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if (!data) {
		return res.status(404).json({ status: 404, error: "Slug does not exist." });
	}

	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

	return res
		.status(200)
		.json({ status: 200, data: JSON.parse(JSON.stringify(data)) });
}
