import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import axiosInstance from "../api/apiInstance";
import { toast } from "react-hot-toast";

const MyCertificates = () => {
  const data2 = JSON.parse(sessionStorage.getItem("userdata"));
  console.log(data2.enrollmentNo);

  const [isOpen, setIsOpen] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [certi, setCerti] = useState([]);

  const [status, setStatus] = useState("");
  const [errorMS, setErrorMS] = useState("");

  useEffect(() => {
    // Fetch certificates for the logged-in student
    fetchCertificates();
  }, []);

  const handleViewAndDownload = async (enrollmentNo, certificateName) => {
    try {
      // Fetch the certificate data from the API
      const response = await axiosInstance.post(
        "/api/v1/viewCertificate-student",
        {
          enrollmentNo,
          certificateName,
        },
        {
          responseType: "blob", // Specify responseType as blob to receive binary data
        }
      );
      console.log({response});
      // Create a blob from the binary data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url);

      // Download the PDF
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data2.enrollmentNo}_${certificateName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setStatus("PDF opened and downloaded successfully");
    } catch (error) {
      toast.error("Error in Opening PDF or Downloading, Try again.");
      console.error("Error:", error);
      setErrorMS(error.response.data.message);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/getallapproved-student",
        {
          enrollmentNo: data2.enrollmentNo,
        }
      );
      setStatus(response.data.message);
      setCertificates(response.data.allCertificate);
      setCerti(response.data.allCertificate);
      console.log(response.data.allCertificate[0]);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setErrorMS(error.response.data.message);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-row justify-start w-full bg-[#091326]">
          {/* main screen div */}

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
                    className="flex flex-col  text-[#EBECEF] pt[6] w-[100%] py-[7px] px-[12px] font-semibold text-base  hover:bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400"
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
            <div className="flex items-center justify-center shadow-3xl  text-[#EBECEF] w-[100%] py-[7px] px-[12px]  font-semibold text-xl  bg-[#091326] hover:transition-all hover:duration-700">
              <Link to="/myCertificates">
                <button>
                  <div className="flex  justify-center hover:text-blue-400">
                    My Certificates
                  </div>
                </button>
              </Link>
            </div>{" "}
          </div>

          <div className="flex flex-col w-full mt-[27px]">
            <div className="mt-5 pb-4 ml-12 text-lg  bg-[#3139528e] rounded-[8px]">
              {certi.map((certificate, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center item-center rounded-[8px] mt-4 mx-6"
                >
                  <div className="bg-[#3139528e] flex flex-row gap-x-[100px] rounded-[8px]">
                    <div className="flex flex-row items-center  justify-center ml-3 gap-x-[120px] text-[#EBECEF]  ">
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
                      <p className="p-1 font-bold">
                        <span className="text-[#ebecef88] font-semibold ">
                          Status : 
                        </span>{" "}
                        {certificate.AdminStatus === "Approved" && (
                        <span className="text-[#53e74e]">{certificate.AdminStatus}</span>)}
                        {certificate.AdminStatus === "Rejected" && (
                        <span className="text-[#d74444]">{certificate.AdminStatus}</span>)}
                        {certificate.AdminStatus === "Pending" && (
                        <span className="text-[#51c0f0]">{certificate.AdminStatus}</span>)}
                        
                      </p>
                    </div>
                    {certificate.AdminStatus === "Approved" && (
                      <div className="flex">
                        <div className="flex flex-row  items-center justify-center">
                          <button
                            className="bg-blue-400 hover:bg-blue-500  py-[2px] px-[6px]  rounded-[8px] text-base font-medium text-[#ffffff] m-4 flex justify-end"
                            onClick={() =>
                              handleViewAndDownload(
                                certificate.enrollmentNo,
                                certificate.certificateName
                              )
                            }
                          >
                            DOWNLOAD
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCertificates;
