// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC29o-jkAJqzofXsdLm2p6vctmLKbN8tIc",
  authDomain: "mchacks10-15e00.firebaseapp.com",
  projectId: "mchacks10-15e00",
  storageBucket: "mchacks10-15e00.appspot.com",
  messagingSenderId: "343647840157",
  appId: "1:343647840157:web:955a88c73d313a5a5a3174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);