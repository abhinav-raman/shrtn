import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";
const GoogleLoginBtn = dynamic(() => import("./GoogleLoginBtn"));
const Image = dynamic(() => import("next/image"));

import backIcon from "../assets/images/back-icon.svg";

type HomeLoginProps = {
	userData: Session | null;
};

const HomeLogin = ({ userData }: HomeLoginProps) => {
	const router = useRouter();
	const sidebarRef = useRef<HTMLElement | null>(null);
	const backdropRef = useRef<HTMLDivElement | null>(null);
	const backBtnRef = useRef<HTMLButtonElement | null>(null);

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
					backBtnRef.current?.classList.remove("rotate-0");
					backBtnRef.current?.classList.add("rotate-180");
				}}
			></div>
			<aside
				ref={sidebarRef}
				className={`rounded-r-2xl pt-16 pl-20 p-4 w-screen h-screen absolute top-0 left-0 transition -translate-x-full bg-black/25 dark:bg-black/75 md:dark:bg-transparent md:translate-x-0 md:relative z-40 md:w-1/2 md:h-auto md:pr-8 md:block md:z-0 md:bg-transparent`}
			>
				<div className="absolute p-4 z-50 right-[-3.5rem] top-4 rounded-tr rounded-br md:hidden">
					<button
						ref={backBtnRef}
						className={`flex flex-col p-1 rotate-180 dark:invert`}
						onClick={() => {
							if (sidebarRef.current?.classList.contains("-translate-x-full")) {
								sidebarRef.current?.classList.remove("-translate-x-full");
								sidebarRef.current?.classList.add("-translate-x-[4rem]");
								backdropRef.current?.classList.remove("-translate-x-full");
								backdropRef.current?.classList.add("translate-x-0");
								backdropRef.current?.classList.add("rotate-180");
								backBtnRef.current?.classList.remove("rotate-180");
								backBtnRef.current?.classList.add("rotate-0");
							} else {
								sidebarRef.current?.classList.add("-translate-x-full");
								sidebarRef.current?.classList.remove("-translate-x-[4rem]");
								backdropRef.current?.classList.remove("translate-x-0");
								backdropRef.current?.classList.add("-translate-x-full");
								backBtnRef.current?.classList.remove("rotate-0");
								backBtnRef.current?.classList.add("rotate-180");
							}
						}}
					>
						<Image src={backIcon} alt="back-icon" height={20} width={20} />
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
};

export default HomeLogin;
