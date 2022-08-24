import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import GoogleLoginBtn from "./GoogleLoginBtn";

type HomeLoginProps = {
  userData: Session | null
}

const HomeLogin = ({ userData }: HomeLoginProps) => {
	if (!userData) {
		return (
			<section className="w-1/2 flex justify-center flex-col p-4">
				<h1 className="w-full text-center text-2xl mb-4">
					You know you can save your links?
					<br /> Try loggin in.
				</h1>
				<div className="w-full text-center mt-4">
					<GoogleLoginBtn />
				</div>
				<p className="w-full text-center mt-4 text-xs text-gray-600">
					Disclaimer: Your data is safe and we dont&apos;t spam your inbox.
				</p>
			</section>
		);
	}

	return (
		<section className="w-1/2 flex justify-center flex-col p-4">
			<h1 className="w-full text-right text-4xl my-2">{userData.user?.name}</h1>
			<h3 className="w-full text-right text-xl my-2">{userData.user?.email}</h3>
			<div className="w-full text-right mt-4 mb-4">
				<button className="bg-gradient-to-r from-violet-800 to-blue-800 text-white rounded py-1 px-3 mr-4">
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
