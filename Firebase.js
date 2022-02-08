import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBABhW4hhGll4h_1nMhVp7-WSUCo9awOU4",
  authDomain: "react-native-login-register-ui.firebaseapp.com",
  projectId: "react-native-login-register-ui",
  storageBucket: "react-native-login-register-ui.appspot.com",
  messagingSenderId: "170024715645",
  appId: "1:170024715645:web:8e598c415e6f0972fc3814",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbAuth = getFirestore(app);
