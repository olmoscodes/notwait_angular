// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCp5zMAtticfBSYbNLgypaP8vqqhVc7KTk",
  authDomain: "notwait.firebaseapp.com",
  projectId: "notwait",
  storageBucket: "notwait.appspot.com",
  messagingSenderId: "752544174205",
  appId: "1:752544174205:web:6915481ad6eb17e806e114",
  measurementId: "G-1JVXDVCK97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
export const db = getFirestore(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);

export const gAuth = new GoogleAuthProvider();
