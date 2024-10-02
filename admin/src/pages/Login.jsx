import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/apiUrl";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({
    email: "admin@gmail.com",
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
        if (response.data.role === "ADMIN") {
          toast.success(response.data.message);
          setError("");
          navigator("/dashboard");
        } else {
          setError("You do not have access!");
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
    <div className="relative w-full h-[100vh] bg-gradient-to-bl from-blue-700 to-green-500 flex justify-center">
      <div className="absolute top-[20%] xl:w-[40%] lg:w-[50%] md:w-[70%] w-[90%] bg-white rounded-lg">
        <div className="w-full py-6">
          <h1 className="text-[2rem] text-center ">Đăng nhập</h1>

          <form onSubmit={handleLogin} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={(e) => handleOnChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={(e) => handleOnChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[1rem] cursor-pointer text-secondary">
                {error}
              </p>
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
                Bạn không phải Quản trị viên?{" "}
                <Link
                  to={"http://localhost:3006"}
                  className="text-secondary cursor-pointer hover:underline transition-all"
                >
                  Đến trang mua hàng
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
