// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAtYH-y_HflphHp249inZv9U7nPY1eHoFg",
  authDomain: "terminal-bimodal-santa-cruz.firebaseapp.com",
  projectId: "terminal-bimodal-santa-cruz",
  storageBucket: "terminal-bimodal-santa-cruz.appspot.com",
  messagingSenderId: "615295841931",
  appId: "1:615295841931:web:86b56faa22c2a21427868e",
  measurementId: "G-YGVPN8233M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth