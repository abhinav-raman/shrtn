import { useSession } from "next-auth/react";
import { useState } from "react";

import { debounce } from "ts-debounce";
import { BASE_URL } from "../utils/constants";

const checkIfSlugExists = async (slug: string) => {
	const response = await (await fetch(`/api/get-slug?slug=${slug}`)).json();
	return response;
};

const LinkCreateForm = () => {
	const { data } = useSession();

	const [enteredUserLink, setEnteredUserLink] = useState("");
	const [enteredSlug, setEnteredSlug] = useState("");
	const [responseData, setResponseData] = useState<undefined | any>(null);
	const [slugInvalidMsg, setSlugInvalidMsg] = useState("");

	const createShortLink = async () => {
		console.log(enteredUserLink, enteredSlug);

		const result: any = await (
			await fetch(
				`/api/create-url?slug=${enteredSlug}&userLink=${enteredUserLink}&email=${data?.user?.email}`
			)
		).json();
		setResponseData(result);
	};

	const debouncedGetLinkWithSLug = debounce(() => {
		console.log("calling get slug api");
	}, 1000);

	return (
		<section className={`w-1/2 pl-8 p-4 pr-[min(10rem,10%)]`}>
			{responseData && responseData.data ? (
				<>
					<div className="w-full text-left my-4">
						<a
							className="text-blue-600"
							href={responseData.data.shortUrl}
							target="_blank"
							rel="noreferrer"
						>
							{responseData.data.shortUrl}
						</a>
					</div>
					<button onClick={() => setResponseData(null)}>Reset</button>
				</>
			) : (
				<>
					<p className="w-full text-right my-4 h-8 font-bold text-red-500 dark:text-rose-500">
						{slugInvalidMsg}
					</p>
					<div className="w-full flex my-2">
						<p className="pr-2 py-1 font-medium">
							{/* {(process.env.NODE_ENV === "development"
								? "localhost:3000"
								: "http://shrt-en.vercel.app") + "/ "} */}
							{BASE_URL + "/ "}
						</p>
						<input
							autoComplete="off"
							name="slug"
							value={enteredSlug}
							className="w-full dark:text-black outline outline-2 outline-gray-400 rounded px-2 py-[2px]   focus:outline-violet-600"
							placeholder="Choose a slug"
							onChange={async ({ target }) => {
								setEnteredSlug(target.value);
								if (target.value.length <= 3) {
									setSlugInvalidMsg("Slug must be atleast 4 characters long");
									return;
								}
								setSlugInvalidMsg("");
								const response = await checkIfSlugExists(target.value);

								if (response.data) {
									setSlugInvalidMsg("Slug already exists");
								}
							}}
						/>
					</div>
					<div className="w-full flex my-2">
						<p className="pr-2 py-1 font-medium">Link</p>
						<input
							autoComplete="off"
							name="link"
							value={enteredUserLink}
							className="w-full dark:text-black outline outline-2 outline-gray-400 rounded px-2 py-[2px] focus:outline-violet-600"
							placeholder="Enter a link"
							onChange={({ target }) => setEnteredUserLink(target.value)}
						/>
					</div>
					<div className="w-full text-left my-4">
						<button
							className="px-3 py-1 rounded bg-gradient-to-r from-violet-800 to-blue-800 dark:from-violet-500 dark:to-blue-500 text-white disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
							onClick={createShortLink}
							disabled={!enteredUserLink.length || enteredSlug.length < 4}
						>
							Create
						</button>
					</div>
				</>
			)}
		</section>
	);
};

export default LinkCreateForm;
