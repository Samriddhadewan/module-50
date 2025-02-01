// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbQxOGfzfZDH6T8OmVFkG-p_P_LH3_r4c",
  authDomain: "email-pass-auth-73aee.firebaseapp.com",
  projectId: "email-pass-auth-73aee",
  storageBucket: "email-pass-auth-73aee.firebasestorage.app",
  messagingSenderId: "632723279112",
  appId: "1:632723279112:web:cf8faf292e0c9aa2a9f0bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;