


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQbyrGL5fCr656A32LEuJHyvqITzLq3gE",
  authDomain: "virtual-try-on-7c006.firebaseapp.com",
  projectId: "virtual-try-on-7c006",
  storageBucket: "virtual-try-on-7c006.appspot.com",
  messagingSenderId: "350238787683",
  appId: "1:350238787683:web:c5835ba53a2c31189e1056",
};  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
