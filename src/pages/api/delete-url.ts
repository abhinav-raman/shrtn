import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { API_FAIL, API_SUCCESS } from "../../utils/constants";
import { authOptions } from "./auth/[...nextauth]";

import { prisma } from "../../db/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await unstable_getServerSession(req, res, authOptions);
	const { slug } = req.query;

	if (session && session.user && session.user.email) {
		try {
			const response = await prisma.shortLink.delete({
				where: {
					slug: slug as string,
				},
			});

			return res.status(200).json({
				status: {
					code: API_SUCCESS,
					message: "Url deleted successfully",
				},
				data: response,
			});
		} catch (error) {
			return res.status(400).json({
				status: {
					code: API_FAIL,
					mesaage: error,
				},
			});
		}
	}

	return res.status(400).json({
		status: {
			code: 404,
			message: API_FAIL,
		},
		error: "Not authorised",
	});
}
