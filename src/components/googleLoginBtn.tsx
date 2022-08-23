import { signIn } from "next-auth/react";

const GoogleLogin = () => {

	return (
		<button
			className="border border-gray-600 rounded-xl p-2"
			onClick={() => signIn("google")}
		>
			Login with Google
		</button>
	);
}

export default GoogleLogin;