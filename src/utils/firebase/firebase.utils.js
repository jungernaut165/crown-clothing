// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrhFFXEfVcWBt2JndNCcyJuiL3uxI5id0",
  authDomain: "crown-clothing-db-75c87.firebaseapp.com",
  projectId: "crown-clothing-db-75c87",
  storageBucket: "crown-clothing-db-75c87.appspot.com",
  messagingSenderId: "772099746165",
  appId: "1:772099746165:web:cad9995e120737abf80b3c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export function signInWithGooglePopup() {
  return signInWithPopup(auth, googleProvider);
}
export function signInWithGoogleRedirect() {
  return signInWithRedirect(auth, googleProvider);
}
export const db = getFirestore();

export async function createUserDocumentFromAuth(
  userAuth,
  additionalInformation = {}
) {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //if user data does not exist, then create (set) document inside database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date(); //log the time when the document was created
    try {
      //try to set document with the following JS object
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //if user data exits, then return userDocRef
  return userDocRef;
}

export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}
