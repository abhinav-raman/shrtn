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
			<section className={`w-full pt-[64px] p-4 md:w-1/2 md:pr-8`}>
				<div className="w-full flex items-center flex-col md:items-end">
					<h1 className="w-full text-center text-2xl mb-4 font-medium md:text-right">
						You know you can manage your links?
						<br /> Try Logging In
					</h1>
					<div className="text-center mt-4">
						<GoogleLoginBtn />
					</div>
					<p className="text-center mt-4 text-xs text-gray-600">
						Disclaimer: Your data is safe and we dont&apos;t spam your inbox.
					</p>
				</div>
			</section>
		);
	}

	return (
		<section className={`w-full pt-[64px] p-4 md:w-1/2 md:pr-8`}>
			<h1 className="w-full text-center text-4xl font-medium my-2 md:text-right">
				{userData.user?.name}
			</h1>
			<h3 className="w-full text-center text-xl font-extralight my-2 md:text-right">
				{userData.user?.email}
			</h3>
			<div className="w-full mt-12 text-center my-4 md:text-right md:mt-0">
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
