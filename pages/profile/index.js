/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { AuthContext } from "../../store/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import WishList from "../../components/WishList";

const ProfilePage = () => {
	const { currentUser, signoutFun } = AuthContext();
	const { replace } = useRouter();

	const signoutHandler = async () => {
		await signoutFun();
		replace("/");
	};

	useEffect(() => {
		!currentUser && replace("/");
	}, [currentUser]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-screen">
			<Head>
				<title>Auth & CRUD app | Profile</title>
				<meta
					name="description"
					content="Auth & CRUD app with firebase"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="mb-5 text-2xl">Sign Up</h1>
			<div>
				<p>
					Username: <span>{currentUser?.displayName}</span>
				</p>
				<p>
					Email: <span>{currentUser?.email}</span>
				</p>
			</div>

			<button
				className="w-20 h-8 mt-6 bg-blue-600 text-white font-normal"
				onClick={signoutHandler}>
				Sign out
			</button>

			<WishList />
		</div>
	);
};

export default ProfilePage;
