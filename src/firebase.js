// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"; // Correct import for Storage functions
import { useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLyBD4oq_dH3nxW0MwdXZqS_ZpTAExBaE",
  authDomain: "blog-platform-007.firebaseapp.com",
  projectId: "blog-platform-007",
  storageBucket: "blog-platform-007.appspot.com",
  messagingSenderId: "1073231715409",
  appId: "1:1073231715409:web:574a3db7b8fb2ce189ec70",
  measurementId: "G-T6X57SWE5B",
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