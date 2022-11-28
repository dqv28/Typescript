
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_m0HKXlcdtzO9zX0HjEyRHtOPfow-W0k",
    authDomain: "my-app-fa32c.firebaseapp.com",
    projectId: "my-app-fa32c",
    storageBucket: "my-app-fa32c.appspot.com",
    messagingSenderId: "506001695564",
    appId: "1:506001695564:web:defe496d37175c3c5ca5e9",
    measurementId: "G-E9HKQ62WVP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);