import React from "react";
import { Link } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

const Due = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-row justify-start w-full bg-[#091326]">
          {/* main screen div */}
          <div className="flex  w-full  px-auto max-w-[1418px] ">
            {/* left div */}
            <div className="h-[770px] c flex flex-col pt-6 w-[300px] bg-[#3139528e]">
              {/* <div className=""> */}
              <Link to="/student_dashboard">
                <button className="text-[#EBECEF]  w-[100%] py-[7px] px-[12px] font-semibold text-xl hover:bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400">
                  Dashboard
                </button>
              </Link>
              {/* khush no code */}
              {/* Apply thi.. */}
              <div className="">
                <div className="flex items-center justify-center shadow-3xl  text-[#EBECEF] w-[100%] py-[7px] px-[12px]  font-semibold text-xl  hover:bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400">
                  <button onClick={toggleMenu}>
                    <div className="flex justify-center">
                      Apply for Certificate
                      <RiArrowDownSLine className="mt-[6px] ml-3 text-[#EBECEF] " />
                    </div>
                  </button>
                </div>
              </div>
              <div className="w-full">
                {isOpen && (
                  <div className="flex flex-col text-[#EBECEF] pt-[6] w-[100%]  font-semibold text-lg  ">
                    <Link
                      className="flex flex-col  text-[#EBECEF] pt-[6] w-[100%] py-[7px] m-0 px-[12px] font-semibold text-base  hover:bg-[#091326] hover:w-auto hover:transition-all hover:duration-700 hover:text-blue-400"
                      to="/bonafide "
                    >
                      <button onClick={toggleMenu}>Bonafide certificate</button>
                    </Link>

                    {/* <Link
                      className="flex flex-col  text-[#EBECEF] pt[6] w-[100%] py-[7px] px-[12px] font-semibold text-base  bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400"
                      to="/due"
                    >
                      <button onClick={toggleMenu}>Due Certificate</button>
                    </Link> */}

                    <Link
                      className="flex flex-col  text-[#EBECEF] pt[6] w-[100%] py-[7px] px-[12px] font-semibold text-base  hover:bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400"
                      to="/character"
                    >
                      <button onClick={toggleMenu}>Character Certificate</button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center shadow-3xl  text-[#EBECEF] w-[100%] py-[7px] px-[12px]  font-semibold text-xl  hover:bg-[#091326] hover:transition-all hover:duration-700">
                <Link to="/myCertificates">
                  <button>
                    <div className="flex  justify-center hover:text-blue-400">
                      My Certificates
                    </div>
                  </button>
                </Link>
              </div>{" "}
              {/* right div */}
              <div className="flex flex-col w-full mt-[27px]"> </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Due;
