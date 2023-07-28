// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAstMz6njGY-ZK1oHzlzmz7TyEVVTbQKUQ",
  authDomain: "votacionesmanager.firebaseapp.com",
  projectId: "votacionesmanager",
  storageBucket: "votacionesmanager.appspot.com",
  messagingSenderId: "875663750311",
  appId: "1:875663750311:web:40a5e5a2622c7e4e2c9782",
  measurementId: "G-ZS7VKKHJ77"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
const analytics = getAnalytics(fb);

export const db = fb.firestore;