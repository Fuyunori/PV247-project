import { initializeApp } from 'firebase/app';
import { collection, CollectionReference, doc, DocumentReference, getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { StoredConfiguration } from '../models/Configuration';

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyDoJhVhK_6IQQW7zakkPM4LLKB878mWYj0',
  authDomain: 'pv247-project-2021.firebaseapp.com',
  projectId: 'pv247-project-2021',
  storageBucket: 'pv247-project-2021.appspot.com',
  messagingSenderId: '26699009165',
  appId: '1:26699009165:web:02ecdafea6ff06816426c4',
});

// Authentication
const provider = new GoogleAuthProvider();
const auth = getAuth();

// Sign in handler
export const logIn = () => signInWithPopup(auth, provider);

// Sign out handler
export const logOut = () => signOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) => onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// Collections
export const configurationsCollection = collection(db, 'configurations') as CollectionReference<StoredConfiguration>;

export const configurationDocument = (id: string) =>
  doc(db, 'configurations', id) as DocumentReference<StoredConfiguration>;
