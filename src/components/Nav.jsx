import { Link, Navigate } from "react-router-dom";

function Nav() {
  return (
    <nav className=" sticky top-0 flex justify-between items-center py-6  px-8 w-[100%] max-w-[1440px] m-auto  bg-white z-50">
      <div>
        <Link to="/" className="text-4xl font-bold text-orange-500 font-mono">
          BlOoGy
        </Link>
      </div>

      <ul className="hidden gap-x-8  items-center ">
        <li>
          <Link
            className="text-xl font-semibold font-main py-2 px-4 text-orange-500 hover:text-white hover:bg-orange-500 transition-all rounded-xl "
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="text-xl font-semibold font-main py-2 px-4 text-orange-500 hover:text-white hover:bg-orange-500 transition-all rounded-xl "
            to=""
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="text-xl font-semibold font-main py-2 px-4 text-orange-500 hover:text-white hover:bg-orange-500 transition-all rounded-xl "
            to=""
          >
            Help
          </Link>
        </li>
      </ul>

      <div className="flex gap-x-4 items-center">
        <Link
          to="/LogIn"
          className="text-xl py-4 px-8 bg-orange-500 text-white font-mono rounded-xl cursor-pointer hover:bg-white hover:text-orange-500 border-orange-500 border transition-all"
        >
          SignUp/LogIn
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
