import axios from "axios";
import React, { useEffect, useState } from "react";
import SummaryApi from "../common/apiUrl";
import PromoCodeCard from "../components/Card/PromoCodeCard";
import Heading from "../components/heading/Heading";

const PromoCode = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const getAllPromoCode = async () => {
    await axios
      .get(SummaryApi.promoCode.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setPromoCodes(response?.data?.data);
        setFilteredPromoCodes(response?.data?.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getAllPromoCode();
  }, []);
  const [activePromoCodes, setActivePromoCodes] = useState([]);
  useEffect(() => {
    const filteredPromoCodes = promoCodes.filter(
      (promo) => promo.status === "active"
    );
    setActivePromoCodes(filteredPromoCodes);
  }, [promoCodes]);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 xl:px-0 mt-16">
        <h1 className="font-bold text-3xl">Các mã giảm giá dành cho bạn</h1>

        {activePromoCodes.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 p-2">
            {activePromoCodes.map((promoCode, index) => (
              <PromoCodeCard key={index} promo={promoCode} />
            ))}
          </div>
        ) : (
          <h1 className="font-bold text-xl text-center w-full mt-4">
            Hiện không có mã giảm giá nào
          </h1>
        )}
      </div>

    </div>
  );
};

export default PromoCode;
