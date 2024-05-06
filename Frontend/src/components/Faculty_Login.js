import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../api/apiInstance";

const Faculty_Login = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  const [status, setStatus] = useState("");
  const [errorMS, setErrorMS] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    facultyId: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = await axiosInstance
      .post("/api/v1/faculty/login", formData)
      .then((res) => {
        setStatus(res.data.message);
        toast.success(res.data.message);
        navigate("/faculty_dashboard");
        sessionStorage.setItem("userdata",JSON.stringify(res.data.user));
        setIsLoggedIn(true);
        // return res.data;
      })
      .catch((err) => {
        // console.error(err.response.data.meassage);
        setErrorMS(err.response.data.message);
        toast.error(err.response.data.message);
        navigate("/login");
        setIsLoggedIn(false);
      }      
      );

      // console.log(data);
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-y-4 mt-6"
      >
        <label className="w-full">
          <p className="text-[0.875rem] pt-2 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Faculty ID
            <sup className="text-pink-300"> * </sup> :
          </p>

          <input
            type="number"
            required
            value={formData.email}
            placeholder="Eg. 220210107001"
            onChange={changeHandler}
            name="facultyId"
            className="bg-[#313952] rounded-[0.75rem] w-full p-[10px] text-[#EBECEF] border-b-2"
          />
        </label>

        <label className="w-full relative">
          <p className="text-[0.875rem] pt-2 text-lg text-[#EBECEF] mb-1 leading-[1.375rem]">
            Password
            <sup className="text-pink-300"> *</sup> :
          </p>

          <input
            type="password"
            required
            value={formData.password}
            placeholder="Enter Password"
            onChange={changeHandler}
            name="password"
            className="bg-[#313952] rounded-[0.75rem] w-full p-[10px] text-[#EBECEF] border-b-2"
          />

          <Link to="#">
            <p className="text-xs mt-3 text-[0.8rem] mr-1 text-[#EBECEF] max-w-max ml-auto">
              Forgot Password
            </p>
          </Link>
        </label>

        <button className="bg-blue-300 hover:bg-blue-400 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
          Sign in
        </button>

        <div>
          <div className="flex w-full items-center my-4 gap-x-2">
            <div className="h-[1px] w-full bg-[#313952]"></div>
            <p className="text-[#313952] font-medium leading-[1.375rem]">OR</p>
            <div className="h-[1px] w-full bg-[#313952]"></div>
          </div>

          <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-[#EBECEF] border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-6">
            <FcGoogle />
            <p>Sign Up with Google</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Faculty_Login;
