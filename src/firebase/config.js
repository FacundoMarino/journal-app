// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"
import { apiKey, appI, authDomai, messagingSenderI, projectI, storageBucke } from "../helpers/variablesDeEntorno";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomai,
  projectId: projectI,
  storageBucket: storageBucke,
  messagingSenderId: messagingSenderI,
  appId: appI
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore(FirebaseApp)