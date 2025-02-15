import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAQbyrGL5fCr656A32LEuJHyvqITzLq3gE",
//   authDomain: "virtual-try-on-7c006.firebaseapp.com",
//   projectId: "virtual-try-on-7c006",
//   storageBucket: "virtual-try-on-7c006.appspot.com",
//   messagingSenderId: "350238787683",
//   appId: "1:350238787683:web:c5835ba53a2c31189e1056",
// };  

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAQbyrGL5fCr656A32LEuJHyvqITzLq3gE",
//   authDomain: "virtual-try-on-7c006.firebaseapp.com",
//   projectId: "virtual-try-on-7c006",
//   storageBucket: "virtual-try-on-7c006.appspot.com",
//   messagingSenderId: "350238787683",
//   appId: "1:350238787683:web:c5835ba53a2c31189e1056",
// };  

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
