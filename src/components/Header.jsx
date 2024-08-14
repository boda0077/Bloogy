import BG from "../assets/images/bg.jpg";
import { Link, Navigate } from "react-router-dom";

function Header() {
  return (
    <header className=" relative  grid justify-start p-12 items-center  gap-8  h-[100dvh] ">
      <img
        className="absolute w-full h-full z-[-10] brightness-75 "
        src={BG}
        alt="Header Pic"
      />

      <div className=" grid gap-[5rem]   ">
        <h1 className="text-[7rem] font-bold text-white font-main ">BlOoGy</h1>

        <p className="text-4xl font-main text-white w-[80%] leading-10 tracking-wider">
          <i>
            Creat Your Own post  Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Repudiandae quaerat maxime
            fugiat, numquam blanditiis necessitatibus in. Nam in veritatis
            aliquid ipsam culpa impedit{" "}
          </i>{" "}
        </p>
      </div>
    </header>
  );
}

export default Header;
