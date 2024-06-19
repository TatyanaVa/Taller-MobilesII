// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSFOy5O9i3LWxR8C6OxNRODYqqVdr079Q",
  authDomain: "taller-d8725.firebaseapp.com",
  projectId: "taller-d8725",
  storageBucket: "taller-d8725.appspot.com",
  messagingSenderId: "687431758562",
  appId: "1:687431758562:web:2abd122015da792d7224bb"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth=getAuth(firebase);

export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const firestore = getFirestore(firebase);