// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Do no share config in public
const firebaseConfig = {
  apiKey: "AIzaSyAm0DY7WMCP1MgveRICkfcX9BU8GPtEvfA",
  authDomain: "email-password-auth-faca9.firebaseapp.com",
  projectId: "email-password-auth-faca9",
  storageBucket: "email-password-auth-faca9.firebasestorage.app",
  messagingSenderId: "357543580083",
  appId: "1:357543580083:web:7263b35f6704a2a97afbc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const auth = getAuth(app);