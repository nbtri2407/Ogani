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
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import ProductQuickviews from "./components/ProductQuickviews/ProductQuickviews";

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
  const [openCart, setOpenCart] = useState(false);

  return (
    <Context.Provider value={{}}>
      <Cart onClose={() => setOpenCart(false)} open={openCart} />
      <Navbar openCart={() => setOpenCart(true)} />
      <ToastContainer position="bottom-right" />
      <Outlet />
      <Footer />
    </Context.Provider>
  );
}

export default App;
