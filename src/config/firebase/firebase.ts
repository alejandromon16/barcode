import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtYH-y_HflphHp249inZv9U7nPY1eHoFg",
  authDomain: "terminal-bimodal-santa-cruz.firebaseapp.com",
  projectId: "terminal-bimodal-santa-cruz",
  storageBucket: "terminal-bimodal-santa-cruz.appspot.com",
  messagingSenderId: "615295841931",
  appId: "1:615295841931:web:86b56faa22c2a21427868e",
  measurementId: "G-YGVPN8233M"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
const auth = getAuth(app);
const storage = getStorage(app);


export default {
  auth,
  db,
  storage
}

