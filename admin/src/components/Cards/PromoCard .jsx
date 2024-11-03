import React from "react";
import formatPrice from "../../../../frontend/src/helper/formatPrice";
import { MdDeleteForever } from "react-icons/md";

const PromoCard = ({ promo, handleDelete, handleEdit }) => {
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
          Lượt sử dụng:{" "}
          <span className="font-semibold text-gray-900">{usedCount}</span>
        </p>
        <p className="text-gray-600 mt-2">
          Lượt sử dụng tối đa:{" "}
          <span className="font-semibold text-gray-900">{usageLimit}</span>
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(promo)}
          className="mt-6 flex-1 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 transition duration-300"
        >
          Cập nhật
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="mt-6 px-2 bg-red-600 text-2xl text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
