
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics"; // optional

// Firebase config
export const firebaseConfig = {
    apiKey: "AIzaSyA3qS0u3XZVqI-H7QOjnTjnS2N8y44HZbI",
    authDomain: "my-store-a7c07.firebaseapp.com",
    projectId: "my-store-a7c07",
    storageBucket: "my-store-a7c07.firebasestorage.app",
    messagingSenderId: "270924746950",
    appId: "1:270924746950:web:0cfddf02cdcd137350c7c7",
    measurementId: "G-HLC9RKZM26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";


