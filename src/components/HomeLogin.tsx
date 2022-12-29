import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";
const GoogleLoginBtn = dynamic(() => import("./GoogleLoginBtn"));

type HomeLoginProps = {
	userData: Session | null;
};

const HomeLogin = ({ userData }: HomeLoginProps) => {
	const router = useRouter();
	const sidebarRef = useRef<HTMLElement | null>(null);
	const backdropRef = useRef<HTMLDivElement | null>(null);

	return (
		<>
			<div
				ref={backdropRef}
				className="top-0 left-0 -translate-x-full absolute w-screen h-screen z-10 bg-white/50 dark:bg-black/50 backdrop-filter backdrop-blur-sm transition"
				onClick={() => {
					sidebarRef.current?.classList.add("-translate-x-full");
					sidebarRef.current?.classList.remove("-translate-x-[4rem]");
					backdropRef.current?.classList.remove("translate-x-0");
					backdropRef.current?.classList.add("-translate-x-full");
				}}
			></div>
			<aside
				ref={sidebarRef}
				className={`rounded-r-2xl pt-16 pl-20 p-4 w-screen h-screen absolute top-0 left-0 transition -translate-x-full bg-black/25 dark:bg-black/75 md:dark:bg-transparent md:translate-x-0 md:relative z-40 md:w-1/2 md:h-auto md:pr-8 md:block md:z-0 md:bg-transparent`}
			>
				<div className="absolute p-4 z-50 right-[-3.5rem] top-4 rounded-tr rounded-br md:hidden">
					<button
						className={`flex flex-col p-1`}
						onClick={() => {
							if (sidebarRef.current?.classList.contains("-translate-x-full")) {
								sidebarRef.current?.classList.remove("-translate-x-full");
								sidebarRef.current?.classList.add("-translate-x-[4rem]");
								backdropRef.current?.classList.remove("-translate-x-full");
								backdropRef.current?.classList.add("translate-x-0");
							} else {
								sidebarRef.current?.classList.add("-translate-x-full");
								sidebarRef.current?.classList.remove("-translate-x-[4rem]");
								backdropRef.current?.classList.remove("translate-x-0");
								backdropRef.current?.classList.add("-translate-x-full");
							}
						}}
					>
						<div className="w-4 h-[2px] border-0 bg-black dark:bg-white rotate-45 translate-x-[4px] -translate-y-[3px]"></div>
						<div className="w-4 h-[2px] border-0 bg-black dark:bg-white"></div>
						<div className="w-4 h-[2px] border-0 bg-black dark:bg-white -rotate-45 translate-x-[4px] translate-y-[3px]"></div>
					</button>
				</div>
				{userData ? (
					<>
						<h1 className="w-full text-left text-2xl font-bold my-2 md:text-4xl md:text-right">
							{userData.user?.name}
						</h1>
						<h3 className="w-full text-left text-lg font-light my-2 md:text-xl md:text-right">
							{userData.user?.email}
						</h3>
						<div className="w-full mt-12 text-left my-4 text-lg md:text-base md:text-right md:mt-0">
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
					</>
				) : (
					<div className="w-full flex items-left flex-col md:items-end">
						<h1 className="w-full text-left text-lg mb-4 font-medium md:text-2xl md:text-right">
							You know you can manage your links?
							<br /> Try Logging In
						</h1>
						<div className="text-left mt-4">
							<GoogleLoginBtn />
						</div>
						<p className="text-left mt-4 text-xs text-gray-600">
							Disclaimer: Your data is safe and we dont&apos;t spam your inbox.
						</p>
					</div>
				)}
			</aside>
		</>
	);

	// if (!userData) {
	// 	return (
	// 		<aside
	// 			className={`hidden w-full pt-[64px] p-4 md:w-1/2 md:pr-8 md:block`}
	// 		>
	// 			<div className="w-full flex items-center flex-col md:items-end">
	// 				<h1 className="w-full text-center text-2xl mb-4 font-medium md:text-right">
	// 					You know you can manage your links?
	// 					<br /> Try Logging In
	// 				</h1>
	// 				<div className="text-center mt-4">
	// 					<GoogleLoginBtn />
	// 				</div>
	// 				<p className="text-center mt-4 text-xs text-gray-600">
	// 					Disclaimer: Your data is safe and we dont&apos;t spam your inbox.
	// 				</p>
	// 			</div>
	// 		</aside>
	// 	);
	// }

	// return (
	// 	<aside className={`hidden w-full pt-[64px] p-4 md:w-1/2 md:pr-8 md:block`}>
	// 		<h1 className="w-full text-center text-4xl font-medium my-2 md:text-right">
	// 			{userData.user?.name}
	// 		</h1>
	// 		<h3 className="w-full text-center text-xl font-extralight my-2 md:text-right">
	// 			{userData.user?.email}
	// 		</h3>
	// 		<div className="w-full mt-12 text-center my-4 md:text-right md:mt-0">
	// 			<button
	// 				className="bg-gradient-to-r from-violet-800 to-blue-800 dark:from-violet-500 dark:to-blue-500 text-white rounded py-1 px-3 mr-4"
	// 				onClick={() => router.push("/account")}
	// 			>
	// 				Manage Account
	// 			</button>
	// 			<button
	// 				className="outline outline-2 bg-red-50 outline-red-600 text-red-600 rounded py-1 px-3"
	// 				onClick={() => signOut()}
	// 			>
	// 				Logout
	// 			</button>
	// 		</div>
	// 	</aside>
	// );
};

export default HomeLogin;
