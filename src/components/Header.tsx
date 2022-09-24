const Header = () => {
	return (
		<header className="w-full h-24 py-4 flex justify-center">
			<h1 className="text-5xl font-bold bg-gradient-to-r from-violet-800 to-blue-800 dark:from-violet-400 dark:to-blue-400 text-transparent bg-clip-text">
				Shrtn
			</h1>
			<h1 className="text-5xl font-extralight hidden md:inline">&nbsp;your links</h1>
		</header>
	);
};

export default Header;
