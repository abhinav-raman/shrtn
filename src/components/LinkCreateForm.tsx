import { useSession } from "next-auth/react";
import { useState } from "react";

const LinkCreateForm = () => {
	const { data } = useSession();

	const [enteredUserLink, setEnteredUserLink] = useState("");
	const [enteredSlug, setEnteredSlug] = useState("");
	const [responseData, setResponseData] = useState<undefined | any>(null);
	const [areInputsFocused, setAreInputsFocused] = useState(false);

	const createShortLink = async () => {
		console.log(enteredUserLink, enteredSlug);

		const result: any = await (
			await fetch(
				`/api/create-url?slug=${enteredSlug}&userLink=${enteredUserLink}&email=${data?.user?.email}`
			)
		).json();
		setResponseData(result);
		console.log(result);
	};
	return (
		<section
			className={`w-1/2 pl-8 flex justify-center flex-col p-4 transition-width duration-300 ease-out hover:w-4/5 ${
				areInputsFocused ? "w-4/5" : ""
			}`}
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
					onChange={({ target }) => setEnteredSlug(target.value)}
					onFocus={() => setAreInputsFocused(true)}
					onBlur={() => setAreInputsFocused(false)}
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
					onFocus={() => setAreInputsFocused(true)}
					onBlur={() => setAreInputsFocused(false)}
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
			{responseData && responseData.error && (
				<div className="w-full text-left my-4">
					{responseData && responseData.error}
				</div>
			)}
		</section>
	);
};

export default LinkCreateForm;
