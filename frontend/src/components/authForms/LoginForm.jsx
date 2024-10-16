import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import SummaryApi from "../../common/apiUrl";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Context from "../../context";

const LoginForm = ({ callBack }) => {
  const { getUserDetails } = useContext(Context);
  const [data, setData] = useState({
    email: "Tri123@gmail.com",
    password: "123456",
  });
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const goBack = () => {
    // navigator(-1);
    navigator("/checkout");
  };
  const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };

  const mergeCart = async () => {
    await axios
      .post(
        SummaryApi.mergeCart.url,
        {
          cartItems: getCartFromLocalStorage(),
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(response?.data?.data));
        const cartEvent = new CustomEvent("cartChanged", {
          detail: "newCart",
        });
        window.dispatchEvent(cartEvent);
      })
      .catch(function (error) {
        console.log(error?.response?.data?.message);
      });
  };

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
          mergeCart();
          const cartEvent = new CustomEvent("cartChanged", {
            detail: "newCart",
          });
          window.dispatchEvent(cartEvent);
          setError("");
          getUserDetails();
          goBack();
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
        mergeCart();
        getUserDetails();
        goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="w-full xl:px-40 md:px-32 px-20 py-10">
      <h1 className="text-[2rem] text-center ">Đăng nhập</h1>
      <form
        onSubmit={handleLogin}
        className="max-w-md p-8 mx-auto text-start bg-white border shadow-xl"
      >
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

        <div className="flex justify-start items-center w-full mt-2">
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

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
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

export default LoginForm;
