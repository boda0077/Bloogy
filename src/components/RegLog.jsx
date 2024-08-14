    import { Link, Navigate } from "react-router-dom";
    import ProfilePage from "./ProfilePage";
    import BG3 from "../assets/images/bg3.svg";
import { useState , useRef } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";
    
    function RegLog( {user}) {

        
        const [email ,setEmail] = useState("");
        const [password , setPassword] =useState("");
        const emailValue = useRef();

        const handleLogIn = (i) => {

            i.preventDefault()

            if (!email || !password) return; 
    
            signInWithEmailAndPassword(auth , email , password)
            .then(userCredential => {
                
               alert("Succsufl Loged IN");
    
            })
            .catch((error) => {
                const errorCode = error.code ;
                const erroeMsg = error.message ;
                alert(errorCode ,erroeMsg);
            })
        
        };

        const handelPasswordReset = (i) => {
            i.preventDefault()
            sendPasswordResetEmail(auth , emailValue.current.value )
            .then (console.log(emailValue.current.value))
            .catch(console.log(error => console.log(error)));
        };

        const handleEmChange = (e) => setEmail(e.target.value);
        const handlePassChange = (e) => setPassword(e.target.value);

        if (user) {
                return <Navigate to="/ProfilePage"/>
        }

        return(
        <div className=" relative grid place-items-center w-full h-[100dvh] overflow-hidden ">
            <img className=" absolute  w-[100dvw] z-[-10] opacity-80" src={BG3} alt="bg pic" />
            <div className="grid  gap-8 border w-[500px] py-12 border-white rounded-xl backdrop-blur-lg bg-white">

            <h1 className="text-5xl font-bold text-orange-500 font-mono text-center mb-12 w-fit m-auto border-b border-black pb-4 px-8">BlOoGy</h1>

                <form className=" grid  gap-8">

                    <div className="flex justify-evenly  items-center gap-x-4  ">
                         <i className=" text-2xl text-orange-500 fa-solid fa-envelope"></i>
                        <input className="w-[300px] outline-none border border-orange-500 rounded-md py-2 px-4" type="email"  id="email" autoComplete="ON" required onChange={handleEmChange} ref={emailValue}/>
                    </div>

                    <div  className="flex justify-evenly items-center gap-x-4 mb-8  ">
                       <i className=" text-2xl text-orange-500 fa-solid fa-key"></i>
                        <input className="w-[300px] outline-none border border-orange-500 rounded-md py-2 px-4" type="password"  id="pass" autoComplete="off" required onChange={handlePassChange}/>  
                   </div>
                        <button onClick={handleLogIn} className=" hover:scale-95 hover:text-orange-500 transition-all hover:bg-white text-2xl text-white font-main font-semibold bg-orange-500 py-4 px-8 w-[170px] m-auto rounded-md">Log In</button>
                </form>
                <div className="flex justify-center gap-8">
                    <Link className="text-orange-500 underline" to="/SignUp">Sign Up</Link>
                    <Link to="" onClick={handelPasswordReset} className="text-orange-500 underline">Forgot Password</Link>
                </div>
            </div>
        </div>
    );
    }

    export default RegLog ;