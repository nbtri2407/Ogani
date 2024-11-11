import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/apiUrl";
import formatPrice from "../../helper/formatPrice";
import { useSelector } from "react-redux";
const TotalRevenue = () => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState();

  const getData = async () => {
    await axios
      .get(SummaryApi.statistics1.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setData(response?.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 p-4">
      <div className="bg-red-400 px-4 py-10">
        <h1 className="font-bold md:text-md">Số khách hàng</h1>
        <p className="font-bold text-3xl">{data?.countUser}</p>
      </div>{" "}
      <div className="bg-blue-400 px-4 py-10">
        <h1 className="font-bold md:text-md">Số sản phẩm</h1>
        <p className="font-bold text-3xl">{data?.countProduct}</p>
      </div>{" "}
      <div className="bg-yellow-200 px-4 py-10">
        <h1 className="font-bold md:text-md">Số đơn hàng</h1>
        <p className="font-bold text-3xl">{data?.countOrder}</p>
      </div>{" "}
      <div className="bg-primary/80 px-4 py-10">
        <h1 className="font-bold md:text-md">Tổng doanh thu</h1>
        <p className="font-bold text-3xl">{formatPrice(data?.totalRevenue)}</p>
      </div>
    </div>
  );
};

export default TotalRevenue;
