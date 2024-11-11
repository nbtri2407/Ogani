import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TotalRevenue from "../components/DashboardItems/TotalRevenue";
import OrderOverview from "../components/DashboardItems/OrderOverview";
import TopProduct from "../components/DashboardItems/TopProduct";
import TopProductSold from "../components/DashboardItems/TopProductSold";
import axios from "axios";
import SummaryApi from "../common/apiUrl";

const Home = () => {
  const user = useSelector((state) => state?.user?.user);

  const navigator = useNavigate();
  if (!user || user.role !== "ADMIN" || user == null) {
    navigator("/login");
  }

  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [topSoldProducts, setTopSoldProducts] = useState([]);

  const getTopProducts = async () => {
    await axios
      .get(SummaryApi.topProduct.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setTopRatedProducts(response?.data?.topRatedProducts);
        setTopSoldProducts(response?.data?.topSoldProducts);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getTopProducts();
  }, [user]);

  // topProduct
  return (
    <>
      <TotalRevenue />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-4">
        <OrderOverview />
        <OrderOverview />
        <TopProduct productList={topRatedProducts} />
        <TopProductSold productList={topSoldProducts} />
      </div>
    </>
  );
};

export default Home;
