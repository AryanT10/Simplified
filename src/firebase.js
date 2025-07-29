// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXdChUV-Ugnz43-pnGp2-mLtY3wopsf4k",
  authDomain: "simplified-f6b90.firebaseapp.com",
  projectId: "simplified-f6b90",
  storageBucket: "simplified-f6b90.firebasestorage.app",
  messagingSenderId: "755096057901",
  appId: "1:755096057901:web:ba03b5585f76b18c7a60a4",
  measurementId: "G-7SD47B1TCQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
