import { useEffect, useRef, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Image from "next/image";
import Head from "next/head";
import Popup from "reactjs-popup";

import { authOptions } from "./api/auth/[...nextauth]";
import { API_SUCCESS } from "../utils/constants";

import { prisma } from "../db/client";
import ThemeSwitcher from "../components/ThemeSwitcher";
import deleteIcon from "../assets/images/delete-icon.png";
import Footer from "../components/Footer";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req, res } = context;
	const session = await unstable_getServerSession(req, res, authOptions);

	const host = req.headers.host;

	if (session && session.user && session.user.email) {
		try {
			const data = await prisma.shortLink.findMany({
				where: {
					userEmail: {
						equals: session.user.email,
					},
				},
			});

			console.log("data => ", data);

			return {
				props: {
					data: JSON.parse(JSON.stringify(data)),
					user: {
						name: session.user.name,
						email: session.user.email,
					},
					host: host,
				},
			};
		} catch (err) {
			console.log("err => ", err);

			return {
				props: {
					data: [],
					error: JSON.stringify(err),
					host: host,
				},
			};
		}
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
	host: string;
};

const Account = ({ data, user, error, host }: AccountProps) => {
	const [linksData, setLinksData] = useState(data);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedToDelete, setSelectedToDelete] = useState<string | null>(null);
	const [slugDeleteApiMessage, setSlugDeleteAPiMessage] = useState("");

	const nextRef = useRef<any>();

	const linkDeleteHandler = async (slug: string) => {
		console.log(slug);

		const response = await (
			await fetch(`${"test"}/api/delete-url?slug=${slug}`)
		).json();

		setSlugDeleteAPiMessage(response.status.message);
		setSlugDeleteAPiMessage("");

		if (response.status.code === API_SUCCESS) {
			console.log("Deleted successfully", response);
			setLinksData(linksData.filter((link: any) => link.slug !== slug));
		}

		setShowDeleteModal(false);
		setSelectedToDelete(null);
	};

	useEffect(() => {
		nextRef.current = document.getElementById("__next");
		nextRef.current.classList.add("transition-all");
		nextRef.current.classList.add("duration-300");

		return () => {
			nextRef.current.classList.remove("transition-all");
			nextRef.current.classList.remove("duration-300");
			nextRef.current.classList.remove("blur-sm");
		};
	}, []);

	useEffect(() => {
		if (showDeleteModal && nextRef.current) {
			nextRef.current.classList.add("blur-sm");
		} else {
			nextRef.current.classList.remove("blur-sm");
		}
	}, [showDeleteModal]);

	return (
		<>
			<Head>
				<title>Shrtn | {user?.name || ""}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="w-full text-center">
				<ThemeSwitcher />

				<div className="py-4 font-Satoshi">
					<h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r bg-black dark:bg-gray-100 from-violet-800 to-blue-800 dark:from-violet-400 dark:to-blue-400 ">
						{user?.name}
					</h1>
					<h2 className="text-xl font-extralight">{user?.email}</h2>
				</div>

				{error && (
					<section className="w-full px-[15%] min-h-[20rem] flex justify-center items-center font-extralight md:px-0">
						{"Can't fetch account data. Something went wrong"}
					</section>
				)}

				{!error && linksData && linksData.length > 0 ? (
					<section className="w-full px-8 min-h-[20rem] flex flex-col justify-start items-start md:px-[15%]">
						{slugDeleteApiMessage && (
							<p className="w-full mt-8">{slugDeleteApiMessage}</p>
						)}
						<table className="w-full h-min mt-8">
							<thead>
								<tr className="h-12">
									<th className="text-left hidden p-2 font-light border-b border-slate-400 md:table-cell">
										Created At
									</th>
									<th className="text-left p-2 pl-8 w-full font-light border-b border-slate-400 md:w-1/3">
										Short link
									</th>
									<th className="text-left p-2 pl-8 w-1/2 font-light border-b border-slate-400 hidden md:table-cell">
										Original link
									</th>
									<th className="w-16 border-b border-slate-400 md:w-8"></th>
								</tr>
							</thead>
							<tbody>
								{linksData.map((item: any) => (
									<tr key={item.slug} className="h-8">
										<td className="text-left py-2 pr-8 hidden md:table-cell">
											{new Date(item.createdAt).toDateString()}
										</td>
										<td className="bg-gradient-to-r text-left py-2 pr-8 w-2/6 font-semibold bg-black dark:bg-gray-100 hover:from-violet-800 hover:to-blue-800 dark:hover:from-violet-400 dark:hover:to-blue-400 text-transparent bg-clip-text">
											{/* <a
												href={host + "/" + item.slug}
												target="_blank"
												rel="noreferrer"
											> */}
											{host + "/" + item.slug}
											{/* </a> */}
										</td>
										<td className="text-left py-2 w-2/6 hidden md:table-cell">
											{item.url}
										</td>
										<td className="aspect-square p-1 w-16">
											<div
												className="relative w-6 aspect-square cursor-pointer"
												onClick={() => {
													setShowDeleteModal(true);
													setSelectedToDelete(item.shortUrl);
												}}
											>
												<Image src={deleteIcon} alt="delete" />
											</div>

											<Popup
												modal={true}
												open={showDeleteModal}
												onClose={() => setShowDeleteModal(false)}
												closeOnDocumentClick={false}
												closeOnEscape
												lockScroll
											>
												<div className="border border-gray-600 dark:border-gray-600 rounded-lg bg-white dark:bg-black/95 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
													<p className="w-full p-4 text-center px-8">
														Delete {selectedToDelete}?
													</p>
													<div className="w-full h-8 flex border-t border-gray-600 dark:border-gray-600">
														<button
															className="w-1/2 rounded-bl-lg transition hover:bg-gray-200 dark:hover:bg-gray-800"
															onClick={() => linkDeleteHandler(item.slug)}
														>
															Yes
														</button>
														<button
															className="w-1/2 rounded-br-lg transition hover:bg-gray-200 border-l border-gray-600 dark:border-gray-600 dark:hover:bg-gray-800"
															onClick={() => {
																setShowDeleteModal(false);
																setSelectedToDelete(null);
															}}
														>
															No
														</button>
													</div>
												</div>
											</Popup>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				) : (
					<section className="w-full px-[15%] min-h-[20rem] flex flex-col justify-center items-center">
						<h4 className="font-light text-lg">No data available</h4>
					</section>
				)}
			</main>
			<Footer />
		</>
	);
};

export default Account;
