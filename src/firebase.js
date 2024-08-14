// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"; // Correct import for Storage functions
import { useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export async function Upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, `${currentUser.uid}.png` || `${currentUser.uid}.jpg` || `${currentUser.uid}.svg`);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setLoading(false);
}

export async function uploadPost(file , currentPost , setLoading) {
  const postRef = ref(storage, `${post.id}.png` || `${post.id}.jpg` || `${post.id}.svg`);
  const snapShot = await uploadBytes(postRef, file);
  const postPhotoURL = await getDownloadURL(fileRef);
  updateProfile(currentPost, { photoURL });
  setLoading(false);
}