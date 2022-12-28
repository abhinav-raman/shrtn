import Link from "next/link";

const Footer = () => {
	return (
		<footer className="w-full h-20">
			<h4 className="w-full text-center text-base mb-1">
				Made with &#10084; by Abhinav<sup>&#169;</sup> 2022
			</h4>
			<h4 className="w-full text-center text-base">
				<Link href={"https://github.com/abhinav-raman"} target="_blank">
					Github
				</Link>
				{" | "}
				<Link href={"https://twitter.com/_abhinavraman"} target="_blank">
					Twitter
				</Link>
			</h4>
		</footer>
	);
};

export default Footer;
