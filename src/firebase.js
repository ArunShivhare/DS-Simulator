import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ds-simulator-68bd1.firebaseapp.com",
  projectId: "ds-simulator-68bd1",
  storageBucket: "ds-simulator-68bd1.firebasestorage.app",
  messagingSenderId: "404811198574",
  appId: "1:404811198574:web:477343d6138f1490b5b67f",
  measurementId: "G-HGK6427Z2N"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();