import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common/apiUrl";
import { toast } from "react-toastify";

const SignUpForm = ({ callBack }) => {
  const [data, setData] = useState({
    name: "Tri",
    phone: "0123456789",
    email: "Tri123@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  });
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await axios
      .post(SummaryApi.signUp.url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        toast.success(response.data.message);
        setError("");
        callBack();
      })
      .catch(function (error) {
        setError(error?.response?.data?.message);
      });
  };

  return (
    <div className="w-full xl:px-40 md:px-32 px-20 py-10">
      <h1 className="text-[4rem] text-center ">Login</h1>
      <form
       className="max-w-sm mx-auto text-start"
        onSubmit={handleSignUp}
      >
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="name" className="text-left pl-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => handleOnChange(e)}
            className="w-full px-4 py-2 bg-slate-100 outline-none border border-slate-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="phone" className="text-left pl-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={(e) => handleOnChange(e)}
            className="w-full px-4 py-2 bg-slate-100 outline-none border border-slate-300 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => handleOnChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="password" className="text-left pl-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => handleOnChange(e)}
            className="w-full px-4 py-2 bg-slate-100 outline-none border border-slate-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="confirmPassword" className="text-left pl-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => handleOnChange(e)}
            className="w-full px-4 py-2 bg-slate-100 outline-none border border-slate-300 rounded-md"
          />
        </div>
        <div className="flex justify-start items-center w-full">
          <p className="text-[1rem] cursor-pointer text-secondary">{error}</p>
        </div>
        <button className="primary-btn w-full my-4">Sign Up</button>
        <div className="flex justify-center items-center w-full">
          <p className="text-[1rem]">
            You have a account?{" "}
            <span
              className="text-secondary cursor-pointer hover:underline transition-all"
              onClick={callBack}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
