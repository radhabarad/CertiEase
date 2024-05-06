import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className="flex justify-between items-center py-4 px-6  bg-[#132046] text-[#EBECEF]">
      <h1 className="text-2xl font-bold">CertiEase</h1>

      <nav>
        <ul className="flex gap-x-20 font-semibold text-lg ">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 hover:transition-all hover:duration-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 hover:transition-all hover:duration-500"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 hover:transition-all hover:duration-500"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Button - Login = Signup = Logout = Dashboard  */} 

      <div className="flex items-center gap-x-4 text-richblack-100">
        {!isLoggedIn && (
          <Link to="/login">
            <button className="text-[#EBECEF] py-[7px] px-[12px] rounded-[8px] border border-[#5e6d98] font-semibold text-sm hover:bg-[#091326] hover:transition-all hover:duration-500">
              Login
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/student_signup">
            <button className="text-[#EBECEF] py-[7px] px-[12px] rounded-[8px] border border-[#5e6d98] font-semibold text-sm hover:bg-[#091326] hover:transition-all hover:duration-500">
              Sign Up
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/">
            <button
              onClick={() => {
                sessionStorage.clear();
                setIsLoggedIn(false);
                toast.success("Logout Sucessfully");
              }}
              className="text-[#EBECEF] py-[7px] px-[12px] rounded-[8px] border border-[#5e6d98] font-semibold text-sm hover:bg-[#091326]"
            >
              Log Out
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/student_dashboard">
            <button className="text-[#EBECEF] py-[7px] px-[12px] rounded-[8px] border border-[#5e6d98] font-semibold text-sm hover:bg-[#091326]">
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
