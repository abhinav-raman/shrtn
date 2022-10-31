import Link from "next/link";

const Footer = () => {
	return (
		<footer className="w-full h-20">
			<h4 className="w-full text-center text-base">
				Made with &#10084; by Abhinav<sup>&#169;</sup> 2022
				<br />
				<a href={"https://github.com/abhinav-raman"} target="_blank" rel="noreferrer">
					Github
				</a>
				{" | "}
				<a href={"https://twitter.com/_abhinavraman"} target="_blank" rel="noreferrer">
					Twitter
				</a>
			</h4>
		</footer>
	);
};

export default Footer;
