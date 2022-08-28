import { signIn } from "next-auth/react";
import Image from "next/image";

import googleLogo from "../assets/images/google-icon-logo.svg";

const GoogleLoginBtn = () => {
	return (
		<button
			className="h-max flex border border-gray-600 rounded-xl py-2 px-4"
			onClick={() => signIn("google")}
		>
			<p className="flex tex-base">
				<span className="relative h-6 w-6 mr-2">
					<Image src={googleLogo} alt="google" layout="fill" />
				</span>
				Continue with Google
			</p>
		</button>
	);
};

export default GoogleLoginBtn;
