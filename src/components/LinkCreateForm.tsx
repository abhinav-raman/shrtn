import { useSession } from "next-auth/react";
import { useState } from "react";

import { debounce } from "ts-debounce";

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
		<section
			className={`w-1/2 pl-8 flex justify-center flex-col p-4 transition-width duration-300 ease-out`}
		>
			<div className="w-full flex my-2">
				<p className="pr-2 py-1 font-medium">
					{(process.env.NODE_ENV === "development"
						? "localhost:3000"
						: "http://shrt-en.vercel.app") + "/ "}
				</p>
				<input
					autoComplete="off"
					name="slug"
					value={enteredSlug}
					className="outline outline-2 outline-gray-400 rounded px-2 py-[2px] focus:outline-[3px] focus:outline-teal-600"
					placeholder="Choose a slug"
					onChange={async ({ target }) => {
						setEnteredSlug(target.value);
						if (target.value.length <= 3) {
							setSlugInvalidMsg("Slug must be atleast 4 characters long");
              return
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
					className="outline outline-2 outline-gray-400 rounded px-2 py-[2px] focus:outline-[3px] focus:outline-teal-600"
					placeholder="Enter a link"
					onChange={({ target }) => setEnteredUserLink(target.value)}
				/>
			</div>
			<div className="w-full text-left my-4">
				<button
					className="px-3 py-1 rounded transition-all bg-teal-600 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
					onClick={createShortLink}
					disabled={!enteredUserLink.length || !enteredSlug.length}
				>
					Create
				</button>
			</div>
			{responseData && responseData.data && (
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
			)}
			{slugInvalidMsg.length > 0 && (
				<div className="w-full text-left my-4">{slugInvalidMsg}</div>
			)}
		</section>
	);
};

export default LinkCreateForm;
