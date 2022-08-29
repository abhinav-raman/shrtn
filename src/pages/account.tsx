import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const userLinks = await (
		await fetch(`http://localhost:3000/api/get-slug/`)
	).json();

	return {
		props: {
			userLinks,
		},
	};
}

const Account = () => {
	const session = useSession();
	return (
		<main className="w-full text-center">
			<h1 className="font-bold text-3xl">{session.data?.user?.name}</h1>
			<h2 className="font-thin text-2xl">{session.data?.user?.email}</h2>
			<section className="w-4/5"></section>
		</main>
	);
};

export default Account;
