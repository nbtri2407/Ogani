import axios from "axios";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common/apiUrl";
import formatPrice from "../../helper/formatPrice";
import { toast } from "react-toastify";

const FeedbackOrderModal = ({ order, open, onClose, callBack }) => {
  const [orderDetail, setOrderDetail] = useState([]);

  const [rating, setRating] = useState([]);

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
          const data = response.data.orders;

          setOrderDetail(response.data.orders);
          setRating(
            data.map((item) => ({
              _id: item._id,
              productId: item.product._id,
              rating: item.rating,
              hover: 0,
            }))
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const [message, setMessage] = useState("");
  useEffect(() => {
    getOrderDetails();
    setMessage("");
  }, [order, open]);

  const updateRating = (e) => {
    const { name, value } = e.target;
    const updatedRating = rating.map((rating) => {
      if (rating._id === name) {
        // Cập nhật rating của sản phẩm
        return { ...rating, rating: value };
      }
      return rating;
    });

    setRating(updatedRating);
  };

  const handleHover = (_id, newHover) => {
    const updatedRating = rating.map((rating) => {
      if (rating._id === _id) {
        return { ...rating, hover: newHover };
      }
      return rating;
    });
    setRating(updatedRating);
  };

  const handleFeedbackOrder = async () => {
    console.log("order._id", order._id);
    console.log("rating", rating);
    console.log("message", message);

    await axios
      .post(
        SummaryApi.feedback.url,
        {
          orderId: order._id,
          rating,
          message,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success("Gửi đánh giá thành công!");
        callBack();
        onClose();
      })
      .catch(function (error) {
        console.log(error?.response?.data?.message);
      });
  };

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        open ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/40`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <form action="" onSubmit={handleFeedbackOrder}>
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lgtext-gray-900 dark:text-white font-bold">
                Đánh giá sản phẩm
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
                  <div className="flex gap-4 justify-between mt-2">
                    <div className="flex">
                      {item?.rating != 0 ? (
                        <div className="flex items-center">
                          {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            return (
                              <label key={index} className="flex">
                                <input
                                  type="radio"
                                  style={{ display: "none" }}
                                />
                                <svg
                                  className={`w-5 h-5 ${
                                    currentRating <=
                                      rating?.find(
                                        (rating) => rating._id === item?._id
                                      ).hover ||
                                    currentRating <=
                                      rating?.find(
                                        (rating) => rating._id === item?._id
                                      ).rating
                                      ? "text-yellow-300"
                                      : "text-slate-500"
                                  } `}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                              </label>
                            );
                          })}
                          <p className="text-red-500">(Đã đánh giá)</p>
                        </div>
                      ) : (
                        [...Array(5)].map((star, index) => {
                          const currentRating = index + 1;
                          return (
                            <label key={index} className="flex">
                              <input
                                type="radio"
                                name={item?._id}
                                value={currentRating}
                                onClick={(e) => updateRating(e)}
                                // style={{ display: "none" }}
                                className="w-0 h-0 bg-white border-white focus:ring-white"
                                required
                              />
                              <svg
                                className={`w-5 h-5 ${
                                  currentRating <=
                                    rating?.find(
                                      (rating) => rating._id === item?._id
                                    ).hover ||
                                  currentRating <=
                                    rating?.find(
                                      (rating) => rating._id === item?._id
                                    ).rating
                                    ? "text-yellow-300"
                                    : "text-slate-500"
                                } `}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                onMouseEnter={() =>
                                  handleHover(item?._id, currentRating)
                                }
                                onMouseLeave={() => handleHover(item?._id, 0)}
                                style={{ cursor: "pointer" }}
                              >
                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                              </svg>
                            </label>
                          );
                        })
                      )}
                    </div>
                    <a
                      href={`/product/${item?.product?._id}`}
                      className="text-primary hover:underline"
                    >
                      Xem sản phẩm
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 p-4 sm:gap-2 border">
              <div className="col-span-2 flex flex-col gap-2">
                <p className="">Đánh giá của bạn về đơn hàng:</p>
                {order?.status == "Hoàn thành" ? (
                  <>
                  <p className="bg-slate-200 p-2">{order?.feedBack}</p>
                  </>
                ) : (
                  <>
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Cảm nhận của bạn..."
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="text-white text-center bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Gửi đánh giá
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="md:col-span-3 mt-2 flex gap-2 items-center justify-end"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackOrderModal;
