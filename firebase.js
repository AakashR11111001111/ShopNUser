// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9zhjfJC95_LWoQAOnVTGHLeKK20wspXU",
  authDomain: "shopping-app-f85df.firebaseapp.com",
  projectId: "shopping-app-f85df",
  storageBucket: "shopping-app-f85df.firebasestorage.app",
  messagingSenderId: "228839032637",
  appId: "1:228839032637:web:dd4399227072d589c06754"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
