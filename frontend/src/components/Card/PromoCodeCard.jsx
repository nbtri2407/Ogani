import React from "react";
import formatPrice from "../../../../frontend/src/helper/formatPrice";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const PromoCodeCard = ({ promo }) => {
  const {
    _id,
    code,
    discountType,
    discountValue,
    minOrderValue,
    expiryDate,
    usageLimit,
    usedCount,
    status,
  } = promo;

  const used = (usedCount / usageLimit) * 100;

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        if (used !== 100) toast.success("Mã giảm giá đã được sao chép");
        else toast.error("Mã giảm giá đã hết lượt sử dụng");
      })
      .catch((error) => console.error("Failed to copy promo code:", error));
  };
  return (
    <div className="w-full p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Mã: {code}</h2>
        <span
          className={`px-3 py-1 text-xs font-semibold uppercase rounded-full ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status === "active" ? "Đang hoạt động" : "Hết hạn"}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">
          Giảm giá:{" "}
          <span className="font-semibold text-gray-900">
            {discountType === "percentage"
              ? `${discountValue}%`
              : formatPrice(discountValue)}
          </span>
        </p>
        <p className="text-gray-600 mt-2">
          Đơn tối thiểu:{" "}
          <span className="font-semibold text-gray-900">
            {formatPrice(minOrderValue)}
          </span>
        </p>
        <p className="text-gray-600 mt-2">
          Ngày hết hạn:{" "}
          <span className="font-semibold text-gray-900">
            {new Date(expiryDate).toLocaleDateString("vi-VN")}
          </span>
        </p>
        <p className="text-gray-600 mt-2">
          Đã sử dụng:{" "}
          <span className="font-semibold text-gray-900">{`${used}%`}</span>
        </p>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleCopyCode}
          class="w-full text-white bg-primary hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center items-center inline-flex justify-center"
        >
          <span id="default-message">Sao chép mã</span>
        </button>
      </div>
    </div>
  );
};

export default PromoCodeCard;
