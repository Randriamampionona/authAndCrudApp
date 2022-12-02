import { useCollection } from "react-firebase-hooks/firestore";
import {
	addDoc,
	collection,
	serverTimestamp,
	query,
	orderBy,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";

const collectionRef = collection(db, "wish_list");

const WishList = () => {
	const [wish, setWish] = useState("");
	const [value, loading, error] = useCollection(
		query(collectionRef, orderBy("timestamp", "desc"))
	);

	const addWishHandler = async () => {
		await addDoc(collectionRef, { wish, timestamp: serverTimestamp() });
		setWish("");
	};

	return (
		<div className="mt-8 max-w-xs w-full h-auto divide-y-[1px] divide-gray-300">
			<div className="flex flex-col gap-y-2 items-end w-full pb-4">
				<textarea
					className="w-full h-24 resize-none border border-gray-200 rounded p-2"
					placeholder="I whish..."
					value={wish}
					onChange={(e) => setWish(e.target.value)}
				/>
				<button
					className="w-auto h-8 px-6 bg-blue-600 text-white font-normal"
					onClick={addWishHandler}>
					Add wish
				</button>
			</div>

			<div className="pt-4">
				<h3 className="text-base mb-2 underline font-semibold">
					My whishlist:
				</h3>
				<ol className="max-h-96 overflow-y-auto">
					{loading && <span>Loading...</span>}
					{error && <span>Error accured, try again later</span>}

					{value?.docs
						.map((doc) => doc?.data())
						?.map((wish, i) => (
							<li key={i}>{wish.wish}</li>
						))}
				</ol>
			</div>
		</div>
	);
};

export default WishList;
