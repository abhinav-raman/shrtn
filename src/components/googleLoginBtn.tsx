import { useSession, signIn, signOut } from "next-auth/react";
export default function GoogleLogin() {
	const { data: session } = useSession();

	return (
		<button
			className="border border-gray-600 rounded-xl p-2"
			onClick={() => signIn("google")}
		>
			Login with Google
		</button>
	);
}
