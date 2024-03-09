import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../lib/mongo";
import { ShortLinkType } from "../../utils/constants";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const params = req.body as ShortLinkType;

    const { db } = await connectToDatabase();

    try {
        const result = await db.collection("ShortLink").insertOne({
            ...params,
            createdAt: new Date().toString(),
        });
        return res
            .status(200)
            .json({ data: JSON.parse(JSON.stringify(result)) });
    } catch (e) {
        return res
            .status(500)
            .json({ data: JSON.parse(JSON.stringify(e)) });
    }
}
