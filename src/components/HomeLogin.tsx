import { signOut, useSession } from "next-auth/react";
import GoogleLogin from "./GoogleLoginBtn";

const HomeLogin = () => {
	const { data: session } = useSession();

	if (!session) {
		return (
			<section className="w-1/2 text-center">
				<h1 className="w-full text-center">
					You know you can save your shortened links?
					<br /> Try loggin in.
				</h1>
				<GoogleLogin />
			</section>
		);
	}

	return (
		<section className="w-1/2 flex justify-center flex-col p-4">
			<h1 className="w-full text-right text-4xl my-2">{session.user?.name}</h1>
			<h3 className="w-full text-right text-xl my-2">{session.user?.email}</h3>
			<div className="w-full text-right mt-4">
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
