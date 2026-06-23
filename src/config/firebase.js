import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpcV5zgHyhx4YUWAgZN6qYJfgiXjR2SDw",
  authDomain: "nongkrongyuk.firebaseapp.com",
  projectId: "nongkrongyuk",
  storageBucket: "nongkrongyuk.firebasestorage.app",
  messagingSenderId: "432768080658",
  appId: "1:432768080658:web:f6097099292e50942f31cb",
  measurementId: "G-27Q9P4FSQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const db = getFirestore(app);