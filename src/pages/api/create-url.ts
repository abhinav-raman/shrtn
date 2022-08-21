import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../constants/url";

import { prisma } from "../../db/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const slug = req.query["slug"];
	const userLink = req.query["userLink"];

	console.log("slug", slug);
	console.log("userLink", userLink);

	if (!slug || typeof slug !== "string") {
		return res.status(404).json({ error: "Please enter correct slug." });
	}

	if (!userLink || typeof userLink !== "string") {
		return res.status(404).json({ error: "Please enter correct userLink." });
	}

	console.log("valid prarams");

	const data = await prisma.shortLink.create({
		data: {
			slug: slug,
			createdAt: new Date(),
			url: userLink,
			shortUrl: `${BASE_URL}/${slug}`,
		},
	});

	console.log("data created", data);

	if (!data) {
		return res.status(404).json({ status: 404, error: "Something went wrong" });
	}

	return res
		.status(200)
		.json({ status: 200, data: JSON.parse(JSON.stringify(data)) });
}
