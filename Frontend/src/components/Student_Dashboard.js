import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/apiInstance";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

function Student_Dashboard() {
  // { Mari rete for static dashboard }
  const [dashboard, setDashBoard] = useState("");
  const [cert, setCerti] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const data = JSON.parse(sessionStorage.getItem("userdata"));
  // console.log(data);
  const originalDate = data.DOB.slice(0, 10); // Replace with your date string
  const reversedDate = originalDate.split("-").reverse().join("-");
  // console.log(reversedDate); // Output: "12/05/2023"

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
                <button className="text-[#EBECEF]  w-[100%] py-[7px] px-[12px] font-semibold text-xl  bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400">
                  Dashboard
                </button>
              </Link>

              {/* khush no code */}
              {/* Apply thi.. */}
              <div className="">
                <div className="flex items-center justify-center shadow-3xl  text-[#EBECEF] w-[100%] py-[7px] px-[12px]  font-semibold text-xl  hover:bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400">
                  <button onClick={toggleMenu}>
                    <div className="flex  justify-center">
                      Apply for Certificate
                      <RiArrowDownSLine className="mt-[6px] ml-3 text-[#EBECEF] hover:text-blue-400" />
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
                      <button>Bonafide certificate</button>
                    </Link>
                    {/* <Link
                      className="flex flex-col  text-[#EBECEF] pt[6] w-[100%] py-[7px] px-[12px] font-semibold text-base  hover:bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400"
                      to="/due"
                    >
                      <button>Due Certificate</button>
                    </Link> */}
                    <Link
                      className="flex flex-col  text-[#EBECEF] pt[6] w-[100%] py-[7px] px-[12px] font-semibold text-base hover:bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400"
                      to="/character"
                    >
                      <button>Character Certificate</button>
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
              </div>
            </div>
            {/* right big div */}
            <div className="flex flex-col  w-full mt-[27px]  ">
              <h1 className="text-[#EBECEF] font-bold text-2xl ml-16 pb-9">
                My Profile
              </h1>
              <div className="flex flex-col items-center">
                {/* niche nu main div */}
                <div className="flex flex-col items-center justify-start w-[55rem] ml-[6px]">
                  <div className="flex flex-row justify-start w-[55rem] p-[25px] bg-[#3139528e] rounded-[20px]">
                    <div className="flex flex-row  items-center  h-16 w-[49%] ">
                      {/* rounded photo */}
                      <div className="h-[5rem] w-[5rem] bg-[#3139528e] rounded-[50%]" />
                      {/* name div */}
                      <div className="flex flex-col ml-10 items-start justify-start ">
                        <h3 className="text-[#EBECEF] font-semibold text-lg">
                          {/* Vidhi Maniar */}
                          {data.name}
                        </h3>
                        <p className="text-[#EBECEF] font-light">
                          {/* vidhimaniar04@gmail.com */}
                          {data.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* details valu div */}
                  <div className="w-full h-max mt-[50px] p-5 bg-[#3139528e] rounded-[20px]">
                    <h3 className="text-[#EBECEF] pb-3 font-bold text-xl">
                      Personal Details
                    </h3>
                    <div className="bg-[#2f3955aa] h-[0.12rem]  w-[53.3rem] rounded-[20px]"></div>
                    {/* content of student */}
                    <div className="name-enroll flex  flex-wrap">
                      <div className="flex flex-col mt-2 w-[50%] ">
                        <p className="text-[#ebecef3f]">Name</p>
                        <p className="text-[#EBECEF] text-lg ">{data.name}</p>
                      </div>
                      <div className="flex flex-col mt-2 w-[50%] ">
                        <p className="text-[#ebecef3f]">Enrollment No</p>
                        <p className="text-[#EBECEF] text-lg ">
                          {data.enrollmentNo}
                        </p>
                      </div>
                      <div className="flex flex-col mt-3 w-[50%] ">
                        <p className="text-[#ebecef3f]">Branch</p>
                        <p className="text-[#EBECEF] text-lg ">{data.branch}</p>
                      </div>
                      <div className="flex flex-col mt-3 w-[50%] ">
                        <p className="text-[#ebecef3f]">Semester</p>
                        <p className="text-[#EBECEF] text-lg ">
                          {data.sem}
                          <sup>th</sup>
                        </p>
                      </div>
                      <div className="flex flex-col mt-3 w-[50%] ">
                        <p className="text-[#ebecef3f]">Date Of Birth</p>
                        <p className="text-[#EBECEF] text-lg ">
                          {reversedDate}
                        </p>
                      </div>
                    </div>
                    {/* name enroll DOB */}
                    {/* branch sem */}
                  </div>
                  <div className="w-full h-max mt-[50px] p-5 bg-[#3139528e] rounded-[20px]">
                    <h3 className="text-[#EBECEF] pb-3 font-bold text-xl">
                      Contact Details
                    </h3>
                    <div className="bg-[#2f3955aa] h-[0.12rem]  w-[53.3rem] rounded-[20px]"></div>
                    {/* content of student */}
                    <div className="name-enroll flex  flex-wrap">
                      <div className="flex flex-col mt-2 w-[50%] ">
                        <p className="text-[#ebecef3f]">Email Address</p>
                        <p className="text-[#EBECEF] text-lg ">{data.email} </p>
                      </div>
                      <div className="flex flex-col mt-2 w-[50%] ">
                        <p className="text-[#ebecef3f]">Mobile No</p>
                        <p className="text-[#EBECEF] text-lg ">
                          {data.mobileNo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student_Dashboard;

// <div className="flex flex-row justify-center w-full">
//         <div className="flex flex-row justify-start w-full bg-[#091326]">
//           {/* main screen div */}
//           <div className="flex  w-full  px-auto max-w-[1418px] ">
//             {/* left div */}
//             <div className="h-[770px] c flex flex-col pt-6 w-[300px] bg-[#3139528e]">
//               {/* <div className=""> */}
//               <Link to="/student_dashboard">
//               <button className="text-[#EBECEF]  w-[100%] py-[7px] px-[12px] font-semibold text-lg  bg-[#091326] hover:transition-all hover:duration-700">
//                 Dashboard
//               </button>
//               </Link>
//               {/* </div> */}
//               {/* <div className=""> */}
//               <Link to="/bonafide">
//               <button onClick={()=>{
//                 console.log("hello");
//                 <div className="w-[100%] h-[100px] py-[7px] px-[12px]  bg-[#86d648] ">hellooo</div>

//               }} className=" text-[#EBECEF] w-[100%] py-[7px] px-[12px]  font-semibold text-lg hover:bg-[#091326] hover:transition-all hover:duration-700 "
//               >
//                 <div className="flex justify-center shadow-3xl" >
//                   Apply for Certificate
//                   <RiArrowDownSLine className="mt-[6px] ml-3 text-[#EBECEF] " />
//                 </div>
//               </button>
//               </Link>
//               {/* </div> */}
//               {/* <div className=""> */}
//               {/* <button className=" text-[#EBECEF] w-[100%] py-[7px] px-[12px]  font-semibold text-lg hover:bg-[#091326] hover:transition-all hover:duration-700">
//                 <div className="flex justify-center shadow-3xl">
//                   Apply Of Certificate
//                   <RiArrowDownSLine className="mt-[6px] ml-3 text-[#EBECEF] " />
//                 </div>
//               </button> */}
//               {/* </div> */}
//               {/* <div className="flex items-end"> */}
//               {/* <button className=" text-[#EBECEF] w-[100%] py-[7px] px-[12px]  font-semibold  text-lg hover:bg-[#091326] hover:transition-all hover:duration-700 mt-[35rem] ">
//                 Logout
//               </button> */}
//               {/* </div> */}
//             </div>
//             {/* right big div */}
//             <div className="flex flex-col  w-full mt-[27px]  ">
//               <h1 className="text-[#EBECEF] font-bold text-2xl ml-16 pb-9">
//                 My Profile
//               </h1>
//               <div className="flex flex-col items-center">
//                 {/* niche nu main div */}
//                 <div className="flex flex-col items-center justify-start w-[55rem] ml-[6px]">
//                   <div className="flex flex-row justify-start w-[55rem] p-[25px] bg-[#3139528e] rounded-[20px]">
//                     <div className="flex flex-row  items-center  h-16 w-[49%] ">
//                       {/* rounded photo */}
//                       <div className="h-[5rem] w-[5rem] bg-[#3139528e] rounded-[50%]" />
//                       {/* name div */}
//                       <div className="flex flex-col ml-10 items-start justify-start ">
//                         <h3 className="text-[#EBECEF] font-semibold text-lg">
//                           {/* Vidhi Maniar */}
//                           {data.name}
//                         </h3>
//                         <p className="text-[#EBECEF] font-light">
//                           {/* vidhimaniar04@gmail.com */}
//                           {data.email}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* details valu div */}
//                   <div className="w-full h-max mt-[50px] p-5 bg-[#3139528e] rounded-[20px]">
//                     <h3 className="text-[#EBECEF] pb-3 font-bold text-xl">
//                       Personal Details
//                     </h3>
//                     <div className="bg-[#2f3955aa] h-[0.12rem]  w-[53.3rem] rounded-[20px]"></div>
//                     {/* content of student */}
//                     <div className="name-enroll flex  flex-wrap">
//                       <div className="flex flex-col mt-2 w-[50%] ">
//                         <p className="text-[#ebecef3f]">Name</p>
//                         <p className="text-[#EBECEF] text-lg ">{data.name}</p>
//                       </div>
//                       <div className="flex flex-col mt-2 w-[50%] ">
//                         <p className="text-[#ebecef3f]">Enrollment No</p>
//                         <p className="text-[#EBECEF] text-lg ">
//                           {data.enrollmentNo}
//                         </p>
//                       </div>
//                       <div className="flex flex-col mt-3 w-[50%] ">
//                         <p className="text-[#ebecef3f]">Branch</p>
//                         <p className="text-[#EBECEF] text-lg ">{data.branch}</p>
//                       </div>
//                       <div className="flex flex-col mt-3 w-[50%] ">
//                         <p className="text-[#ebecef3f]">Semester</p>
//                         <p className="text-[#EBECEF] text-lg ">
//                           {data.sem}
//                           <sup>th</sup>
//                         </p>
//                       </div>
//                       <div className="flex flex-col mt-3 w-[50%] ">
//                         <p className="text-[#ebecef3f]">Date Of Birth</p>
//                         <p className="text-[#EBECEF] text-lg ">{reversedDate}</p>
//                       </div>
//                     </div>
//                     {/* name enroll DOB */}
//                     {/* branch sem */}
//                   </div>
//                   <div className="w-full h-max mt-[50px] p-5 bg-[#3139528e] rounded-[20px]">
//                     <h3 className="text-[#EBECEF] pb-3 font-bold text-xl">
//                       Contact Details
//                     </h3>
//                     <div className="bg-[#2f3955aa] h-[0.12rem]  w-[53.3rem] rounded-[20px]"></div>
//                     {/* content of student */}
//                     <div className="name-enroll flex  flex-wrap">
//                       <div className="flex flex-col mt-2 w-[50%] ">
//                         <p className="text-[#ebecef3f]">Email Address</p>
//                         <p className="text-[#EBECEF] text-lg ">{data.email} </p>
//                       </div>
//                       <div className="flex flex-col mt-2 w-[50%] ">
//                         <p className="text-[#ebecef3f]">Mobile No</p>
//                         <p className="text-[#EBECEF] text-lg ">
//                           {data.mobileNo}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
