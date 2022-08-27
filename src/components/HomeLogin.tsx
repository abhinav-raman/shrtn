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
			<section
				className={`w-1/2 flex justify-center flex-col p-4 transition-width duration-300 ease-out hover:w-4/5`}
			>
				<div className="w-full flex items-end flex-col">
					<h1 className="w-full text-right text-2xl mb-4 font-medium">
						You know you can save your links?
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
		<section
			className={`w-1/2 flex justify-center flex-col p-4 transition-width duration-300 ease-out hover:w-4/5`}
		>
			<h1 className="w-full text-right text-4xl my-2">{userData.user?.name}</h1>
			<h3 className="w-full text-right text-xl my-2">{userData.user?.email}</h3>
			<div className="w-full text-right mt-4 mb-4">
				<button
					className="bg-gradient-to-r from-violet-800 to-blue-800 text-white rounded py-1 px-3 mr-4"
					onClick={() => router.push("/account")}
				>
					Manage Account
				</button>
				<button
					className="bg-red-600 text-white rounded py-1 px-3"
					onClick={() => signOut()}
				>
					Logout
				</button>
			</div>
		</section>
	);
};

export default HomeLogin;
