import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Context from "./context";
import axios from "axios";
import SummaryApi from "./common/apiUrl";
import { useEffect } from "react";
import { setUserDetails } from "./store/userSlice";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./components/Menu";
import "flowbite";
import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    await axios
      .get(SummaryApi.getUserDetails.url, {
        withCredentials: true,
      })
      .then(function (response) {
        dispatch(setUserDetails(response?.data?.data));
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getUserDetails();
    // getCountCartProduct();
  });

  return (
    <Context.Provider value={{}}>
      <div className="">
        {/* <aside className="bg-bgColor text-textColor h-[100vh]">
          <Menu />
        </aside> */}
        
        <Sidebar />
        {/* <main className="flex-1 flex flex-col"> */}
        <div className="p-4 lg:ml-64 mt-14">
          <ToastContainer position="bottom-right" />
          <Outlet />
        </div>
        <Footer />
        {/* </main> */}
      </div>
    </Context.Provider>
  );
}

export default App;
