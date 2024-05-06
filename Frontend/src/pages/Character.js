import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";
import axiosInstance from "../api/apiInstance";
import { toast } from "react-hot-toast";

const Character = () => {
  const data = JSON.parse(sessionStorage.getItem("userdata"));

  const navigate = useNavigate();

  const enrollmentNo = data?.enrollmentNo;
  const branch = data?.branch;
  // console.log(enrollmentNo);

  const [status, setStatus] = useState("");
  const [errorMS, setErrorMS] = useState("");

  // img valu
  const [img, setImg] = useState("");
  const setimgfile = (e) => {
    // setImg(e.target.files[0]);
    // console.log(e.target.files[0]);
    const { name, files } = e.target;
    setFormDataOld({
      ...formDataOld,
      [name]: files[0],
    });
  };

  const [formDataOld, setFormDataOld] = useState({
    name: "",
    enrollmentNo: "",
    branch: "",
    sem: "",
    year: "",
    facultyId: "",
    certificateName: "Character",
    imageFile: "",
  });

  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormDataOld({
      ...formDataOld,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formDataOld);
    const newData = {
      ...formDataOld,
      enrollmentNo: `${enrollmentNo}`,
      branch: `${branch}`,
    };

    console.log({ newData });
    // console.log(formDataOld.imageFile)
    //Navu Added
    const formData = new FormData();
    formData.append("enrollmentNo", newData.enrollmentNo);
    formData.append("name", newData.name);
    formData.append("branch", newData.branch);
    formData.append("sem", newData.sem);
    formData.append("year", newData.year);
    formData.append("facultyId", newData.facultyId);
    formData.append("certificateName", newData.certificateName);
    formData.append("imageFile", formDataOld.imageFile);
    // console.log({ formDataOld.img_path });

    const data = await axiosInstance
      .post("/api/v1/character-pdf", formData)
      .then((res) => {
        console.log({ res });
        setStatus(res.data.message);
        toast.success("Data sent successfully");
        navigate("/student_dashboard");
      })
      .catch((err) => {
        console.error({ err });
        setErrorMS(err.response.data.message);
        toast.error("Data not sent, Check properly!");
        navigate("/character");
      });
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
                      className="flex flex-col  text-[#EBECEF] pt[6] w-[100%] py-[7px] px-[12px] font-semibold text-base  hover:bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400"
                      to="/due"
                    >
                      <button onClick={toggleMenu}>Due Certificate</button>
                    </Link> */}

                    <Link
                      className="flex flex-col  text-[#EBECEF] pt[6] w-[100%] py-[7px] px-[12px] font-semibold text-base  bg-[#091326] hover:transition-all hover:duration-700 hover:text-blue-400"
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
              </div>
            </div>
            {/* right div */}
            <div className="flex flex-col  w-full mt-[27px]">
              <div className="flex flex-col items-center justify-start w-full ml-[6px] text-[#cfcfcf]">
                <div className="flex w-[800px] flex-col bg-[#3139528e] justify-start mt-[30px] rounded-[20px]">
                  {/* bonafide tag  */}
                  <p className="text-[30px] pl-[15px] p-[10px] font-semibold">
                    Fill necessary details for Character Certificate
                  </p>
                  <div className="h-[2px] ml-[8px] w-[782px] bg-[#313952]"></div>

                  {/* form starting */}
                  <form
                    className="flex flex-col w-full gap-y-5 "
                    onSubmit={handleSubmit}
                  >
                    {/* <div className="flex gap-x-5"> */}
                    {/* name  */}
                    <label className="Name">
                      <p className="text-[0.875rem] pl-5 pt-5 text-lg text-[#EBECEF] mb-0 leading-[1.375rem]">
                        Name
                        <sup className="text-pink-300"> *</sup> :
                        <input
                          type="text"
                          name="name"
                          placeholder={data.name}
                          value={formDataOld.name}
                          onChange={handleChange}
                          required
                          className="bg-[#313952] w-56 rounded-[0.75rem] ml-[10px] p-[6px] text-[#EBECEF] border-b-2"
                        />
                      </p>
                    </label>

                    {/* roll no  */}
                    <label className="Enrollment">
                      <p className="text-[0.875rem] pl-5 pt-3 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
                        Enrollment No
                        <sup className="text-pink-300"> *</sup> :
                        <input
                          type="text"
                          name="enrollmentNo"
                          // placeholder={data.enrollmentNo}
                          value={data.enrollmentNo}
                          // pattern="[0-9]{12}"
                          onChange={handleChange}
                          // required
                          readOnly
                          className="bg-[#313952] w-56 rounded-[0.75rem] ml-[10px] p-[6px] text-[#EBECEF] border-b-2"
                        />
                      </p>
                    </label>

                    {/* branch  */}
                    <label className="branch">
                      <p className="text-[0.875rem] pl-5 pt-3 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
                        Branch
                        <sup className="text-pink-300"> *</sup> :
                        <input
                          type="text"
                          name="branch"
                          // placeholder={data.branch}
                          value={data.branch}
                          onChange={handleChange}
                          // required
                          readOnly
                          className="bg-[#313952] w-56 rounded-[0.75rem] ml-[10px] p-[6px] text-[#EBECEF] border-b-2"
                        />
                      </p>
                    </label>

                    {/* sem  */}
                    <label className="sem">
                      <p className="text-[0.875rem] pl-5 pt-3 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
                        Semester
                        <sup className="text-pink-300"> *</sup> :
                        <select
                          name="sem"
                          value={formDataOld.sem}
                          onChange={handleChange}
                          required
                          className="bg-[#313952] w-[12.5rem] rounded-[0.75rem]  ml-[10px] p-[6px] text-[#EBECEF] border-b-2"
                        >
                          <option value="">Select Sem</option>
                          <option value="1">1st Sem</option>
                          <option value="2">2nd Sem</option>
                          <option value="3">3rd Sem</option>
                          <option value="4">4th Sem</option>
                          <option value="5">5th Sem</option>
                          <option value="6">6th Sem</option>
                          <option value="7">7th Sem</option>
                          <option value="8">8th Sem</option>
                        </select>
                      </p>
                    </label>

                    {/* year  */}
                    <label className="Year">
                      <p className="text-[0.875rem] pl-5 pt-3 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
                        Academic Year
                        <sup className="text-pink-300"> *</sup> :
                        <input
                          type="number"
                          name="year"
                          placeholder="Current year"
                          pattern="[0-9]{4}"
                          value={formDataOld.year}
                          onChange={handleChange}
                          required
                          className="bg-[#313952] w-56 rounded-[0.75rem] ml-[10px] p-[6px] text-[#EBECEF] border-b-2"
                        />
                      </p>
                    </label>

                    {/* Faculty Coordinator  */}
                    <label className="Faculty Co-ordinator">
                      <p className="text-[0.875rem] pl-5 pt-3 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
                        Faculty Co-ordinator
                        <sup className="text-pink-300"> *</sup> :
                        <select
                          name="facultyId"
                          value={formDataOld.facultyId}
                          onChange={handleChange}
                          required
                          className="bg-[#313952] w-[12.5rem] rounded-[0.75rem]  ml-[10px] p-[6px] text-[#EBECEF] border-b-2"
                        >
                          <option value="">Select Co-ordinator</option>
                          <option value="123456789121">Chinmay Vyas</option>
                          <option value="123456789123">Urvashi Solanki</option>
                        </select>
                      </p>
                    </label>

                    {/* Certificate Name  */}
                    <label className="CertificateName">
                      <input
                        type="hidden"
                        name="certificateName"
                        onChange={handleChange}
                      />
                    </label>

                    {/* imageFile  */}
                    <label className="Image">
                      <p className="text-[0.875rem] pl-5  text-lg text-[#EBECEF] mb-0 leading-[1.375rem]">
                        Upload Your Image
                        <sup className="text-pink-300"> *</sup> :
                        <input
                          type="file"
                          accept="image/*"
                          onChange={setimgfile}
                          name="imageFile"
                          value={img.imageFile}
                          className=" bg-[#313952] w-[22rem] rounded-[0.75rem]  ml-[10px]  text-[#EBECEF] border-b-2  font-bold py-2 px-4  inline-block"
                        />
                      </p>
                    </label>

                    {/* submit  */}
                    <div className="flex items-center justify-center">
                      <button className="bg-blue-300 w-52 m-[17px] mb-[20px] text-[#000000] hover:bg-blue-400 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium ">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Character;

