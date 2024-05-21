
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDK_d1-7UvashnjkLLH-W4yQHsf4OmGzU4",
  authDomain: "solent-rc-shop.firebaseapp.com",
  projectId: "solent-rc-shop",
  storageBucket: "solent-rc-shop.appspot.com",
  messagingSenderId: "554092358787",
  appId: "1:554092358787:web:addb7626770e5b9b6a3fb6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
