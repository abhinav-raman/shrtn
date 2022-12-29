import dynamic from "next/dynamic";
const Footer = dynamic(() => import("./Footer"));
const Header = dynamic(() => import("./Header"));

const Layout = ({ children }: any) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
