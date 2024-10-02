import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import SummaryApi from "../../common/apiUrl";

const LoginForm = ({ callBack }) => {
  const [data, setData] = useState({
    email: "Tri123@gmail.com",
    password: "123456",
  });
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios
      .post(SummaryApi.login.url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.role === "GENERAL") {
          toast.success(response.data.message);
          setError("");
          navigator("/");
        }
      })
      .catch(function (error) {
        setError(error?.response?.data?.message);
      });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  return (
    <div className="w-full xl:px-40 md:px-32 px-20 py-10">
      <h1 className="text-[2rem] text-center ">Đăng nhập</h1>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto text-start">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={(e) => handleOnChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={(e) => handleOnChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-[1rem] cursor-pointer text-secondary">{error}</p>
          <p className="text-[1rem] cursor-pointer underline hover:text-secondary">
            Quên mật khẩu?
          </p>
        </div>

        <button
          type="submit"
          className="text-white my-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng nhập
        </button>

        <div className="flex justify-start items-center w-full">
          <p className="text-[1rem]">
            Bạn chưa có tài khoản?{" "}
            <span
              onClick={callBack}
              className="text-secondary cursor-pointer hover:underline transition-all"
            >
              Đăng ký
            </span>
          </p>
        </div>
      </form>
      {/* <form
        className="w-full flex flex-col gap-6 items-start text-[1.6rem]"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-left">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => handleOnChange(e)}
            className="w-full px-4 py-2 bg-slate-100 outline-none border border-slate-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="text-left">
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
        <div className="flex justify-between items-center w-full">
          <p className="text-[1rem] cursor-pointer text-secondary">{error}</p>
          <p className="text-[1rem] cursor-pointer underline hover:text-secondary">
            Forgot password?
          </p>
        </div>
        <button className="primary-btn w-full">Login</button>
        <div className="flex justify-center items-center w-full">
          <p className="text-[1rem]">
            Not a member?{" "}
            <span
              className="text-secondary cursor-pointer hover:underline transition-all"
              onClick={callBack}
            >
              Sign Up
            </span>
          </p>
        </div>
      </form> */}
    </div>
  );
};

export default LoginForm;
