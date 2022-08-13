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
        equals: slug
      }
    }
  })

  if (!data) {
    return res.status(404).json({ error: "Please enter valid slug." });
  }

  return res.redirect(data.url);
}
