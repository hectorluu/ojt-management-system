// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDXI0ziI1rvhbEI7b2vZeveeDyY7qvPeI",
  authDomain: "ojt-management-system-8f274.firebaseapp.com",
  projectId: "ojt-management-system-8f274",
  storageBucket: "ojt-management-system-8f274.appspot.com",
  messagingSenderId: "584243139099",
  appId: "1:584243139099:web:114a03b71734c6dd3b1ebe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
