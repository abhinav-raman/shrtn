import Link from "next/link";

const Footer = () => {
	return (
		<footer className="w-full h-20">
			<h4 className="w-full text-center text-base">
				Made with &#10084; by Abhinav
				<br />
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
