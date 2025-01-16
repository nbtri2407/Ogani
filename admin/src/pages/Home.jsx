import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TotalRevenue from "../components/DashboardItems/TotalRevenue";
import OrderOverview from "../components/DashboardItems/OrderOverview";
import TopProduct from "../components/DashboardItems/TopProduct";
import TopProductSold from "../components/DashboardItems/TopProductSold";
import axios from "axios";
import SummaryApi from "../common/apiUrl";
import RevenueStatistics from "../components/DashboardItems/RevenueStatistics";

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

  // const getOrdersCount = async () => {
  //   await axios
  //     .get(SummaryApi.orderCount.url, {
  //       withCredentials: true,
  //     })
  //     .then(function (response) {
  //       setOrderCount(response?.data);

  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log("error", error);
  //     });
  // };

  useEffect(() => {
    getTopProducts();
    // getOrdersCount();
  }, [user]);

  // topProduct
  return (
    <>
      <TotalRevenue />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-4">
        <RevenueStatistics />
        <OrderOverview />
        {/* <OrderOverview
          title1={"Số đơn hàng tháng này"}
          title2={"Số đơn hàng tháng trước"}
          value1={orderCount.thisMonth}
          value2={orderCount.lastMonth}
        /> */}
        <TopProduct productList={topRatedProducts} />
        <TopProductSold productList={topSoldProducts} />
      </div>
    </>
  );
};

export default Home;
