// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration  ----este es con el firestore anterior de carolinas252
/*const firebaseConfig = {
  apiKey: "AIzaSyCSFOy5O9i3LWxR8C6OxNRODYqqVdr079Q",
  authDomain: "taller-d8725.firebaseapp.com",
  projectId: "taller-d8725",
  storageBucket: "taller-d8725.appspot.com",
  messagingSenderId: "687431758562",
  appId: "1:687431758562:web:2abd122015da792d7224bb"
};*/
const firebaseConfig = {

  apiKey: "AIzaSyDXJd7M77y--IMJ_Y7NVtEHqo1HhFqRLn0",

  authDomain: "taller-videojuego.firebaseapp.com",

  projectId: "taller-videojuego",

  storageBucket: "taller-videojuego.appspot.com",

  messagingSenderId: "762368084672",

  appId: "1:762368084672:web:84f015eb2f7838afbafb25",
  dataBaseURL:"https://taller-videojuego-default-rtdb.firebaseio.com/"

};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth=getAuth(firebase);

export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const firestore = getFirestore(firebase);

export const dbRealTime=getDatabase(firebase);