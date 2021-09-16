import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9IIk2yADQHTjdVKAZtx65JNDHXxDT1kQ",
  authDomain: "diplomacy-23577.firebaseapp.com",
  databaseURL: "https://diplomacy-23577.firebaseio.com",
  projectId: "diplomacy-23577",
  storageBucket: "diplomacy-23577.appspot.com",
  messagingSenderId: "35624063517",
  appId: "1:35624063517:web:fc1ae80de90c6f1b962cf4",
  measurementId: "G-7E6ZCVZTVV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
