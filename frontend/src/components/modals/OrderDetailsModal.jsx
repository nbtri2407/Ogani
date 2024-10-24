import axios from "axios";
import React, { useEffect } from "react";
import SummaryApi from "../../common/apiUrl";
import formatPrice from "../../helper/formatPrice";
import moment from "moment";

const OrderDetailsModal = ({ order, open, onClose, callBack }) => {
  const shipMethod = {
    standard: "Tiêu chuẩn",
    express: "Nhanh",
  };
  const payMethod = {
    cod: "Thanh toán khi nhận hàng",
    zalo: "Thanh toán trực tuyến",
  };

  const [orderDetail, setOrderDetail] = React.useState([]);

  const getOrderDetails = async () => {
    if (order) {
      await axios
        .get(`${SummaryApi.order.url}/${order._id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          setOrderDetail(response.data.orders);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [order]);

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        open ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/40`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lgtext-gray-900 dark:text-white font-bold">
              Chi tiết đơn hàng
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="w-full flex flex-col gap-2 max-h-[50vh] overflow-y-auto p-2">
            {orderDetail.map((item, i) => (
              <div className="border-b-2" key={i}>
                <div className="flex gap-6 items-center">
                  <a href="#" className="relative">
                    <img
                      src={item?.product?.imageUrl?.[0]}
                      alt="item"
                      className="w-16 h-16 border border-black/20 object-scale-down cursor-pointer hover:border-primary transition-all"
                    />
                    {/* <div className="absolute -top-1 -right-1 rounded-full bg-primary text-xs text-white w-5 h-5 flex items-center justify-center">
                        {order?.quantity}
                      </div> */}
                  </a>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="line-clamp-1">
                        {item?.product?.productName}
                      </p>
                      <p>
                        {formatPrice(
                          item?.product?.size[item?.size]?.price *
                            item?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>{item?.size}</p>

                      <p>x{item?.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <p className="text-yellow-500 hover:underline cursor-pointer">
                    Đánh giá
                  </p>
                  <a href="#" className="text-primary hover:underline">
                    Xem sản phẩm
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 p-4 sm:gap-2 border">
            <div className="col-span-2 flex flex-col gap-2">
              <div className="">
                <div className="flex justify-between items-center w-full mt-2">
                  <p className="text-base">Giá sản phẩm: </p>
                  <p className="text-base ">
                    {formatPrice(order?.totalAmount)}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <p className="text-base">Vận chuyển: </p>
                  <p className="text-base">{formatPrice(order?.shippingFee)}</p>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <p className="text-base">Giảm giá: </p>
                  <p className="text-base">-{formatPrice(order?.discount)}</p>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <p className="text-base">Tổng cộng: </p>
                  <p className="text-base">
                    {formatPrice(order?.priceCheckout)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 mt-2 flex gap-2 items-center justify-end">
            {(order?.paymentStatus == "Chưa thanh toán" ||
              order?.paymentStatus == "Thanh toán khi nhận hàng") &&
              (order?.status == "Chờ xác nhận" ||
                order?.status == "Đã xác nhận") && (
                <button
                  type="button"
                  onClick={() => callBack(order)}
                  className="text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                >
                  Thanh toán ngay
                </button>
              )}
            {/* {(order?.status == "Chờ xác nhận" ||
              order?.status == "Đã xác nhận") && (
              <button
                type="button"
                className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
              >
                Huỷ đơn hàng
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
