import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBBHTRv8QfNKUtuYqUsIwVDlRnI-yY40A0",
  authDomain: "tenzies-63d1d.firebaseapp.com",
  projectId: "tenzies-63d1d",
  storageBucket: "tenzies-63d1d.appspot.com",
  messagingSenderId: "37010071612",
  appId: "1:37010071612:web:d0bfead2eb0478373a2339",
  measurementId: "G-7RGNP54Y4C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);