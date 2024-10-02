import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Logo from "../assets/img/logo.png";
import Hero from "../assets/img/hero/banner.jpg";
import { BsFillHandbagFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { transform } from "framer-motion";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../common/apiUrl";
import { toast } from "react-toastify";
import DepartmentsList from "./DepartmentsList/DepartmentsList";

const Navbar = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showMenuMb, setShowMenuMb] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [maxheight, setMaxHeight] = useState(0);
  const location = useLocation();
  const pathname = location?.pathname;

  const menuRef = useRef(null);

  // User Logout
  const handleLogout = async () => {
    await axios
      .get(SummaryApi.userLogout.url, {
        withCredentials: true,
      })
      .then(function (response) {
        toast.success(response.data.message);
        navigator("/auth");
      })
      .catch(function (error) {
        toast.success(error?.response?.data?.message);
      });
  };

  const handleClickOutMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutMenu);
    return () => {
      window.removeEventListener("mousedown", handleClickOutMenu);
    };
  }, []);

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 lg:grid-rows-1 grid-rows-2 lg:gap-6 justify-between items-center">
          <div className="lg:col-span-3 col-span-12 row-start-1 lg:pb-6 flex justify-between items-center">
            <img src={Logo} alt="logo" />
            <div className="lg:hidden text-[2rem] border border-slate-400 p-1">
              <RxHamburgerMenu onClick={() => setShowMenuMb(true)} />
            </div>
          </div>
          <div className="col-span-6 row-start-1">
            <ul className="lg:flex hidden xl:gap-16 lg:justify-between xl:justify-start text-[1rem] font-bold">
              <li>
                <Link
                  to={"/"}
                  className={
                    pathname === "/"
                      ? "text-primary"
                      : "hover:text-primary transition-all"
                  }
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to={"/shop"}
                  className={
                    pathname === "/shop"
                      ? "text-primary"
                      : "hover:text-primary transition-all"
                  }
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className={
                    pathname === "/about"
                      ? "text-primary"
                      : "hover:text-primary transition-all"
                  }
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className={
                    pathname === "/contact"
                      ? "text-primary"
                      : "hover:text-primary transition-all"
                  }
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 col-span-12 lg:row-start-1 row-start-2">
            <div className="flex gap-4 lg:justify-end justify-center text-[1.4rem] items-center">
              <div className="hidden lg:flex gap-2 relative">
                {user ? (
                  <p className="text-[1rem]">{user?.name}</p>
                ) : (
                  <Link
                    className="text-[1rem] hover:text-primary hover:underline transition-all"
                    to={"/auth"}
                  >
                    Login
                  </Link>
                )}
                <FaUser
                  className="cursor-pointer"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                />
                {showUserMenu && user && (
                  <motion.ul
                    ref={menuRef}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-[140%] z-10 -left-3 py-2 text-[1.2rem] border bg-white shadow-lg before-arrow"
                  >
                    <li className="px-4 py-0.5 border-slate-100 border-b-1">
                      <Link to={"#"}>Profile</Link>
                    </li>
                    <li
                      className="px-4 py-0.5 border-slate-100 border-b-1 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </motion.ul>
                )}
              </div>
              <FaHeart className="cursor-pointer" />
              <BsFillHandbagFill className="cursor-pointer" />
              <p className="text-[0.9rem]">
                {" "}
                item: <span className="font-bold">$150.00</span>
              </p>
            </div>
          </div>
        </div>
        <div className="relative z-50">
          <div className="grid grid-cols-12 gap-6 justify-between items-center ">
            <div className="lg:col-span-3 col-span-12 lg:row-start-1 relative">
              <div
                className="cursor-pointer bg-primary text-white font-bold px-6 lg:px-2 py-2 flex justify-between items-center"
                onClick={() => setShowDepartments(!showDepartments)}
              >
                <div className="flex gap-4 items-center text-[1.3rem]">
                  <GiHamburgerMenu />
                  <p>Danh mục</p>
                </div>
                <IoIosArrowDown />
              </div>
              {pathname !== "/" && (
                <div className="absolute right-0 left-0">
                  <DepartmentsList status={showDepartments} />
                </div>
              )}
            </div>
            <div className="lg:col-span-6 col-span-12 row-start-1">
              <div className="w-full flex">
                <input
                  className="outline-none border border-slate-300 flex-1 py-2.5 px-4"
                  type="text"
                  placeholder="What do you need?"
                />
                <button className="primary-btn rounded-none">SEARCH</button>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-3 col-span-4 row-start-1  gap-6 justify-end items-center">
              <div className="p-4 border rounded-full text-[1rem] bg-slate-100 text-primary">
                <FaPhone />
              </div>
              <div className="">
                <p className="text-[1.1rem] font-bold">+65 11.188.888</p>
                <p className="text-[0.9rem]">support 24/7 time</p>
              </div>
            </div>
          </div>
          {pathname === "/" && (
            <div className="grid grid-cols-12 gap-6 justify-between items-start">
              <div className="lg:col-span-3 col-span-12">
                <DepartmentsList status={showDepartments} />
              </div>
              <div
                className="lg:col-span-9 col-span-12 h-[431px] bg-cover bg-center lg:mt-6 flex items-center pl-16"
                id="setHeight"
                style={{ backgroundImage: `url(${Hero})` }}
              >
                <div className="max-w-[300px] text-start">
                  <p className="tracking-[0.2em] text-[1.2rem] font-bold text-primary">
                    FRUIT FRESH
                  </p>
                  <h1 className="text-[3rem] leading-none font-black my-4 ">
                    Vegetable 100% Organic
                  </h1>
                  <p className="text-slate-400">
                    Free Pickup and Delivery Available
                  </p>
                  <button className="primary-btn mt-4">SHOP NOW</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showMenuMb && (
        <div className="bg-black/40 absolute top-0 left-0 right-0 bottom-0 lg:hidden flex z-20">
          <motion.div
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[300px] px-8 py-12 bg-white flex flex-col items-start gap-8 z-50"
          >
            <img src={Logo} alt="logo" className="w-fit" />
            <div className="flex gap-4 lg:justify-end justify-center text-[1.4rem]">
              <FaUser className="cursor-pointer" />
              <FaHeart className="cursor-pointer" />
              <BsFillHandbagFill className="cursor-pointer" />
              <p className="text-[0.9rem]">
                {" "}
                item: <span className="font-bold">$150.00</span>
              </p>
            </div>
            <ul className="flex flex-col items-start w-full">
              <li className="cursor-pointer py-2 w-full text-start border-slate-300 border-b ">
                HOME
              </li>
              <li className="cursor-pointer py-2 w-full text-start border-slate-300 border-b ">
                SHOP
              </li>
              <li className="cursor-pointer py-2 w-full text-start border-slate-300 border-b ">
                ABOUT
              </li>
              <li className="cursor-pointer py-2 w-full text-start border-slate-300 border-b ">
                CONTACT
              </li>
              <li className="cursor-pointer py-2 w-full text-start border-slate-300 border-b ">
                LOGOUT
              </li>
            </ul>

            <div className="flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                <FaFacebookF />
                <FaTwitter />
                <FaLinkedinIn />
                <FaPinterestP />
              </div>
              <div className="w-full flex items-center gap-2">
                <IoIosMail />
                <p>tringuyen@gmail.com</p>
              </div>
              <div className="w-full flex">
                <p>Free Shipping for all Order of $99</p>
              </div>
            </div>
          </motion.div>

          <div className="flex-1" onClick={() => setShowMenuMb(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
