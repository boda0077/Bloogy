import { useState, useRef, useEffect } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth, storage } from "../firebase.js"; // Ensure storage is imported correctly
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Create({ onAddPost }) {
  const [postTitle, setPostTitle] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [postText, setPostText] = useState("");
  const [toggleText, setToggleText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setPostImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let getName = "";

      if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          getName = docSnap.data().Name;
        } else {
          console.log("No such document! Try Again Later");
        }
      } else {
        console.log("User not logged in!");
        return;
      }

      let imageURL = photoURL; // Default to placeholder URL

      // Upload image to Firebase Storage if postImg is not null
      if (postImg) {
        setLoading(true);

        // Generate a unique ID for the post
        const postId = Date.now();

        // Create storage reference with post ID as part of the path
        const storageRef = ref(storage, `images/${postId}/${postImg.name}`);
        await uploadBytes(storageRef, postImg);

        imageURL = await getDownloadURL(storageRef);
      }

      const newPost = {
        id: Date.now(),
        postTitle: postTitle,
        postText: postText,
        postImg: imageURL,
      };

      // Add post data to Firestore
      await setDoc(doc(db, "PostsData", `${newPost.id}`), {
        // postID:newPost.id,
        postTitle: newPost.postTitle,
        postText: newPost.postText,
        postImg: newPost.postImg, // Store the image URL in Firestore
        userName: getName,
        uID: auth.currentUser.uid
      });

      // Call onAddPost after successfully setting document
      onAddPost(newPost);

      // Clear form fields
      setPostTitle("");
      setPostText("");
      setPostImg(null);

      // Toggle form visibility if needed
      if (check.current && btn.current) {
        check.current.classList.toggle("hidden");
        check.current.classList.toggle("grid");
        setToggleText(!toggleText);
      }

      setLoading(false); // Reset loading state
    } catch (error) {
      console.error("Error posting:", error);
      // Handle error (e.g., show error message)
      setLoading(false); // Reset loading state on error
    }
  };

  const check = useRef(null);
  const btn = useRef(null);

  const handleToggleForm = () => {
    if (check.current && btn.current) {
      check.current.classList.toggle("hidden");
      check.current.classList.toggle("grid");
      setToggleText(!toggleText);
    }
  };

  useEffect(() => {
    // You may want to update photoURL based on some condition
    // For now, it's static in your code
  }, []);

  return (
    <div className="  p-[2rem] w-full  gap-10 grid place-items-center">
      <span
        ref={btn}
        onClick={handleToggleForm}
        className="py-6 px-12 rounded-lg text-white hover:scale-105 transition-all cursor-pointer w-fit m-auto bg-orange-500 text-3xl"
      >
        {toggleText ? "Stop Creating" : "Create Post"}
      </span>

      <form
        ref={check}
        onSubmit={handleSubmit}
        id="post-form"
        className="hidden rounded-lg gap-8 w-[700px] m-auto bg-orange-500 py-8 px-10"
      >
        <div className="flex items-center gap-4">
          <label className="font-serif text-3xl">T:</label>
          <input
            onChange={handleTitleChange}
            value={postTitle}
            className="w-full py-3 px-4 text-xl rounded-md"
            type="text"
            placeholder="Title"
            required
          />
        </div>

        <textarea
          value={postText}
          onChange={handleTextChange}
          className="w-full h-[300px] py-3 px-4 rounded-md"
          id="post-content"
          placeholder="What You Think About...."
          required
        ></textarea>

        <div className="flex justify-between items-center">
          <label className="cursor-pointer" htmlFor="add-img">
            <i className="text-2xl text-white fa-solid fa-image"></i>
          </label>
          <input
            onChange={handleImgChange}
            className="hidden"
            type="file"
            id="add-img"
          />
          <button
            type="submit"
            disabled={loading || !postTitle || !postText}
            className="py-4 px-6 bg-white w-[175px] rounded-md text-2xl font-serif font-semibold hover:scale-105 text-orange-500"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
