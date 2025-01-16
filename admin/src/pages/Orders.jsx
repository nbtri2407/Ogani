import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SummaryApi from "../common/apiUrl";
import { toast } from "react-toastify";
import moment from "moment";
import formatPrice from "../../../frontend/src/helper/formatPrice";
import OrderDetailsModal from "../components/Modal/OrderDetailsModal";
import ModalDelete from "../components/Modal/ModalDelete";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [orderDetail, setOrderDetail] = useState();
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [updateOrderId, setUpdateOrderId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const getAllOrder = async () => {
    await axios
      .get(SummaryApi.allOrder.url, {
        withCredentials: true,
        params: {
          page: 1,
          limit: Infinity,
        },
      })
      .then(function (response) {
        setOrders(response?.data?.data);
        setFilteredOrders(response?.data?.data);
        setPagination(response?.data?.pagination);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (array, pageSize, currentPage) => {
    console.log(pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  };
  const [filteredOrders, setFilteredOrders] = useState([]);
  useEffect(() => {
    setTotalPages(Math.ceil(filteredOrders.length / pageSize));
  }, [pageSize, filteredOrders]);

  useEffect(() => {
    getAllOrder();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      return order.status === statusFilter || statusFilter == "";
    });
    setFilteredOrders(filtered);
  }, [statusFilter]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const searchRegex = new RegExp(searchQuery, "i");

      const result = orders.filter((order) => {
        return (
          searchRegex.test(order._id) ||
          searchRegex.test(order.address.receiver) ||
          searchRegex.test(order.address.phone)
        );
      });

      setFilteredOrders(result);
    } catch (error) {
      // toast.error("Không tìm thấy đơn hàng")
    }
  }, [searchQuery, orders]);

  const [paginatedData, setPaginatedData] = useState(
    paginate(filteredOrders, pageSize, currentPage)
  );

  useEffect(() => {
    setPaginatedData(paginate(filteredOrders, pageSize, currentPage));
  }, [filteredOrders, pageSize, currentPage]);

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
        getAllOrder();
        toast.success("Đơn hàng đã được cập nhật trạng thái");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="px-10 py-2 relative min-h-[90vh]">
      <div className="flex items-center justify-between py-4 border-b border-slate-400">
        <h1 className="text-[2rem] font-bold">Tất cả đơn hàng</h1>

        {/* <IoIosAddCircle
          className="text-[1.6rem] hover:text-primary transition-all cursor-pointer"
          onClick={() => setShowAddForm(true)}
        /> */}
      </div>
      <div className="flex items-center gap-2 justify-end py-4 border-b border-slate-400">
        <div className="flex-1 flex gap-8">
          <label
            htmlFor="default-search"
            className="text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative lg:w-2/3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="default-search"
              className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mã đơn hàng, Tên hoặc Sđt người nhận..."
              required
            />
          </div>
        </div>
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
            <option value={"Đã nhận hàng"}>Đã nhận hàng</option>
            <option value={"Hoàn thành"}>Hoàn thành</option>
            <option value={"Đã huỷ"}>Đã huỷ</option>
          </select>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <p>Số sản phẩm trên 1 trang</p>
          <select
            className="rounded-lg"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[60vh]">
        <div className="grid grid-cols-4 gap-2 p-4">
          <div className="col-span-3">
            <p className="text-md text-gray-700 uppercase font-bold">
              Thông tin đơn hàng
            </p>
          </div>
          <div className="col-span-1">
            <p className="text-md text-gray-700 uppercase font-bold">
              Hành động
            </p>
          </div>

          {paginatedData.map(
            (order, index) =>
              (order.status == statusFilter || statusFilter == "") && (
                <div
                  className="grid grid-cols-4 col-span-4 gap-2 border-t border-b p-4 rounded-lg bg-slate-200"
                  key={index}
                >
                  <div className="grid grid-cols-2 gap-2 items-start lg:col-span-3 col-span-4">
                    <strong>Mã đơn hàng: </strong>
                    <p className="col-span-1 line-clamp-1">{order?._id}</p>
                    <strong>Ngày đặt hàng:</strong>
                    <p className="col-span-1">
                      {moment(order?.createdAt).format("DD/MM/YYYY hh:mmA")}
                    </p>
                    <strong>Trạng thái đơn hàng:</strong>
                    <p
                      className={`col-span-1 ${
                        order?.status == "Đã huỷ"
                          ? "text-red-500"
                          : "text-primary"
                      }`}
                    >
                      {order?.status}
                    </p>
                    <p className="col-span-1">
                      <strong>Tổng tiền:</strong>{" "}
                      {formatPrice(order?.priceCheckout)}
                    </p>
                    <p className="col-span-1">{order?.paymentStatus}</p>

                    <div className="grid grid-cols-2 col-span-2 py-2">
                      <p className="md:col-span-1 col-span-2">
                        <strong>Người nhận:</strong>
                        {` ${order?.address.receiver}`}
                      </p>
                      <p className="md:col-span-1 col-span-2">
                        <strong>Số điện thoại:</strong>
                        {` ${order?.address.phone}`}
                      </p>
                      <p className="col-span-2">
                        <strong>Địa chỉ nhận hàng:</strong>
                        {` ${order?.address.home}, ${order.address.ward.name}, ${order.address.district.name}, ${order.address.province.name}`}
                      </p>
                    </div>
                  </div>
                  {/* grid grid-cols-4 lg:grid-cols-1 */}
                  <div className="lg:col-span-1 col-span-4 flex lg:flex-col">
                    <button
                      onClick={() => {
                        setOrderDetail(order);
                        setOpenOrderDetail(true);
                      }}
                      type="button"
                      className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Xem chi tiết
                    </button>
                    {order?.status == "Chờ xác nhận" && (
                      <button
                        type="button"
                        onClick={() => {
                          setUpdateOrderId(order._id);
                          updateOrderStatus(updateOrderId, "Đã xác nhận");
                        }}
                        className="text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Xác nhận đơn hàng
                      </button>
                    )}
                    {order?.status == "Đã xác nhận" && (
                      <button
                        type="button"
                        onClick={() => {
                          setUpdateOrderId(order._id);
                          updateOrderStatus(updateOrderId, "Đang vận chuyển");
                        }}
                        className="text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Đã giao vận chuyển
                      </button>
                    )}

                    {(order?.status == "Chờ xác nhận" ||
                      order?.status == "Đã xác nhận") && (
                      <button
                        onClick={() => {
                          setUpdateOrderId(order._id);
                          setOpenCancelOrder(true);
                        }}
                        type="button"
                        className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Huỷ đơn hàng
                      </button>
                    )}

                    {order?.status == "Hoàn thành" && (
                      <button
                        type="button"
                        onClick={() => {
                          setOrderDetail(order);
                          setOpenOrderDetail(true);
                        }}
                        className="text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Xem đánh giá
                      </button>
                    )}
                    {order?.status != "Đã huỷ" && (
                      <button
                        type="button"
                        // onClick={() =>
                        //   handleRetryPayment(item?._id, item?.orderId)
                        // }
                        className="text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Cập nhật trạng thái thanh toán
                      </button>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Trước"}
        nextLabel={"Sau"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex items-center justify-center gap-1 mt-8"}
        pageClassName={"px-3 py-1 border border-blue-400 "}
        pageLinkClassName={"page-link"}
        previousClassName={"px-3 py-1 border border-blue-400"}
        previousLinkClassName={"page-link"}
        nextClassName={"px-3 py-1 border border-blue-400 "}
        nextLinkClassName={"page-link"}
        breakClassName={"px-3 py-1 border border-blue-400 "}
        breakLinkClassName={"page-link"}
        activeClassName={"bg-blue-400 text-white"}
      />

      {showModalDelete && (
        <ConfirmDelete
          title={"Sản phẩm"}
          onClose={() => setShowModalDelete(false)}
          callBack={handleDeleteProduct}
        />
      )}

      <OrderDetailsModal
        order={orderDetail}
        open={openOrderDetail}
        onClose={() => setOpenOrderDetail(false)}
      />

      <ModalDelete
        open={openCancelOrder}
        onClose={() => setOpenCancelOrder(false)}
        callBack={() => updateOrderStatus(updateOrderId, "Đã huỷ")}
        message={"Bạn chắc chắn muốn huỷ đơn hàng này"}
      />
    </div>
  );
};

export default Orders;
