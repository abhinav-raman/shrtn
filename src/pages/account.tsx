import { useEffect } from "react";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]";
import { BASE_URL } from "../constants/url";

import deleteIcon from "../assets/images/delete-icon.png";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req, res } = context;

	const session = await unstable_getServerSession(req, res, authOptions);
	console.log(session);

	if (session && session.user && session.user.email) {
		const slugData = await (
			await fetch(
				`${BASE_URL}/api/get-slug-with-email?email=${session.user.email}`
			)
		).json();
		console.log(slugData);

		return {
			props: {
				data: slugData.data,
				user: {
					name: session.user.name,
					email: session.user.email,
				},
			},
		};
	}

	return {
		redirect: {
			destination: "/",
			permanent: false,
			error: "You must be logged in to view this page",
		},
	};
}

type AccountProps = {
	data: any;
	error: any;
	user: {
		name: string;
		email: string;
	};
};

const Account = ({ data, user, error }: AccountProps) => {
	useEffect(() => {
		console.log(data, error);
	}, []);

	return (
		<main className="w-full text-center">
			<h1 className="font-bold text-3xl">{user.name}</h1>
			<h2 className="font-thin text-2xl">{user.email}</h2>
			<section className="w-full px-[15%] min-h-[20rem] flex justify-center items-center">
				<table className="w-full h-min">
					<thead>
						<tr className="h-12">
							<th className="text-left p-2 w-1/6 font-light border-b border-slate-400">
								Created At
							</th>
							<th className="text-left p-2 pl-8 w-1/3 font-light border-b border-slate-400">
								Short link
							</th>
							<th className="text-left p-2 pl-8 w-1/2 font-light border-b border-slate-400">
								Original link
							</th>
							<th className="w-8 border-b border-slate-400"></th>
						</tr>
					</thead>
					<tbody>
						{data.map((item: any) => (
							<tr key={item.slug} className="h-8">
								<td className="text-left py-2 pr-8 w-1/6">
									{new Date(item.createdAt).toDateString()}
								</td>
								<td className="text-left py-2 pr-8 w-2/6">
									{item.shortUrl}
								</td>
								<td className="text-left py-2 w-2/6 font-semibold hover:text-teal-600">
									<a href={item.url} target="_blank" rel="noreferrer">
										{item.url}
									</a>
								</td>
								<td className="aspect-square p-1">
									<div className="relative w-6 aspect-square cursor-pointer">
										<Image
											src={deleteIcon}
											alt="delete"
											height={"24px"}
											width={"24px"}
											layout="fill"
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</main>
	);
};

export default Account;
