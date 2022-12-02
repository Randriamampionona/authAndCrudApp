import { createContext, useContext, useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase.config";

const Context = createContext(null);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const provider = new GoogleAuthProvider();

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				setCurrentUser(user);
			}),
		[]
	);

	const signupFun = async (username, email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, {
			displayName: username,
		});
	};

	const signupWithGoogleFunc = async () => {
		await signInWithPopup(auth, provider);
	};

	const signinFun = async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	const signoutFun = async () => {
		await signOut(auth);
	};

	const values = {
		currentUser,
		signupFun,
		signupWithGoogleFunc,
		signinFun,
		signoutFun,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const AuthContext = () => {
	return useContext(Context);
};
