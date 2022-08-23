import { useState } from "react";

const LinkCreateForm = () => {
	const [enteredUserLink, setEnteredUserLink] = useState("");
	const [enteredSlug, setEnteredSlug] = useState("");
	const [responseData, setResponseData] = useState<undefined | any>(null);

	const createShortLink = async () => {
		console.log(enteredUserLink, enteredSlug);

		const result: any = await (
			await fetch(
				`/api/create-url?slug=${enteredSlug}&userLink=${enteredUserLink}`
			)
		).json();
		setResponseData(result);
		console.log(result);
	};
	return (
		<section className="w-1/2 flex justify-center flex-col">
			<div className="w-full text-center">
				{(process.env.NODE_ENV === "development"
					? "localhost:3000"
					: "http://shrt-en.vercel.app") + "/ "}
				<input
					name="slug"
					value={enteredSlug}
					className="border border-gray-400 rounded px-2 py-1"
					placeholder="Choose a slug"
					onChange={({ target }) => setEnteredSlug(target.value)}
				/>
			</div>
			<div className="w-full text-center my-2">
				<input
					name="link"
					value={enteredUserLink}
					className="border border-gray-400 rounded px-2 py-1"
					placeholder="Enter a link"
					onChange={({ target }) => setEnteredUserLink(target.value)}
				/>
			</div>
			<div className="w-full text-center my-4">
				<button
					className="border border-gray-600 p-2 rounded disabled:bg-gray-100 disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed"
					onClick={createShortLink}
					disabled={!enteredUserLink.length || !enteredSlug.length}
				>
					Create
				</button>
			</div>
			<div className="w-full text-center my-4">
				{responseData && responseData.data && (
					<a
						className="text-blue-600"
						href={responseData.data.shortUrl}
						target="_blank"
						rel="noreferrer"
					>
						{responseData.data.shortUrl}
					</a>
				)}
				{responseData && responseData.error}
			</div>
		</section>
	);
};

export default LinkCreateForm;
