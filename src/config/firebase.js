import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCs2U19WyWHzD2Wij5HoTdgO_WQ_RYpn_4",
	authDomain: "auth-study-49979.firebaseapp.com",
	projectId: "auth-study-49979",
	storageBucket: "auth-study-49979.appspot.com",
	messagingSenderId: "101930816727",
	appId: "1:101930816727:web:82a7c1a9335f99aa1a0c92",
	measurementId: "G-0R2YLT2YDP",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databaseApp = getFirestore(app);
