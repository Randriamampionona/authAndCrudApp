import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDK5jhnU7GUIuz86-e7OCERR9Xyg8R8jek",
	authDomain: "chat-app-e145b.firebaseapp.com",
	projectId: "chat-app-e145b",
	storageBucket: "chat-app-e145b.appspot.com",
	messagingSenderId: "363868362790",
	appId: "1:363868362790:web:05f0d98175dc3930262ee7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
