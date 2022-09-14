import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleLoginBtn from "./GoogleLoginBtn";

type HomeLoginProps = {
	userData: Session | null;
};

const HomeLogin = ({ userData }: HomeLoginProps) => {
	const router = useRouter();

	if (!userData) {
		return (
			<section className={`w-1/2 pr-8 pt-[64px] p-4`}>
				<div className="w-full flex items-end flex-col">
					<h1 className="w-full text-right text-2xl mb-4 font-medium">
						You know you can manage your links?
						<br /> Try Logging In
					</h1>
					<div className="text-right mt-4">
						<GoogleLoginBtn />
					</div>
					<p className="text-right mt-4 text-xs text-gray-600">
						Disclaimer: Your data is safe and we dont&apos;t spam your inbox.
					</p>
				</div>
			</section>
		);
	}

	return (
		<section className={`w-1/2 pr-8 pt-[64px] p-4`}>
			<h1 className="w-full text-right text-4xl font-medium my-2">
				{userData.user?.name}
			</h1>
			<h3 className="w-full text-right text-xl font-extralight my-2">
				{userData.user?.email}
			</h3>
			<div className="w-full text-right my-4">
				<button
					className="bg-gradient-to-r from-violet-800 to-blue-800 dark:from-violet-500 dark:to-blue-500 text-white rounded py-1 px-3 mr-4"
					onClick={() => router.push("/account")}
				>
					Manage Account
				</button>
				<button
					className="outline outline-2 bg-red-50 outline-red-600 text-red-600 rounded py-1 px-3"
					onClick={() => signOut()}
				>
					Logout
				</button>
			</div>
		</section>
	);
};

export default HomeLogin;
