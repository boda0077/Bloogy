import { Link } from "react-router-dom";    
import codsoft from "../assets/images/codsoft.png";

function Card({ posts }) {
    

// const currentImg = useAuth();
// const [photoURL , setPhotoURL] = useState(codsoft);

//     useEffect(() => {
//         if (currentImg?.photoURL) {
//             setPhotoURL(currentImg.photoURL)
//         }
//     },[currentImg])
  
    return (
        <div className="flex flex-wrap justify-center gap-10">


            {posts && posts.map((post) => (
                <Link  key={post.id} to={`/PostPage/${post.id}`} className=" h-fit w-[450px] p-8 px-10 border border-gray-400 overflow-hidden shadow-shadow  bg-white">
                    <img className="w-[80%] h-[80%] m-auto py-10" src={post.postImg || codsoft} alt="Post" />
                    <div className="p-4">
                        <h2 className="text-3xl font-main pb-2 font-semibold text-gray-800 mb-2">{post.postTitle}</h2>
                        <p className=" text-orange-500  "><i>{post.postText.substring(0, 150)}....</i></p>
                    </div>
                </Link>
))}
        </div>
    );
}

export default Card;
