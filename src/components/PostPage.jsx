import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth, db , storage } from "../firebase.js";
import { doc, getDoc  } from "firebase/firestore";
 import { getDownloadURL ,ref } from "firebase/storage";

function PostPage({ posts }) {
  const currentUser = useAuth(); // Assuming useAuth provides authenticated user details
  const [profileImageUrl , setProfileImgUrl] = useState( "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png");
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState('');
  const [img, setImg] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );

  const { postId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const docRef = doc(db, "PostsData", postId); // Fetch based on postId from URL
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTitle(docSnap.data().postTitle); // Ensure correct field names
          setText(docSnap.data().postText);
          setImg(docSnap.data().postImg); // Set the image URL from Firestore
          setUserName(docSnap.data().userName);

          const profileImageRef = ref(storage, `${docSnap.data().uID}.png`);
          const profileImageUrl = await getDownloadURL(profileImageRef);
          setProfileImgUrl(profileImageUrl);

        } else {
          console.log("No such document found for postId:", postId);
        }

      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }

    getData();

  }, [postId]); // Trigger effect whenever postId changes

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  if (!title && !text && !img) {
    return (
      <div className="flex items-center justify-center w-full h-[100vh]">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <svg
            fill="none"
            className="w-18 h-18 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid py-[5rem] px-[3rem]">
      <div className="  max-w-4xl mx-auto mt-8">
        <h1 className="text-5xl font-main font-semibold text-gray-800 mb-4">
          {title}
        </h1>
        <img
          className="mb-4 w-[600px] m-auto h-[600px]"
          src={img} // Display the fetched image URL
          alt="Post"
        />
        <p className=" first-letter:text-5xl first-letter:text-orange-500 tracking-wider leading-10 font-serif text-3xl text-gray-700">{text}</p>
      </div>
      <div className="flex items-center mt-12 gap-4">
        <img className="w-[60px] rounded-full" src={profileImageUrl} alt="admin pic" />
        <span className="font-mono text-xl font-semibold text-black ">
          {userName}
        </span>
      </div>
    </div>
  );
}

export default PostPage;
