import React, { useReducer, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from "../api/apiInstance";

const Student_Signup = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;

  const navigate = useNavigate();

  

  const [status, setStatus] = useState("");
  const [errorMS, setErrorMS] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    mobileNo: "",
    email: "",
    enrollmentNo: "",
    password: "",
    branch: "",
    sem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reformat date value if it's coming from the DOB field
    // if (name === "dob") {
    //   const formattedDate = value.split("-").reverse().join("-");
    //   setFormData({
    //     ...formData,
    //     [name]: formattedDate,
    //   });
    // } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = await axiosInstance
      .post("/api/v1/student/signup", formData)
      .then((res) => {
        console.log({res})
        setStatus(res.data.message);
        toast.success(res.data.message);
        navigate("/login");
        setIsLoggedIn(true);
        // return res.data;
      })
      .catch((err) => {
        console.error({err});
        setErrorMS(err.response.data.message);
        toast.error(err.response.data.message);
        navigate("/signup");
        setIsLoggedIn(false);
      });
  };

  return (
    <form className="flex flex-col w-full gap-y-5 mt-6" onSubmit={handleSubmit}>
      <div className="flex gap-x-5">
        <label className="">
          <p className="text-[0.875rem] pt-1 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Name
            <sup className="text-pink-300"> *</sup> :
          </p>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-[#313952] w-56 rounded-[0.75rem]  p-[6px] text-[#EBECEF] border-b-2"
          />
        </label>

        <label className="roll">
          <p className="text-[0.875rem] pt-1 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Enrollment No
            <sup className="text-pink-300"> *</sup> :
          </p>
          <input
            type="number"
            name="enrollmentNo"
            placeholder="Eg. 210210107001"
            pattern="[0-9]{12}"
            value={formData.enrollmentNo}
            onChange={handleChange}
            required
            className="bg-[#313952] w-[12.5rem] rounded-[0.75rem]  p-[6px] text-[#EBECEF] border-b-2"
          />
        </label>
      </div>

      <div className="flex gap-x-5">
        <label className="email">
          <p className="text-[0.875rem] pt-1 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Email
            <sup className="text-pink-300"> *</sup> :
          </p>
          <input
            type="email"
            name="email"
            placeholder="Eg. abcd@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-[#313952] w-56 rounded-[0.75rem]  p-[6px] text-[#EBECEF] border-b-2"
          />
        </label>
        <label className="pass">
          <p className="text-[0.875rem] pt-1 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Password
            <sup className="text-pink-300"> *</sup> :
          </p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-[#313952] w-[12.5rem] rounded-[0.75rem] p-[6px] text-[#EBECEF] border-b-2"
          />
        </label>
      </div>

      <div className="flex gap-x-5">
        <label className="mobile">
          <p className="text-[0.875rem] pt-1 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Mobile No
            <sup className="text-pink-300"> *</sup> :
          </p>{" "}
          <input
            type="number"
            name="mobileNo"
            placeholder="Eg. 9898989898"
            pattern="[0-9]{10}"
            value={formData.mobileNo}
            onChange={handleChange}
            required
            className="bg-[#313952] w-56 rounded-[0.75rem]  p-[6px] text-[#EBECEF] border-b-2"
          />
        </label>
        <label className="dob">
          <p className="text-[0.875rem] pt-1 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            DOB
            <sup className="text-pink-300"> *</sup> :
          </p>
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
            className="bg-[#313952] w-[12.5rem] rounded-[0.75rem]  p-[6px] text-[#EBECEF] border-b-2"
          />
        </label>
      </div>

      <div className="flex gap-x-5">
        <label className="branch">
          <p className="text-[0.875rem] pt-1 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Branch
            <sup className="text-pink-300"> *</sup> :
          </p>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="bg-[#313952] w-56 rounded-[0.75rem]  p-[6px] text-[#EBECEF] border-b-2"
          >
            <option value="">Select Branch</option>
            <option value="Computer Science">Computer Engineering</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="ICT">ICT</option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
        </label>

        <label className="sem">
          <p className="text-[0.875rem] pt-1 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Semester
            <sup className="text-pink-300"> *</sup> :
          </p>
          :
          <select
            name="sem"
            value={formData.sem}
            onChange={handleChange}
            required
            className="bg-[#313952] w-[12.5rem] rounded-[0.75rem]  p-[6px] text-[#EBECEF] border-b-2"
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
        </label>
      </div>
      <button className="bg-blue-300 hover:bg-blue-400 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
        Create Account
      </button>
      <div className="flex w-full items-center gap-x-2">
        <div className="h-[1px] w-full bg-[#313952]"></div>
        <p className="text-[#313952] font-medium leading-[1.375rem]">OR</p>
        <div className="h-[1px] w-full bg-[#313952]"></div>
      </div>

      <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-[#EBECEF] border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-1">
        <FcGoogle />
        <p>Sign Up with Google</p>
      </button>
    </form>
  );
};

export default Student_Signup;
