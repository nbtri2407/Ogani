import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import SummaryApi from "../../common/apiUrl";

const UpdatePromoCode = ({ promo, onClose, callBack }) => {
  const [formData, setFormData] = useState({
    _id: promo?._id,
    code: promo?.code,
    discountType: promo?.discountType,
    discountValue1: 0,
    discountValue2: 0,
    expiryDate: promo?.expiryDate,
    usageLimit: promo?.usageLimit,
    minOrderValue: promo?.minOrderValue,
    status: promo?.status,
  });

  useEffect(() => {
    const promo1 = {
      _id: promo?._id,
      code: promo?.code,
      discountType: promo?.discountType,
      expiryDate: moment(promo?.expiryDate).format("YYYY-MM-DD"),
      usageLimit: promo?.usageLimit,
      minOrderValue: promo?.minOrderValue,
      status: promo?.status,
      discountValue1: 0,
      discountValue2: 0,
    };
    if (promo.discountType == "percentage") {
      promo1.discountValue1 = promo.discountValue;
    } else if (promo.discountType == "amount") {
      promo1.discountValue2 = promo.discountValue;
    }
    setFormData(promo1);
  }, [promo]);
  console.log(promo);
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const today = new Date().toISOString().split("T")[0];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const promoCode = {
      _id: formData._id,
      code: formData.code,
      discountType: formData.discountType,
      discountValue: 0,
      expiryDate: formData.expiryDate,
      usageLimit: +formData.usageLimit,
      minOrderValue: +formData.minOrderValue,
      status: formData.status,
    };
    if (formData.discountType === "percentage") {
      promoCode.discountValue = +formData.discountValue1;
    } else if (formData.discountType === "amount") {
      promoCode.discountValue = +formData.discountValue2;
    }
    await axios
      .put(
        SummaryApi.promoCode.url,
        { promoCode },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success(response?.data?.message);
        callBack();
        onClose();
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message); 
      });
  };
  return (
    <div className="absolute top-0 h-[92vh] left-0 right-0 bg-black/20">
      <div className="absolute rounded-lg z-10 top-[10%] left-[50%] translate-x-[-50%] flex flex-col gap-6 md:w-[50%] w-[90%] p-4 shadow bg-white border">
        <div className="flex">
          <h1 className="text-2xl">Tạo mã giảm giá</h1>
          <button
            onClick={onClose}
            className="block ml-auto text-2xl border border-black/20 text-primary hover:bg-primary hover:text-white transition-all"
          >
            <IoMdClose />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:gap-6 gap-2"
        >
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <label htmlFor="categoryName">Mã giảm giá</label>
            <input
              className=" border border-black/50 p-2 rounded outline-none"
              type="text"
              id="categoryName"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2 rounded outline-none col-span-2 md:col-span-1">
            <label>Ngày hết hạn:</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="rounded outline-none"
              min={today}
              required
            />
          </div>

          <div className="col-span-2 flex items-center md:ps-4 px-1 border border-black/50 rounded">
            <input
              id="discountType-1"
              type="radio"
              name="discountType"
              value="percentage"
              checked={formData.discountType === "percentage"}
              onChange={handleChange}
              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              required
            />
            <label
              htmlFor="discountType-1"
              className="flex items-center flex-1 py-2 gap-4 cursor-pointer ms-2 text-sm font-medium text-gray-900"
            >
              <p className="w-1/4"> Phần trăm</p>

              <input
                className="flex-1 p-2 rounded outline-none disabled:text-slate-400 disabled:cursor-not-allowed"
                type="number"
                name="discountValue1"
                value={formData.discountValue1}
                onChange={handleChange}
                disabled={formData.discountType === "amount"}
                max={100}
                min={0}
                required
              />
            </label>
          </div>
          <div className="col-span-2 flex items-center md:ps-4 px-1 border border-black/50 rounded">
            <input
              id="discountType-2"
              type="radio"
              name="discountType"
              value="amount"
              checked={formData.discountType === "amount"}
              onChange={handleChange}
              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="discountType-2"
              className="flex items-center flex-1 py-2 gap-4 cursor-pointer ms-2 text-sm font-medium text-gray-900"
            >
              <p className="w-1/4">Giá tiền</p>

              <input
                className="flex-1 p-2 rounded outline-none disabled:text-slate-400 disabled:cursor-not-allowed"
                type="number"
                name="discountValue2"
                value={formData.discountValue2}
                onChange={handleChange}
                disabled={formData.discountType === "percentage"}
                min={1000}
                max={1000000000}
                required
              />
            </label>
          </div>

          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <label htmlFor="categoryName">Đơn hàng tối thiểu</label>
            <input
              className=" border border-black/50 p-2 rounded outline-none"
              type="number"
              name="minOrderValue"
              value={formData.minOrderValue}
              onChange={handleChange}
              min={0}
              max={1000000000}
              required
            />
          </div>

          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <label htmlFor="categoryName">Số lượt sử dụng</label>
            <input
              className=" border border-black/50 p-2 rounded outline-none"
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              min={1}
              max={1000000000}
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn bg-primary py-2 text-white hover:bg-primary/80 col-span-2"
          >
            Cập nhật mã giảm giá
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePromoCode;
