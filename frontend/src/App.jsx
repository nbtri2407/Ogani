import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Context from "./context";
import axios from "axios";
import SummaryApi from "./common/apiUrl";
import { useEffect } from "react";
import { setUserDetails } from "./store/userSlice";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    await axios
      .get(SummaryApi.getUserDetails.url,{
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
    <Context.Provider value={{ }}>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <Outlet />
      <Footer />
    </Context.Provider> 
  );
}

export default App;
