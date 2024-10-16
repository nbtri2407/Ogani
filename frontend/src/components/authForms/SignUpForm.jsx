import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common/apiUrl";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

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

  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    await axios
      .post(
        SummaryApi.googleLogin.url,
        {
          token: credential,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        navigator("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="w-full xl:px-40 md:px-32 px-20 py-10">
      <h1 className="text-[2rem] text-center">Đăng Ký</h1>
      <form
        className="max-w-md p-8 mx-auto text-start bg-white border shadow-xl flex flex-col gap-3"
        onSubmit={handleSignUp}
      >
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="name" className="text-left pl-1">
            Tên hiển thị
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
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={(e) => handleOnChange(e)}
            className="w-full px-4 py-2 bg-slate-100 outline-none border border-slate-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="email" className="text-left pl-1">
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
            Mật khẩu
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
            Xác nhận mật khẩu
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
        <button className="primary-btn w-full my-2">Đăng ký</button>
        <div className="flex justify-center items-center w-full">
          <p className="text-[1rem]">
            Bạn đã có tài khoản?{" "}
            <span
              className="text-secondary cursor-pointer hover:underline transition-all"
              onClick={callBack}
            >
              Đăng nhập
            </span>
          </p>
        </div>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            hoặc
          </span>
        </div>
        <div className="mt-2 w-full flex items-center justify-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
