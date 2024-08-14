import { Link, Navigate } from "react-router-dom";
import BG3 from "../assets/images/bg3.svg";
import { useState } from "react";
import { auth , db  } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {   addDoc, collection, doc, setDoc } from "firebase/firestore";


function RegSign({user}) {

    const [name , setName] = useState("")
    const [email ,setEmail] = useState("");
    const [password , setPassword] =useState("");

    const handleSignUp = async   (i) => {

        i.preventDefault()

  
        if (!email || !password) return; 
        

    //    if (createUserWithEmailAndPassword(auth , email ,password)) {
    //          toDataBase()
    //    }  ;
      
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userUid = userCredential.user.uid;

        // Add user data to Firestore
        await setDoc(doc(db, "Users", userUid), {
            Name: name,
            Email: email,
            Password: password
        });

        // Redirect or show success message here
    } catch (error) {
        alert("Error signing up:", error);
        
    }
}






  

    const handleNaChange = (e) => setName(e.target.value);
    const handleEmChange = (e) => setEmail(e.target.value);
    const handlePassChange = (e) => setPassword(e.target.value);

if (user) {
    return <Navigate to="/LogIn"/> ;
}

    return(

        <div className=" relative grid place-items-center w-full h-[100dvh] overflow-hidden ">
            <img className=" absolute  w-[100dvw] z-[-10] opacity-80" src={BG3} alt="bg pic" />
            <div className="grid  gap-8 border w-[500px] py-12 border-white rounded-xl backdrop-blur-lg bg-white">

            <h1 className="text-5xl font-bold text-orange-500 font-mono text-center mb-12 w-fit m-auto border-b border-black pb-4 px-8">BlOoGy</h1>

                <form className=" grid  gap-8">

                <div className="flex justify-evenly  items-center gap-x-4  ">
                         <i className=" text-2xl text-orange-500 fa-solid fa-user"></i>
                        <input className="w-[300px] outline-none border border-orange-500 rounded-md py-2 px-4" type="text"  name="Name" autoComplete="OFF" required placeholder="Name..." onChange={handleNaChange}/>
                    </div>

                    <div className="flex justify-evenly  items-center gap-x-4  ">
                         <i className=" text-2xl text-orange-500 fa-solid fa-envelope"></i>
                        <input className="w-[300px] outline-none border border-orange-500 rounded-md py-2 px-4" type="email"  name="Email" autoComplete="ON" required placeholder="Email..." onChange={handleEmChange}/>
                    </div>

                    <div  className="flex justify-evenly items-center gap-x-4 mb-8  ">
                       <i className=" text-2xl text-orange-500 fa-solid fa-key"></i>
                        <input className="w-[300px] outline-none border border-orange-500 rounded-md py-2 px-4" type="password"  name="Password" autoComplete="OFF" required placeholder="Password..." onChange={handlePassChange}/>  
                   </div>
                        <button onClick={handleSignUp} className=" hover:scale-95 hover:text-orange-500 transition-all hover:bg-white text-2xl text-white font-main font-semibold bg-orange-500 py-4 px-8 w-[170px] m-auto rounded-md">Sign up</button>
                </form>
                <div className="flex justify-center gap-8">
                    <Link className="text-orange-500 underline" to="/LogIn">Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default RegSign ;