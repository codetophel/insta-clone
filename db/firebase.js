import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDYiq7i8fvf11ALI6M70z2U4rQ_cVrkFj0',
  authDomain: 'insta-clone-d89df.firebaseapp.com',
  projectId: 'insta-clone-d89df',
  storageBucket: 'insta-clone-d89df.appspot.com',
  messagingSenderId: '466635488844',
  appId: '1:466635488844:web:dd367c41d3b1fe25303ee9',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();

export { auth, db, provider, storage };
