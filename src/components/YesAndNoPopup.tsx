import dynamic from "next/dynamic";

const Popup = dynamic(() => import("reactjs-popup"));

type YesAndNoPopupPropTypes = {
	isOpen: boolean;
	onClose: () => void;
	onYes: () => void;
	onNo: () => void;
	title: string;
	description?: string;
};

const YesAndNoPopup = ({
	isOpen,
	onClose,
	onYes,
	onNo,
	title,
	description,
}: YesAndNoPopupPropTypes) => {
	return (
		<Popup
			modal={true}
			open={isOpen}
			onClose={onClose}
			closeOnDocumentClick={false}
			closeOnEscape
			lockScroll
		>
			<div className="border border-gray-600 dark:border-gray-600 rounded-lg bg-white dark:bg-black/95 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
				<p className="w-full p-4 text-center px-8">{title}</p>
				{description && (
					<p className="w-full p-4 text-center px-8">{description}</p>
				)}
				<div className="w-full h-8 flex border-t border-gray-600 dark:border-gray-600">
					<button
						className="w-1/2 rounded-bl-lg transition hover:bg-gray-200 dark:hover:bg-gray-800"
						onClick={onYes}
					>
						Yes
					</button>
					<button
						className="w-1/2 rounded-br-lg transition hover:bg-gray-200 border-l border-gray-600 dark:border-gray-600 dark:hover:bg-gray-800"
						onClick={onNo}
					>
						No
					</button>
				</div>
			</div>
		</Popup>
	);
};

export default YesAndNoPopup;
