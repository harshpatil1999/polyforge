// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "polyforge-6fa6c.firebaseapp.com",
  projectId: "polyforge-6fa6c",
  storageBucket: "polyforge-6fa6c.firebasestorage.app",
  messagingSenderId: "49992126521",
  appId: "1:49992126521:web:977ed66c638729eb8dfde8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
