import axios from "axios";
import React from "react";
import { useState } from "react";
import SummaryApi from "../../common/apiUrl";
import { useEffect } from "react";

const OrderOverview = () => {
  const [orderCount, setOrderCount] = useState({});
  const getOrdersCount = async () => {
    await axios
      .get(SummaryApi.orderCount.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setOrderCount(response?.data);

        console.log(response);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getOrdersCount();
  }, []);
  return (
    <div className="grid gap-6">
      <div className="px-4 py-4 text-white bg-[#002f24] border flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">Số đơn hàng hôm nay</h2>
        <p className="text-3xl">{orderCount.today}</p>
      </div>
      <div className="px-4 py-4 text-white bg-[#002f24] border flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">Số đơn hàng hôm qua</h2>
        <p className="text-3xl">{orderCount.yesterday}</p>
      </div>
      <div className="px-4 py-4 text-white bg-[#002f24] border flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">Số đơn hàng tháng này</h2>
        <p className="text-3xl">{orderCount.thisMonth}</p>
      </div>
      <div className="px-4 py-4 text-white bg-[#002f24] border flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">Số đơn hàng tháng trước</h2>
        <p className="text-3xl">{orderCount.lastMonth}</p>
      </div>
    </div>
  );
};

export default OrderOverview;
