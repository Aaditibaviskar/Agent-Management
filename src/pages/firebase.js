import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-kQF65OMYDw1sFmUHZOfaHruUlwpV0e8",
  authDomain: "real-estate-crm-dc0f5.firebaseapp.com",
  projectId: "real-estate-crm-dc0f5",
  storageBucket: "real-estate-crm-dc0f5.firebasestorage.app",
  messagingSenderId: "945516080842",
  appId: "1:945516080842:web:a31607e4f06c47c58ece33",
  measurementId: "G-KZFBQHDN6Z"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);