import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Slug() {
	const router = useRouter();

	useEffect(() => {
		const { slug } = router.query;

		if (!slug || typeof slug !== "string") {
			console.log(slug, router, "Invalid slug");
			return;
		}

		(async () => {
			const { data } = await (await fetch(`/api/get-slug/${slug}`)).json();
			if (data) {
				console.log(data);
				router.replace(data.url);
			} else {
				console.log("No data");
				router.replace("/");
			}
		})();
	}, [router]);
}
