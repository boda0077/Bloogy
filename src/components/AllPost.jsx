import { useState, useEffect } from "react";
import Create from "./Create.jsx";
import Card from "./Card.jsx";
import { collection , getDocs } from "firebase/firestore";
import { db } from "../firebase.js"; // Import your Firebase db instance

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, "PostsData");
        const snapshot = await getDocs(postsCollectionRef);

        if (!snapshot.empty) {
          let fetchedPosts = [];
          snapshot.forEach((doc) => {
            fetchedPosts.push({ id: doc.id, ...doc.data() });
          });
          setPosts(fetchedPosts);
        } else {
          console.log("No posts found.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Fetch posts on component mount

  const addPost = (newPost) => {
    // Update local state for immediate UI response
    setPosts([...posts, newPost]);

    // Optionally, you can also upload the new post to Firestore here
    // Ensure to handle Firestore update/addition to maintain consistency
  };

  return (
    <main className=" flex flex-wrap justify-center gap-[8rem] py-[8rem] w-full max-w-[1440px] m-auto">
       
      <h1 className="text-5xl font-mono font-bold text-orange-600 "><i>Check Our Users Posts</i></h1>
      <Card posts={posts} />
      <Create onAddPost={addPost} />
    </main>
  );
}

export default Home;
