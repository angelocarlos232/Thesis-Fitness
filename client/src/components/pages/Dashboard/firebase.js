import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAaOHO5LLk8fMkUdbgUkhkf28RGN-BKSL8",
    authDomain: "fitness-gen.firebaseapp.com",
    projectId: "fitness-gen",
    storageBucket: "fitness-gen.appspot.com",
    messagingSenderId: "894991786968",
    appId: "1:894991786968:web:9cd29062cbd92b8b6b48ad",
    measurementId: "G-L030ENJ0MS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };