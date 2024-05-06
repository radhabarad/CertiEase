import React, { useState } from "react";
import { RiArrowDownSLine, RiSearchLine } from "react-icons/ri";
import axiosInstance from "../api/apiInstance";
import { toast } from "react-hot-toast";

function Faculty_Dashboard() {
  const data1 = JSON.parse(sessionStorage.getItem("userdata"));

  // console.log(data1?.name);

  // All useState

  const [status, setStatus] = useState("");
  const [errorMS, setErrorMS] = useState("");
  const [pendingCertificates, setPendingCertificates] = useState([]);
  const [pdfViewed, setPdfViewed] = useState(false);

  // Navo code Vache
  // Handle View Function
  const handleView = async (enrollmentNo, certificateName) => {
    try {
      const data = await axiosInstance.post(
        "/api/v1/viewpdf",
        {
          enrollmentNo,
          certificateName,
        },
        {
          responseType: "arraybuffer", // Specify responseType as arraybuffer to receive binary data
        }
      );

      // toast.success("Wait for a while");

      // Create a blob from the binary data
      const blob = new Blob([data.data], { type: "application/pdf" });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url);
      setStatus("PDF opened successfully");
      setPdfViewed(true);

      // console.log(data);
    } catch (error) {
      toast.error("Error in Opening PDF, Try again.");
      console.error("Error opening PDF:", error);
      setErrorMS(error.response.data.message);
    }
  };

  // Approving certificate
  const handleApprove = async (enrollmentNo, certificateName) => {
    if (!pdfViewed) {
      toast.error("Please view the PDF first");
      return;
    } else {
      if (
        data1.facultyId === 111111111111 ||
        data1.facultyId === 333333333333
      ) {
        try {
          const response = await axiosInstance.post(
            "/api/v1/adm-approved/bonafide",
            {
              enrollmentNo,
              certificateName,
            }
          );

          setStatus(response.data.message);
          console.log(response.certificateName);
          toast.success("Approved");
          handleSubmit();
        } catch (error) {
          console.error("Error approving certificate:", error);
          toast.error("Error approving certificate");
        }
      } else {
        try {
          const response = await axiosInstance.post("/api/v1/faculty-aproved", {
            enrollmentNo,
            certificateName,
          });

          setStatus(response.data.message);
          toast.success("Approved");

          handleSubmit();
        } catch (error) {
          console.error("Error approving certificate:", error);
          toast.error("Error approving certificate");
        }
      }
    }
  };

  // Rejecting certificate
  const handleReject = async (enrollmentNo, certificateName) => {
    if (!pdfViewed) {
      toast.error("Please view the PDF first");
      return;
    } else {
      if (
        data1.facultyId === 111111111111 ||
        data1.facultyId === 333333333333
      ) {
        try {
          const response = await axiosInstance.post("/api/v1/adm-rejected", {
            enrollmentNo,
            certificateName,
          });

          setStatus(response.data.message);
          toast.error("Rejected");

          handleSubmit();
        } catch (error) {
          console.error("Error Rejecting certificate:", error);
          toast.error("Error Rejecting certificate");
        }
      } else {
        try {
          const response = await axiosInstance.post(
            "/api/v1/faculty-rejected",
            {
              enrollmentNo,
              certificateName,
            }
          );

          setStatus(response.data.message);
          toast.error("Rejected");

          handleSubmit();
        } catch (error) {
          console.error("Error Rejecting certificate:", error);
          toast.error("Error Rejecting certificate");
        }
      }
    }
  };
  // Navo code Vache

  // handleSubmit function
  const handleSubmit = async (e) => {
    // e.preventDefault();

    console.log(data1.facultyId);
    // console.log(typeof data1.facultyId);

    const data = await axiosInstance
      .post("/api/v1/faculty-pendingview", { facultyId: data1.facultyId })
      .then((res) => {
        console.log({ res });
        setStatus(res.data.message);
        setPendingCertificates(res.data.pendingCertificates);
        // console.log(res?.res?.data?.pendingCertificates);
      })
      .catch((err) => {
        console.error({ err });
        setErrorMS(err.response.data.message);
      });
    // console.log(data);
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-center w-full ">
          <div className="flex flex-row justify-start w-full bg-[#091326]">
            {/* main screen div */}
            <div className="flex h-auto w-full  px-auto max-w-[1418px]">
              {/* right big div */}
              <div className="flex flex-col  w-full mt-[27px]  ">
                <h1 className="text-[#EBECEF] font-bold text-3xl ml-12 mt-8 pb-4 shadow-3xl shadow-white">
                  {data1.name}'s Dashboard
                </h1>

                <button className="flex justify-center bg-blue-300 w-48 ml-12 text-[#000000] hover:bg-blue-400 py-[8px] rounded-[8px] mt-6 font-medium">
                  <div
                    className="flex justify-center"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Pending Request
                    <RiArrowDownSLine className="mt-[6px] ml-3 text-[#000000] " />
                  </div>
                </button>

                {/* Display pendingCertificates */}
                <div className="mt-5 pb-4 ml-12 text-lg  bg-[#3139528e] rounded-[8px]">
                  {pendingCertificates.map((certificate, index) => (
                    // all request here
                    <div
                      key={index}
                      className="flex flex-col justify-center item-center rounded-[8px] mt-4 mx-6"
                    >
                      {/* internal divs  */}
                      <div className="bg-[#3139528e] flex flex-row gap-x-[100px] rounded-[8px]">
                        <div className="flex flex-row items-center  justify-center ml-3 gap-x-[290px] text-[#EBECEF]  ">
                          <p className="p-1 font-bold">
                            <span className="text-[#ebecef88] font-semibold ">
                              Enrollment No :
                            </span>{" "}
                            {certificate.enrollmentNo}
                          </p>
                          <p className="p-1 pr-2 font-bold">
                            <span className="text-[#ebecef88] font-semibold ">
                              Certificate Type :
                            </span>{" "}
                            {certificate.certificateName}
                          </p>
                        </div>

                        <div className="flex gap-x-[90px]">
                          <div className="flex flex-row  items-center justify-center">
                            <button
                              className="bg-blue-400 hover:bg-blue-500  py-[2px] px-[6px]  rounded-[8px] text-base font-medium text-[#ffffff] m-4 flex justify-end"
                              onClick={() => {
                                handleView(
                                  certificate.enrollmentNo,
                                  certificate.certificateName
                                );
                              }}
                            >
                              <span className="items-center mt-1 mr-1">
                                <RiSearchLine />
                              </span>
                              VIEW
                            </button>
                          </div>

                          <div className="flex">
                            <div className="flex flex-row  items-center justify-center">
                              <button
                                className="bg-green-500 hover:bg-green-700 py-[2px] px-[6px] rounded-[8px] text-base font-medium text-[#ffffff] m-4 flex justify-end"
                                onClick={() => {
                                  handleApprove(
                                    certificate.enrollmentNo,
                                    certificate.certificateName
                                  );
                                }}
                              >
                                APPROVE
                              </button>
                            </div>
                            <div className="flex flex-row  items-center justify-center">
                              <button
                                className="bg-red-500 hover:bg-red-700 py-[2px] px-[6px] rounded-[8px] text-base font-medium text-[#ffffff] m-4 flex justify-end"
                                onClick={() => {
                                  handleReject(
                                    certificate.enrollmentNo,
                                    certificate.certificateName
                                  );
                                }}
                              >
                                REJECT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faculty_Dashboard;

// Juno code

// import React, { useState } from "react";
// import { RiArrowDownSLine, RiDropdownList } from "react-icons/ri";
// import axiosInstance from "../api/apiInstance";
// import Faculty_View from "./Faculty_View";

// function Faculty_Dashboard() {
//   const data1 = JSON.parse(sessionStorage.getItem("userdata"));
//   // console.log(data1?.name);

//   const [status, setStatus] = useState("");
//   const [errorMS, setErrorMS] = useState("");
//   const [pendingCertificates, setPendingCertificates] = useState([]);

//   // handleview function
//   const handleView = async (e) => {
//     // e.preventDefault();

//     const data = await axiosInstance
//       .post("/api/v1/viewpdf", {facultyId: data1.facultyId})
//       .then((res) => {
//         console.log({ res });
//         setStatus(res.data.message);

//       })
//       .catch((err) => {
//         console.error({ err });
//         setErrorMS(err.response.data.message);
//       });
//     // console.log(data);
//   };

//   // handleSubmit function
//   const handleSubmit = async (e) => {
//     // e.preventDefault();

//     console.log(data1.facultyId);
//     console.log(typeof data1.facultyId);

//     const data = await axiosInstance
//       .post("/api/v1/faculty-pendingview", { facultyId: data1.facultyId })
//       .then((res) => {
//         console.log({ res });
//         setStatus(res.data.message);
//         setPendingCertificates(res.data.pendingCertificates);
//         // console.log(res?.res?.data?.pendingCertificates);
//       })
//       .catch((err) => {
//         console.error({ err });
//         setErrorMS(err.response.data.message);
//       });
//     // console.log(data);
//   };

//   return (
//     <>
//       <div>
//         <div className="flex flex-row justify-center w-full ">
//           <div className="flex flex-row justify-start w-full">
//             {/* main screen div */}
//             <div className="flex  w-full  px-auto max-w-[1418px]">
//               {/* left div */}
//               <div className="h-[770px] c flex flex-col pt-6 w-[350px] bg-[#3139528e] ">
//                 <div className="flex flex-col justify-center ml-[20px] mr-4 mt-10 p-2 text-white font-medium border rounded">
//                   <div className="h-[6rem] w-[6rem] bg-[#3139528e] rounded-[100%]" />
//                   <h3 className="text-[#EBECEF] font-bold  mt-6 text-lg">
//                     {data1.name}
//                   </h3>
//                   <h1>
//                     {data1.designation} <br></br>
//                     ASSISTANT PROFESSOR
//                   </h1>
//                 </div>
//               </div>
//               {/* right big div */}
//               <div className="flex flex-col  w-full mt-[27px]  ">
//                 <h1 className="text-[#EBECEF] font-bold text-2xl ml-12 pb-9">
//                   {data1.name}'s Dashboard
//                 </h1>

//                 <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 pl-6 ml-[100px] px-4 rounded w-[300px]">
//                   <div
//                     className="flex justify-center"
//                     onClick={() => {
//                       handleSubmit();
//                     }}
//                   >
//                     Pending Request
//                     <RiArrowDownSLine className="mt-[6px] ml-3 text-[#EBECEF] " />
//                   </div>
//                 </button>

//                 {/* Display pendingCertificates */}
//                 <div className="mt-4">
//                   {pendingCertificates.map((certificate, index) => (
//                     <div
//                       key={index}
//                       className="flex flex-row justify-between gap-x-10"
//                     >
//                       <div className="flex flex-row ml-[190px] items-start justify-start gap-x-[200px] m-4 font-bold  text-white rounded-sm ">
//                         <p>Enrollment No : {certificate.enrollmentNo}</p>
//                         <p>Certificate Name : {certificate.certificateName}</p>
//                         {/* Render other data related to the student */}
//                       </div>

//                       <div>
//                         <button
//                           className="bg-blue-300 hover:bg-blue-400 py-[2px] px-[6px] rounded-[8px] font-medium text-richblack-900 m-4 flex justify-end"
//                           onClick={handleView}
//                         >
//                           VIEW
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Faculty_Dashboard;
