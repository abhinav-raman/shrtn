import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

  const params = req.body;

  console.log("params => ", params);

  const slug = params["slug"];
	const userLink = params["userLink"];
	const email = params["email"];
  
	// const slug = req.query["slug"];
	// const userLink = req.query["userLink"];
	// const email = req.query["email"];
  const baseUrl = req.headers.host

	if (!slug || typeof slug !== "string") {
		return res.status(400).json({ error: "Please enter correct slug." });
	}

	if (!userLink || typeof userLink !== "string") {
		return res.status(400).json({ error: "Please enter correct userLink." });
	}

	const previousLink = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if (previousLink) {
		return res.status(400).json({
			error: `Please enter another slug. This slug is already in use.`,
		});
	}

	const data = await prisma.shortLink.create({
		data: {
			slug: slug,
			createdAt: new Date(),
			url: userLink,
			userEmail: `${email}`,
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
