// import { initializeApp } from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage, ref} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD25vOk8VvmY9dCieNkttC7gS9U-TagSs8",
  authDomain: "first-ecommerce-48d0b.firebaseapp.com",
  projectId: "first-ecommerce-48d0b",
  storageBucket: "first-ecommerce-48d0b.appspot.com",
  messagingSenderId: "730684264002",
  appId: "1:730684264002:web:6fe48006fcd476c668e7db",
  measurementId: "G-KSFZSCC33B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// projectId: "first-ecommerce-48d0b",
export const auth= getAuth(app);
export const db =  getFirestore(app)
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account', //to prevent it from allowing only one account to sign in
});