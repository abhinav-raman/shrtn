import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { connectToDatabase } from "../../lib/mongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    const { slug } = req.query;

    const { db } = await connectToDatabase();

    if (session && session.user && session.user.email) {
        try {
            const response = await db
                .collection("ShortLink")
                .deleteOne({ slug: slug });

            return res.status(200).json({
                data: response,
            });
        } catch (e) {
            return res.status(500).json({
                error: e,
            });
        }
    }

    return res.status(401).json({
        error: "Not authorised",
    });
}
