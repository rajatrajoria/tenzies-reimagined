import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC7M7qYuIQj7CRtycKOYNPx8xjtdF8Oeis",
    authDomain: "tenzies-2023.firebaseapp.com",
    projectId: "tenzies-2023",
    storageBucket: "tenzies-2023.appspot.com",
    messagingSenderId: "299135600237",
    appId: "1:299135600237:web:69c2679c73fe21b9062164",
    measurementId: "G-ZYR28CQNJ7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);