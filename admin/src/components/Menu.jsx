import React from "react";
import { MdDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { RiBillFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import SummaryApi from "../common/apiUrl";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const isShow = useSelector((state) => state?.wMenu?.isShow);
  const navigator = useNavigate();

  const list = {
    hidden: { width: 56 },
    show: { width: 240 },
  };

  const handleLogout = async () => {
    await axios
      .get(SummaryApi.userLogout.url, {
        withCredentials: true,
      })
      .then(function (response) {
        toast.success(response.data.message);
        navigator("/login");
      })
      .catch(function (error) {
        toast.success(error?.response?.data?.message);
      });
  };

  return (
    <motion.div
      initial={{ width: 240 }}
      variants={list}
      animate={isShow ? "show" : "hidden"}
      transition={{ duration: 0.3 }}
      className={"h-[94%]"}
    >
      <div className="flex gap-2 items-center text-[1.6rem] p-2 border-b">
        <MdDashboard />
        {isShow && <p>Dashboard</p>}
      </div>
      <div className="flex flex-col items-start gap-4 p-2 h-full">
        <div className="flex gap-2 items-center w-full text-[1.4rem] py-2 border-b">
          <RiAdminFill />
          {isShow && <p>{user?.name}</p>}
        </div>
        {isShow && (
          <div className="flex items-center w-full rounded-lg border border-slate-100">
            <input
              className="bg-transparent text-white p-2 flex-1 border-r outline-none"
              type="text"
              placeholder="Search"
            />
            <div className="w-40 flex justify-center text-[1.2rem] py-2 cursor-pointer">
              <FaSearch />
            </div>
            {/* <IoClose /> */}
          </div>
        )}
        <Link
          to={"/dashboard/users"}
          className="flex items-center gap-2 p-2 text-[1.2rem] w-full rounded-lg hover:bg-gray-600 hover:text-white transition-all"
        >
          <FaUsers />
          {isShow && <p>Users</p>}
        </Link>
        <Link
          to={"/dashboard/categories"}
          className="flex items-center gap-2 p-2 text-[1.2rem] w-full rounded-lg hover:bg-gray-600 hover:text-white transition-all"
        >
          <BiSolidCategory />
          {isShow && <p>Categories</p>}
        </Link>
        <Link
          to={"/dashboard/products"}
          className="flex items-center gap-2 p-2 text-[1.2rem] w-full rounded-lg hover:bg-gray-600 hover:text-white transition-all"
        >
          <GiFruitBowl />
          {isShow && <p>Products</p>}
        </Link>
        <Link
          to={"/dashboard/orders"}
          className="flex items-center gap-2 p-2 text-[1.2rem] w-full rounded-lg hover:bg-gray-600 hover:text-white transition-all"
        >
          <RiBillFill />
          {isShow && <p>Orders</p>}
        </Link>
        <div
          to={"#"}
          className="flex items-center mt-auto gap-2 p-2 w-full text-[1.4rem] cursor-pointer rounded-lg hover:bg-gray-600 hover:text-white transition-all"
          onClick={handleLogout}
        >
          <BiLogOut />
          {isShow && <p>Logout</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default Menu;
