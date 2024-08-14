import bgImg from "../assets/images/profilebg.jpg";
import { useState, useEffect  } from "react";
import { useAuth, db } from "../firebase.js";
import { doc, getDoc, collection, query, where, getDocs , deleteDoc  } from "firebase/firestore";
import { Link } from "react-router-dom";

function ProfilePage() {
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [UName, setUName] = useState("");
  const [UEmail, setUEmail] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function getUserData() {
      if (!currentUser) return;

      try {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUName(userData.Name);
          setUEmail(userData.Email);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getUserData();
  }, [currentUser]);

  useEffect(() => {
    async function getUserPosts() {
      if (!currentUser) return;

      try {
        const postsRef = collection(db, "PostsData");
        const q = query(postsRef, where("uID", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() }); // Assigning unique key 'id' to each post
        });

        setUserPosts(posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    }

    getUserPosts();
  }, [currentUser]);

  const delPost = async (postId) => {
    try {
      await deleteDoc(doc(db, "PostsData", postId));
      setUserPosts(userPosts.filter(post => post.id != postId ));
      console.log("Post has been deleted");

    } catch (error) {
      console.log("Error Deleteing this post" , error);
    }
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const handelChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handelUpload = () => {
    // Implement your upload logic here if needed
    console.log("Upload logic goes here");
  };

  return (
    <div className="relative">
      {/* Background image */}
      <img className="absolute w-full h-[70dvh] z-[-10]" src={bgImg} alt="Background" />

      {/* Profile information */}
      <div className="flex py-[5rem] px-8">
        <div className="flex justify-between items-start w-full h-[70vh]">
          <div className="flex items-center gap-[4rem]">
            {/* Profile picture and update form */}
            <form className="grid gap-4">
              <div className="grid place-items-center bg-white overflow-hidden rounded-full border-[3px] border-orange-500 w-[250px] h-[250px]">
                <img
                  className="w-full h-full rounded-full"
                  src={photoURL}
                  alt="Profile Picture"
                />
              </div>

              <label className="cursor-pointer" htmlFor="UpdateImg">
                <i className="text-2xl text-orange-500 fa-solid fa-image"></i>
              </label>
              <button
                disabled={loading || !photo}
                onClick={handelUpload}
                className="w-fit py-2 px-4 text-white font-semibold text-xl rounded-xl bg-orange-500 hover:translate-y-[-5px] transition-all"
              >
                Update
              </button>
              <input
                onChange={handelChange}
                className="hidden cursor-none w-0 invisible"
                type="file"
                id="UpdateImg"
              />
            </form>

            {/* User information */}
            <div className="grid justify-start gap-4">
              <h1 className="text-4xl font-bold font-main text-white">{UName}</h1>
              <span className="font-serif text-white">{UEmail}</span>
            </div>
          </div>
        </div>
      </div>
      

      {/* User's posts */}
      <div className="grid mb-12 px-8">
        <h1 className="text-5xl font-bold font-main mb-[4rem] py-6 px-12 bg-orange-500 w-fit text-white rounded-2xl">My Posts</h1>
        
        {/* Render user posts */}
        {userPosts.length > 0 ? (
          <div className="flex flex-wrap gap-10">
            {userPosts.map((post) => (
              <div  key={post.id}  className=" relative  h-fit w-[450px] p-8 px-10 border border-gray-400 overflow-hidden shadow-shadow  bg-white">
              <div className=" flex gap-4 justify-end">
              <i onClick={() => delPost(post.id)} className="  z-10    cursor-pointer text-white py-6 px-6 bg-orange-500 rounded-2xl fa-solid fa-xmark hover:scale-95 transition-all"></i>
              <Link to={`/EditPost/${post.id}`}><i className="  z-10    cursor-pointer text-white py-6 px-6 bg-green-500 rounded-2xl fa-solid fa-pen hover:scale-95 transition-all"></i></Link>
              </div>
              <Link to={`/PostPage/${post.id}`}>

              
              <img className="w-[80%] h-[80%] m-auto py-10" src={post.postImg || codsoft} alt="Post" />
              <div className="p-4">
                  <h2 className="text-3xl font-main pb-2 font-semibold text-gray-800 mb-2">{post.postTitle}</h2>
                  <p className=" text-orange-500  "><i>{post.postText.substring(0, 150)}....</i></p>
              </div>
          </Link>
          </div>
            ))}
          </div>
        ) : (
          <p className="text-white">No posts found.</p>
        )}
      </div>
      </div>
    
  );
}

export default ProfilePage;
