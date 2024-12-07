import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcdGYoR_MWeNQ3MQMY6_Geez2kBOsZiEM",
  authDomain: "store-o-79734.firebaseapp.com",
  projectId: "store-o-79734",
  storageBucket: "store-o-79734.firebasestorage.app",
  messagingSenderId: "847807470184",
  appId: "1:847807470184:web:73f2c6121210280217b9dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
