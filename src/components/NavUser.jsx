import { Link, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRef } from "react";
function NavUser() {

    const hum = useRef();
    const menu = useRef();

    const handelMenu = () => {
        menu.current.classList.toggle("flex")
        menu.current.classList.toggle("hidden")
        hum.current.classList.toggle("fa-bars")
        hum.current.classList.toggle("fa-x")
    }

    const handelLogOut = () => {
        signOut(auth)
        .then(
            console.log("Sign Out")
        )
        .catch((error) => console.log(error));
    }
    
    return(
    <nav className=" sticky top-0 flex justify-between items-center py-6  px-8 w-[100%] max-w-[1440px] m-auto  bg-white z-50">

        <div>
            <h1 className="text-4xl font-bold text-orange-500 font-mono">BlOoGy</h1>
        </div>

        
            <ul className="flex gap-x-8  items-center ">
                <li><Link className="text-xl font-semibold font-main py-2 px-4 text-orange-500 hover:text-white hover:bg-orange-500 transition-all rounded-xl " to="/Home">Home</Link></li>
                <li><Link className="text-xl font-semibold font-main py-2 px-4 text-orange-500 hover:text-white hover:bg-orange-500 transition-all rounded-xl " to="/Posts">Posts</Link></li>
            </ul>
        

        <div ref={menu} className="   hidden  border py-2 px-6 rounded-lg bg-orange-500 border-orange-500  gap-x-4 items-center">
            <Link onClick={handelLogOut} to="/LogIn" className="  py-2 px-6 bg-white text-orange-500 font-mono rounded-xl cursor-pointer hover:scale-105 hover:text-orange-500 border-orange-500 border transition-all">Log Out</Link>
            <Link to="/ProfilePage" className=" py-2 px-6 bg-white text-orange-500 font-mono rounded-xl cursor-pointer hover:scale-105 hover:text-orange-500 border-orange-500 border transition-all">Profile</Link>
        </div>

        <i onClick={handelMenu} ref={hum}  className=" cursor-pointer text-orange-500 scale-[2] fa-solid fa-bars"></i>


    </nav>
);
}

export default NavUser ;