import { signIn } from "next-auth/react";

const GoogleLoginBtn = () => {
	return (
		<button
			className="border border-gray-600 rounded-xl p-2"
			onClick={() => signIn("google")}
		>
			Login with Google
		</button>
	);
};

export default GoogleLoginBtn;
