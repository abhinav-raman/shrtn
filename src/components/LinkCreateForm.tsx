import { useSession } from "next-auth/react";
import { useState } from "react";

import { debounce } from "ts-debounce";
import { BASE_URL } from "../utils/constants";

const checkIfSlugExists = debounce(async (slug: string) => {
	const response = await (await fetch(`/api/get-slug?slug=${slug}`)).json();
	return response;
}, 400);

const LinkCreateForm = () => {
	const { data } = useSession();

	const [enteredUserLink, setEnteredUserLink] = useState<String>("");
	const [enteredSlug, setEnteredSlug] = useState<String>("");
	const [responseData, setResponseData] = useState<undefined | any>(null);
	const [slugInvalidMsg, setSlugInvalidMsg] = useState<String>("");

	const createShortLink = async () => {
		console.log(enteredUserLink, enteredSlug);

		const result: any = await (
			await fetch(
				`/api/create-url?slug=${enteredSlug}&userLink=${enteredUserLink}&email=${data?.user?.email}`
			)
		).json();
		setResponseData(result);
	};

	return (
		<section className={`w-full pl-8 p-4 pr-4 md:w-1/2 md:pr-[min(10rem,10%)]`}>
			{responseData && responseData.data ? (
				<div className="pt-16">
					<div className="flex w-full text-left my-4">
						<p className="font-medium text-lg leading-[34px]">
							{responseData.data.shortUrl}
						</p>
						<button
							className="py-1 px-3 border border-gray-400 mx-2 rounded"
							onClick={() => window.open(responseData.data.shortUrl, "_blank")}
						>
							Go
						</button>
						<button
							className="py-1 px-3 border border-gray-400 mr-4 rounded"
							onClick={() =>
								navigator.clipboard.writeText(responseData.data.shortUrl)
							}
						>
							Copy
						</button>
					</div>
					<button
						className="py-1 px-3 border border-gray-400 mr-4 rounded"
						onClick={() => {
							setResponseData(null);
							setEnteredSlug("");
							setEnteredUserLink("");
						}}
					>
						Reset
					</button>
				</div>
			) : (
				<>
					<p className="w-full text-right h-8 font-bold text-red-500 dark:text-rose-500 md:my-4">
						{slugInvalidMsg}
					</p>
					<div className="w-full flex flex-col my-2 md:flex-row">
						<p className="pr-2 py-1 font-medium mr-8 my-2 md:my-0 whitespace-nowrap">
							{BASE_URL}
						</p>
						<input
							autoComplete="off"
							name="slug"
							type="string"
							value={enteredSlug as string}
							className="w-full dark:text-black outline outline-2 outline-gray-400 rounded px-2 py-[2px] focus:outline-violet-600"
							placeholder="Choose a slug"
							onChange={async ({ target }) => {
								setEnteredSlug(target.value);
								if (target.value.length === 0) {
									setSlugInvalidMsg("");
									return;
								}
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
					<div className="w-full flex flex-col my-2 md:flex-row">
						<p className="pr-2 py-1 font-medium mr-8 my-2 md:my-0">Link</p>
						<input
							autoComplete="off"
							name="link"
							value={enteredUserLink as string}
							className="w-full dark:text-black outline outline-2 outline-gray-400 rounded px-2 py-[2px] focus:outline-violet-600"
							placeholder="Enter a link"
							onChange={({ target }) => setEnteredUserLink(target.value)}
						/>
					</div>
					<div className="w-full text-left my-4">
						<button
							className="px-3 py-1 rounded bg-gradient-to-r from-violet-800 to-blue-800 dark:from-violet-500 dark:to-blue-500 text-white disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-400 dark:disabled:to-gray-400 disabled:cursor-not-allowed"
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
