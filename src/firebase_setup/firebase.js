// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7M7qYuIQj7CRtycKOYNPx8xjtdF8Oeis",
  authDomain: "tenzies-2023.firebaseapp.com",
  projectId: "tenzies-2023",
  storageBucket: "tenzies-2023.appspot.com",
  messagingSenderId: "299135600237",
  appId: "1:299135600237:web:69c2679c73fe21b9062164",
  measurementId: "G-ZYR28CQNJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);