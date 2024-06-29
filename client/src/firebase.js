// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "petmanagement-38846.firebaseapp.com",
  projectId: "petmanagement-38846",
  storageBucket: "petmanagement-38846.appspot.com",
  messagingSenderId: "6588009426",
  appId: "1:6588009426:web:11dbb1964e636d1991960b",
  measurementId: "G-JE4MG5X14R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);