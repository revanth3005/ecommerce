import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAnKjSd_bHlv9_5W918XVP0xfe7CtuI28s",
    authDomain: "ecommerce-d7a8d.firebaseapp.com",
    projectId: "ecommerce-d7a8d",
    storageBucket: "ecommerce-d7a8d.appspot.com",
    messagingSenderId: "913228433885",
    appId: "1:913228433885:web:dc1c7ebf741da82fb78e34"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
