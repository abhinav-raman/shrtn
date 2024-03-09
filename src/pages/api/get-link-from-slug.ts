import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const slug = req.query["slug"];

    const { db } = await connectToDatabase();

    try {
        const result = await db.collection("ShortLink").findOne({ slug: slug });

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Cache-Control",
            "s-maxage=1000000000, stale-while-revalidate"
        );

        if (result) {
            return res.status(200).json({
                data: { link: result["userLink"] },
            });
        }
        return res.status(404).json({
            data: "could not find the URL",
        });
    } catch (e) {
        return res.status(500).json({
            error: e,
        });
    }
}
