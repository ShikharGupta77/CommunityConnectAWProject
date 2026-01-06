import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebase = initializeApp({
    apiKey: "AIzaSyCTbULV4A_71vvUsZVqd5n3l4yEAR8kzDk",
    authDomain: "communitycreditpoints.firebaseapp.com",
    projectId: "communitycreditpoints",
    storageBucket: "communitycreditpoints.appspot.com",
    messagingSenderId: "445962679",
    appId: "1:445962679:web:62762fe09a7a5b0ea0b032",
});
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const functions = getFunctions(firebase);

export const storage = getStorage(firebase);
