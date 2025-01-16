import axios from "axios";
import React from "react";
import { useState } from "react";
import SummaryApi from "../../common/apiUrl";
import formatPrice from "../../helper/formatPrice";

const RevenueStatistics = () => {
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD
  };

  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getToday());
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRevenue = async () => {
    try {
      setLoading(true);
      const response = await axios.get(SummaryApi.revenueStatistics.url, {
        params: { startDate, endDate },
        withCredentials: true,
      });
      setRevenueData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-300 px-2 py-4">
      <h2 className="text-2xl font-bold">Thống kê doanh thu</h2>
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày kết thúc
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end my-2 w-full">
        <button
          onClick={fetchRevenue}
          className="self-end px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Thống kê
        </button>
      </div>

      {loading && <p>Đang tải...</p>}

      {revenueData && (
        <div>
          <h3 className="text-2xl font-bold">Kết quả:</h3>
          <p className="mt-2 text-xl">
            Tổng doanh thu:{" "}
            <strong>{formatPrice(revenueData.totalRevenue)}</strong>
          </p>
          <p className="mt-1 text-xl">
            Tổng số đơn hàng: <strong>{revenueData.ordersCount2}</strong>
          </p>
          <p className="mt-1 text-xl">
            Số đơn hàng hoàn thành: <strong>{revenueData.ordersCount}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default RevenueStatistics;
