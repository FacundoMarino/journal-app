// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9F54QI0CjpEfsOs9d3sGlWHyT5P5DP_s",
  authDomain: "react-curso-675e8.firebaseapp.com",
  projectId: "react-curso-675e8",
  storageBucket: "react-curso-675e8.appspot.com",
  messagingSenderId: "498674143987",
  appId: "1:498674143987:web:83716c6bc1f7cce2cc5d86"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore(FirebaseApp)