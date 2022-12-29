type HomePageLayoutProps = {
	firstComponent: React.ReactElement;
	secondComponent: React.ReactElement;
};

const HomePageLayout = ({
	firstComponent,
	secondComponent,
}: HomePageLayoutProps) => {
	return (
		<main className="flex flex-col-reverse w-full justify-center p-4 md:h-[calc(60vh-6rem)] md:flex-row">
			{firstComponent}
			<span className="border-gray-600 border-b w-full h-full rounded hidden md:inline md:w-auto md:border-l md:border-b-0" />
			{secondComponent}
		</main>
	);
};

export default HomePageLayout;
