/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { AuthContext } from "../store/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

const initState = {
	username: "",
	email: "",
	password: "",
};

const HomePage = () => {
	const { currentUser, signupFun, signupWithGoogleFunc, signinFun } =
		AuthContext();
	const [page, setPage] = useState("signup");
	const [inpVals, setInpVals] = useState(initState);
	const { replace } = useRouter();

	const tooglePage = () => {
		setPage((prev) => (prev === "signup" ? "signin" : "signup"));
	};

	const changeHandler = (e) => {
		setInpVals((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		page === "signup"
			? await signupFun(inpVals.username, inpVals.email, inpVals.password)
			: await signinFun(inpVals.email, inpVals.password);

		setInpVals(initState);

		replace("/profile");
	};

	const signupWithGoogleHandler = async () => {
		await signupWithGoogleFunc();
		replace("/profile");
	};

	useEffect(() => {
		currentUser && replace("/profile");
	}, [currentUser]);

	return (
		<div className="flex items-center justify-center w-full h-screen">
			<Head>
				<title>Auth & CRUD app | Authorization</title>
				<meta
					name="description"
					content="Auth & CRUD app with firebase"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex flex-col items-center justify-center max-w-xs h-auto p-4 rounded-sm border border-gray-300 shadow shadow-slate-600/20">
				<h1 className="mb-5 text-2xl">
					{page === "signup" ? "Sign Up" : "Sign In"}
				</h1>

				<form className="w-full space-y-2" onSubmit={submitHandler}>
					{page === "signup" && (
						<input
							type="text"
							placeholder="Username"
							className="w-full h-8 px-2 border border-gray-100"
							name="username"
							value={inpVals.username}
							onChange={changeHandler}
						/>
					)}
					<input
						type="email"
						placeholder="Email address"
						className="w-full h-8 px-2 border border-gray-100"
						name="email"
						value={inpVals.email}
						onChange={changeHandler}
					/>
					<input
						type="password"
						placeholder="password"
						className="w-full h-8 px-2 border border-gray-100"
						name="password"
						value={inpVals.password}
						onChange={changeHandler}
					/>
					<button className="w-full h-8 bg-blue-600 text-white font-normal">
						Submit
					</button>
				</form>

				<button
					className="flex items-center justify-evenly mt-2 w-full h-8 border border-gray-200 hover:bg-black hover:text-white"
					onClick={signupWithGoogleHandler}>
					<span>
						<FcGoogle />
					</span>
					<span>Continue with Google</span>
				</button>

				<p className="mt-4 text-sm">
					{page === "signup"
						? "Already have an account?"
						: "Don't have an account?"}{" "}
					<span
						className="underline cursor-pointer hover:text-blue-600"
						onClick={tooglePage}>
						{page === "signup" ? "Signin" : "Signup"}
					</span>
				</p>
			</div>
		</div>
	);
};

export default HomePage;
