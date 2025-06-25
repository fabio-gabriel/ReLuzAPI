import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCiNGx69_qP-hHXYKJ15irve8HtbE5hpxI",
  authDomain: "placassolares-d9d13.firebaseapp.com",
  databaseURL: "https://placassolares-d9d13-default-rtdb.firebaseio.com",
  projectId: "placassolares-d9d13",
  storageBucket: "placassolares-d9d13.firebasestorage.app",
  messagingSenderId: "12804805087",
  appId: "1:12804805087:web:4234732c0e7dd23ec8f46a",
  measurementId: "G-DX4X63323Z",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
