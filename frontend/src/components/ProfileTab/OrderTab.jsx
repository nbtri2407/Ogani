import axios from "axios";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common/apiUrl";
import formatPrice from "../../helper/formatPrice";
import moment from "moment";
import { toast } from "react-toastify";
import OrderDetailsModal from "../modals/OrderDetailsModal";
import CancelOrderModal from "../modals/CancelOrderModal";
import ModalDelete from "../modals/ModalDelete";
import FeedbackOrderModal from "../modals/FeedbackOrderModal";

const OrderTab = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState();
  const [orderFeedback, setOrderFeedback] = useState();
  const [orderCancel, setOrderCancel] = useState();
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [openFeedbacklOrder, setOpenFeedbacklOrder] = useState(false);

  const redirectToExternalSite = (link) => {
    window.location.replace(link);
  };

  const getAllOrders = async () => {
    await axios
      .get(SummaryApi.order.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setOrders(response.data.orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const retryPayment = async (orderId, app_trans_id, amount) => {
    await axios
      .post(
        SummaryApi.retryPayment.url,
        {
          orderId: orderId,
          appTransId: app_trans_id,
          amount: amount,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        redirectToExternalSite(response.data.data.order_url);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };

  const handleRetryPayment = async (orderId, app_trans_id, amount) => {
    const checkP = await checkPayment(app_trans_id);
    if (app_trans_id == undefined) {
      retryPayment(orderId, app_trans_id, amount);
    } else {
      if (checkP.return_code == 1) {
        updateOrderStatusPayment(orderId, "Đã thanh toán");
      } else {
        retryPayment(orderId, app_trans_id, amount);
      }
    }
  };

  const checkPayment = async (orderId) => {
    try {
      const response = await axios.post(
        SummaryApi.checkPayment.url,
        { app_trans_id: orderId },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatusPayment = async (orderId, status) => {
    await axios
      .put(
        SummaryApi.order.url,
        {
          orderId: orderId,
          status: status,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success("Đơn hàng đã được cập nhật trạng thái");
        getAllOrders();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateOrderStatus = async (orderId, status) => {
    await axios
      .patch(
        SummaryApi.order.url,
        {
          orderId: orderId,
          status: status,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success("Đơn hàng đã được cập nhật trạng thái");
        getAllOrders();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cancelOrder = async (orderId) => {
    await axios
      .post(
        SummaryApi.cancelOrder.url,
        { orderId },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success("Đã huỷ đơn hàng");
        getAllOrders();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const refundOrder = async (orderId, zp_trans_id, amount) => {
    await axios
      .post(
        SummaryApi.refundPayment.url,
        {
          orderId,
          zp_trans_id,
          amount,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success("Đã huỷ đơn hàng và xử lý hoàn tiền");
        getAllOrders();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCancelAndRefundOrder = async (
    orderId,
    app_trans_id,
    zp_trans_id
  ) => {
    const checkP = await checkPayment(app_trans_id);
    console.log("checkP", checkP);
    console.log("checkP.zp_trans_id", zp_trans_id);
    console.log("checkP.amount", checkP.amount);

    if (app_trans_id == undefined) {
      cancelOrder(orderId);
    } else {
      if (checkP.return_code == 1) {
        refundOrder(orderId, zp_trans_id, checkP.amount);
      } else {
        cancelOrder(orderId);
      }
    }
  };

  const [statusFilter, setStatusFilter] = useState("");
  console.log(statusFilter);

  // const handleUpdateStatusOrder = async (s) => {
  //   if (orderCancel) {
  //     await axios
  //       .patch(
  //         SummaryApi.order.url,
  //         { orderId: orderCancel._id, status: s },
  //         {
  //           withCredentials: true,
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then(function (response) {
  //         toast.success("Đánh giá thành công");
  //         getAllOrders();
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <div className="flex justify-center p-4 bg-gray-100">
      <div className="grid grid-cols-1 gap-4 border p-4 w-full">
        <div className="flex justify-between">
          <p className="text-2xl font-bold mb-4">Đơn hàng của bạn</p>
          <div className="">
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""} selected>
                Tất cả
              </option>
              <option value={"Chờ xác nhận"}>Chờ xác nhận</option>
              <option value={"Đã xác nhận"}>Đã xác nhận</option>
              <option value={"Đang vận chuyển"}>Đang vận chuyển</option>
              <option value={"Đã yêu cầu huỷ"}>Đã yêu cầu huỷ</option>
              <option value={"Đã nhận hàng"}>Đã nhận hàng</option>
              <option value={"Hoàn thành"}>Hoàn thành</option>
              <option value={"Đã huỷ"}>Đã huỷ</option>
            </select>
          </div>
        </div>

        {orders &&
          orders?.map((item, i) => {
            return (
              (item.status == statusFilter || statusFilter == "") && (
                <div
                  className="grid md:grid-cols-3 grid-cols-1 bg-white p-4 gap-2 md:gap-4"
                  key={i}
                >
                  <div className="grid md:col-span-2 col-span-1 gap-1">
                    <p className="">
                      <strong>Đơn hàng: </strong>
                      {item?._id}
                    </p>
                    <p className="">
                      <strong>Người nhận:</strong>
                      {` ${item?.address.receiver}`}
                    </p>
                    <p className="">
                      <strong>Số điện thoại:</strong>
                      {` ${item?.address.phone}`}
                    </p>
                    <p className="">
                      <strong>Địa chỉ nhận hàng:</strong>
                      {` ${item?.address.home}, ${item.address.ward.name}, ${item.address.district.name}, ${item.address.province.name}`}
                    </p>
                  </div>
                  <div className="grid col-span-1 gap-1">
                    <p className="">
                      <strong>Tổng tiền:</strong>{" "}
                      {formatPrice(item?.priceCheckout)}
                    </p>
                    <p className="">
                      <strong>Ngày đặt hàng:</strong>{" "}
                      {moment(item?.createdAt).format("DD/MM/YYYY hh:mmA")}
                    </p>
                    <p className="">
                      <strong>Trạng thái đơn hàng:</strong> {item?.status}
                    </p>
                    <p className="">
                      <strong>Thanh toán:</strong> {item?.paymentStatus}
                    </p>
                  </div>
                  {/* md:flex7  */}
                  <div className="md:col-span-3 flex  gap-2 items-center justify-end">
                    <button
                      onClick={() => {
                        setOrderDetail(item);
                        setOpenOrderDetail(true);
                      }}
                      type="button"
                      className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Xem chi tiết
                    </button>
                    {(item?.paymentStatus == "Chưa thanh toán" ||
                      item?.paymentStatus == "Thanh toán khi nhận hàng") &&
                      (item?.status == "Chờ xác nhận" ||
                        item?.status == "Đã xác nhận") && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRetryPayment(
                              item?._id,
                              item?.orderId,
                              item?.priceCheckout
                            )
                          }
                          className="text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Thanh toán ngay
                        </button>
                      )}
                    {(item?.status == "Chờ xác nhận" ||
                      item?.status == "Đã xác nhận") && (
                      <button
                        onClick={() => {
                          setOrderCancel(item);
                          setOpenCancelOrder(true);
                        }}
                        type="button"
                        className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Huỷ đơn hàng
                      </button>
                    )}

                    {item?.status == "Đang vận chuyển" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(item._id, "Đã nhận hàng")
                        }
                        type="button"
                        className="text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Đã nhận được hàng
                      </button>
                    )}

                    {item?.status == "Đã nhận hàng" && (
                      <button
                        onClick={() => {
                          setOrderFeedback(item);
                          setOpenFeedbacklOrder(true);
                        }}
                        type="button"
                        className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-400 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Đánh giá đơn hàng
                      </button>
                    )}

                    {item?.status == "Hoàn thành" && (
                      <button
                        onClick={() => {
                          setOrderFeedback(item);
                          setOpenFeedbacklOrder(true);
                        }}
                        type="button"
                        className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-400 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Xem đánh giá
                      </button>
                    )}
                  </div>
                </div>
              )
            );
          })}
      </div>
      {/* // Modal */}
      <OrderDetailsModal
        open={openOrderDetail}
        order={orderDetail}
        onClose={() => setOpenOrderDetail(false)}
        callBack={(a) =>
          handleRetryPayment(a?._id, a?.orderId, a?.priceCheckout)
        }
      />

      <FeedbackOrderModal
        open={openFeedbacklOrder}
        order={orderFeedback}
        onClose={() => setOpenFeedbacklOrder(false)}
        callBack={() => {
          getAllOrders();
        }}
      />

      <ModalDelete
        open={openCancelOrder}
        onClose={() => setOpenCancelOrder(false)}
        callBack={() =>
          handleCancelAndRefundOrder(
            orderCancel._id,
            orderCancel.orderId,
            orderCancel.zpTransId
          )
        }
        message={"Bạn chắc chắn muốn huỷ đơn hàng này?"}
      />
    </div>
  );
};

export default OrderTab;
