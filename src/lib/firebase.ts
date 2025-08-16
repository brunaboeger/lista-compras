// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChEJ_ETe4ErNPGcoGEJQnEzCQrH4hSayI",
  authDomain: "mercado-compras-lista.firebaseapp.com",
  projectId: "mercado-compras-lista",
  storageBucket: "mercado-compras-lista.firebasestorage.app",
  messagingSenderId: "403802124401",
  appId: "1:403802124401:web:bb04c4122423bbd69debd0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
