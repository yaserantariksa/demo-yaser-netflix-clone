// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyABvnw9qfVfB1fhgMn7TWnvVk4ciolQWmU",
	authDomain: "netflix-clone-d8873.firebaseapp.com",
	projectId: "netflix-clone-d8873",
	storageBucket: "netflix-clone-d8873.appspot.com",
	messagingSenderId: "532857727499",
	appId: "1:532857727499:web:5867ead0be851e317f750e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();

export default app;
export { auth, db };
