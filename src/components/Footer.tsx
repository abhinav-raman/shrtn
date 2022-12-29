const Footer = () => {
	return (
		<footer className="w-full h-20">
			<h3 className="w-full text-center text-base mb-1">
				Made with &#10084; by Abhinav<sup>&#169;</sup> 2022
			</h3>
			<h3 className="w-full text-center text-base">
				<a
					href={"https://github.com/abhinav-raman"}
					target="_blank"
					rel="noreferrer"
				>
					Github
				</a>
				{" | "}
				<a
					href={"https://twitter.com/_abhinavraman"}
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
			</h3>
		</footer>
	);
};

export default Footer;
