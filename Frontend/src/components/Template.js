import React from "react";
import Student_Login from "./Student_Login";
import Student_Signup from "./Student_Signup";
// import Faculty_Signup from "./Faculty_Signup";
import Faculty_Login from "./Faculty_Login";
import { useState } from "react";
import Photo from "../assests/photo.png";

const Template = ({ title, formType, setIsLoggedIn }) => {
  const [accountType, setAccountType] = useState("student");
  // console.log("Template");

  // console.log(accountType);
  // console.log("asdasd");

  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto gap-y-0 gap-x-12 justify-between">
      <div className="w-11/12 max-w-[450px] mx-0 ">
        <h1 className="  py-7 font-bold text-[1.875rem] leading-[2.375rem] text-[#EBECEF]">
          {title}
        </h1>

        <div
          className={` ${
            formType === "login"
              ? "flex bg-[#384468] w-max rounded-full text-[#ebecefb9] border-b-2 text-lg gap-x-1"
              : "visibility: hidden"
          }`}
        >
          <button
            className={`${
              accountType === "student"
                ? "bg-[#132046] text-[#EBECEF]"
                : "bg-transparent text-[#ebecefb9]"
            } py-1 px-3 rounded-full transition-all duration-200`}
            onClick={() => {
              setAccountType("student");
            }}
          >
            Student
          </button>
          <button
            className={`${
              accountType === "faculty"
                ? "bg-[#132046] text-[#EBECEF] "
                : "bg-transparent text-[#ebecefb9]"
            } py-1 px-4 rounded-full transition-all duration-200`}
            onClick={() => {
              setAccountType("faculty");
            }}
          >
            Faculty
          </button>
        </div>

        {accountType === "student" ? (
          formType === "signup" ? (
            <Student_Signup setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Student_Login setIsLoggedIn={setIsLoggedIn} />
          )
        ) : formType === "login" ? (
          <Faculty_Login setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <div className="">Currently there is no Sign-Up facility for Faculty</div>
        )}
      </div>
      <div className=" h-min pt-8 max-w-[600px]">
        <img
          src={Photo}
          alt="pattern"
          width={550}
          height={300}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Template;
