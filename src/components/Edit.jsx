import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js"; // Ensure correct Firebase configuration import

function Edit() {
  const { postId } = useParams(); // Extract postId from URL params
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchPostData() {
      try {
        const docRef = doc(db, "PostsData", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          setTitle(postData.postTitle);
          setText(postData.postText);
        } else {
          console.log("No such document found!");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }

    fetchPostData();
  }, [postId]); // Fetch data whenever postId changes

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "PostsData", postId);
      await updateDoc(docRef, {
        postTitle: title,
        postText: text,
      });

      console.log("Document successfully updated!");
      // Optionally, you can redirect or perform any other actions upon successful update
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="p-[2rem] w-full gap-10 grid place-items-center">
      <form
        id="post-form"
        className="grid rounded-lg gap-8 w-[700px] m-auto bg-orange-500 py-8 px-10"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-4">
          <label className="font-serif text-3xl">Title:</label>
          <input
            value={title}
            onChange={handleTitleChange}
            className="w-full py-3 px-4 text-xl rounded-md"
            type="text"
            placeholder="Title"
            required
          />
        </div>

        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full h-[300px] py-3 px-4 rounded-md"
          id="post-content"
          placeholder="What You Think About...."
          required
        ></textarea>

        <div className="flex justify-between items-center">
          <label className="flex items-center gap-4" htmlFor="add-img">
            <mark className="text-white bg bg-orange-700 py-2 px-2 rounded-3xl">
              You cannot change image
            </mark>
          </label>
         
          <button
            type="submit"
            className="py-4 px-6 bg-white w-[175px] rounded-md text-2xl font-serif font-semibold hover:scale-105 text-orange-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
