import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import formatPrice from "../helper/formatPrice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common/apiUrl";
import SelectAddressModal from "../components/modals/SelectAddressModal";

const Checkout = () => {
  const user = useSelector((state) => state.user.user);
  const navigator = useNavigate();
  const [discount, setDiscount] = useState(100000);
  const [shipMethod, setShipMethod] = useState("standard");
  const shipMethodList = {
    standard: 50000,
    express: 70000,
  };
  const handleShipChange = (event) => {
    setShipMethod(event.target.value);
  };

  const [openOrderList, setOpenOrderList] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setOpenOrderList(false);
      } else {
        setOpenOrderList(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [payment, setPayment] = useState("cod");
  const handleOnChecedPayment = (e) => {
    setPayment(e.target.value);
  };

  const [carts, setCarts] = useState([]);
  const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  useEffect(() => {
    setCarts(getCartFromLocalStorage()) || [];
  }, [localStorage.getItem("cart")]);

  const calculateTotalCartPrice = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => {
      return sum + item.quantity * item.product.size?.[item.size]?.price;
    }, 0);
    return total;
  };

  let totalPrice = calculateTotalCartPrice();
  window.addEventListener("cartChanged", (event) => {
    setCarts(getCartFromLocalStorage()) || [];
    totalPrice = calculateTotalCartPrice();
  });

  const [openSelectAddress, setOpenSelectAddress] = useState(false);

  const [address, setAddress] = useState({});
  const [addressList, setAddressList] = useState([]);

  const getAllAddress = async () => {
    await axios
      .get(SummaryApi.address.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setAddressList(response.data.data);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const handleSetDefaultAddress = async (addressId) => {
    await axios
      .post(
        SummaryApi.setDefaultAddress.url,
        {
          addressId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        getAllAddress();
        setAddressDefault();
        toast.success("Cập nhật thành công!");
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const setAddressDefault = () => {
    const defaultAddress = addressList?.find(
      (address) => address.isDefault === true
    );
    setAddress(defaultAddress);
  };

  useEffect(() => {
    getAllAddress();
  }, []);
  useEffect(() => {
    setAddressDefault();
  }, [addressList]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const priceCheckout = totalPrice + shipMethodList[shipMethod] - discount;

    const data = {
      orderItem: carts,
      totalAmount: totalPrice,
      shippingFee: shipMethodList[shipMethod],
      discount: discount,
      priceCheckout: priceCheckout,
      shippingAddress: address._id,
      shippingMethod: shipMethod,
      paymentMethod: payment,
    };

    await axios
      .post(SummaryApi.order.url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        localStorage.removeItem("cart");
        navigator("/order-success");
        toast.success(" thành công!");
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };
  // localStorage.removeItem("cart");
  return (
    <div className="mx-auto max-w-6xl px-6 xl:px-0 mt-16 min-h-[70vh] mb-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <hr />
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 mt-4">
        {/*  =-- */}
        <div className="col-span-1">
          {/* address */}
          <div className="col-span-1 flex flex-col gap-4 mt-4">
            <h1 className="text-xl w-full font-bold">Thông tin vận chuyển</h1>
            <div className="flex p-6 w-full border border-black/30 rounded-md">
              {user ? (
                address ? (
                  <div className="flex justify-between gap-4 w-full">
                    <div className="flex-1">
                      <div className="flex">
                        <p>{address?.receiver}</p>
                        <p className="mx-2">|</p>
                        <p>{address?.phone}</p>
                      </div>
                      <p className="text-gray-500">{address?.home}</p>
                      <p className="text-gray-500">
                        {address?.province?.name}, {address?.district?.name},{" "}
                        {address?.ward?.name}
                      </p>
                      {address.isDefault && (
                        <p className="text-red-500 border border-red-500 max-w-fit px-2">
                          Mặc định
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col items-end">
                        <button
                          type="button"
                          className="text-primary hover:underline"
                        >
                          Cập nhật
                        </button>
                        <button
                          onClick={() => setOpenSelectAddress(true)}
                          type="button"
                          className="text-red-500 hover:underline"
                        >
                          Thay đổi
                        </button>
                      </div>
                      {!address.isDefault && (
                        <div className="">
                          <button
                            onClick={() => handleSetDefaultAddress(address._id)}
                            className="hover:underline"
                          >
                            Đặt mặc định
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              ) : (
                <div className="w-full">
                  <p className="text-center">
                    <a
                      href="/auth"
                      className="text-primary hover:underline font-bold"
                    >
                      Đăng nhập
                    </a>{" "}
                    để chọn địa chỉ giao hàng
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* address */}
          <div className="col-span-1 flex flex-col gap-4 mt-4">
            <h1 className="text-xl w-full font-bold">Phương thức vận chuyển</h1>
            <div className="w-full border border-black/30 rounded-md p-6 flex flex-col justify-center gap-4">
              <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                  <input
                    type="radio"
                    id="hosting-small"
                    name="shipMethod"
                    value="standard"
                    className="hidden peer"
                    onChange={handleShipChange}
                    checked={shipMethod === "standard"}
                    required
                  />
                  <label
                    htmlFor="hosting-small"
                    className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-bold">Tiêu chuẩn</div>
                      <div className="w-full">2-3 ngày làm việc</div>
                      <div className="w-full font-semibold">
                        {formatPrice(shipMethodList["standard"])}
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="hosting-big"
                    name="shipMethod"
                    value="express"
                    className="hidden peer"
                    onChange={handleShipChange}
                    checked={shipMethod === "express"}
                  />
                  <label
                    htmlFor="hosting-big"
                    className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-bold">Hoả tốc</div>
                      <div className="w-full">1-2 ngày làm việc</div>
                      <div className="w-full font-semibold">
                        {formatPrice(shipMethodList["express"])}
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4 mt-4">
            <h1 className="text-xl w-full font-bold">Phương thức thanh toán</h1>
            <div className="w-full border border-black/30 rounded-md p-8 flex flex-col justify-center gap-4">
              <div className="w-full flex gap-2 items-center">
                <input
                  type="radio"
                  name="payment"
                  value={"cod"}
                  checked={payment === "cod"}
                  onChange={handleOnChecedPayment}
                  id="payment1"
                />
                <label htmlFor="payment1">Thanh toán khi nhận hàng (COD)</label>
              </div>
              <div className="w-full flex gap-2 items-center">
                <input
                  type="radio"
                  name="payment"
                  value={"paypal"}
                  checked={payment === "paypal"}
                  onChange={handleOnChecedPayment}
                  id="payment2"
                />
                <label htmlFor="payment2">Thanh toán chuyển khoản</label>
              </div>
            </div>
          </div>
        </div>

        {/* Product */}
        <div className="col-span-1 flex flex-col gap-4 ">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-xl">Sản phẩm</h1>
            <div
              className="md:hidden text-lg text-primary hover:underline cursor-pointer flex gap-1 items-center"
              onClick={() => setOpenOrderList(!openOrderList)}
            >
              <p>Xem chi tiết</p>
              <MdArrowForwardIos
                className={
                  openOrderList
                    ? "rotate-90 duration-300"
                    : "rotate-0 duration-300"
                }
              />
            </div>
          </div>
          {openOrderList && (
            <div className="w-full flex flex-col gap-2 max-h-[36vh] overflow-y-auto">
              {carts?.map(
                (cart, i) =>
                  cart.product.size[cart.size].quantity > 0 && (
                    <div className="flex gap-6 items-center" key={i}>
                      <a href="#" className="relative">
                        <img
                          src={cart?.product?.imageUrl?.[0]}
                          alt="item"
                          className="w-16 h-16 border border-black/20 object-scale-down cursor-pointer hover:border-primary transition-all"
                        />
                        {/* <div className="absolute -top-1 -right-1 rounded-full bg-primary text-xs text-white w-5 h-5 flex items-center justify-center">
                        {cart?.quantity}
                      </div> */}
                      </a>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="line-clamp-1">
                            {cart?.product?.productName}
                          </p>
                          <p>
                            {formatPrice(
                              cart?.product?.size[cart?.size]?.price *
                                cart?.quantity
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p>{cart?.size}</p>

                          <p>x{cart?.quantity}</p>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
          <hr />
          <div className="flex justify-between items-center gap-4 w-full mt-2">
            <input
              type="text"
              name="discount"
              // value={info.home}
              // onChange={(e) => handleInputOnChange(e)}
              placeholder="Mã giảm giá"
              className="w-full p-2 border border-black/30 rounded-md outline-none"
            />
            <button type="button" className="primary-btn w-64">
              Áp dụng
            </button>
          </div>
          <div className="w-full">
            <p className="font-bold">Chi tiết hoá đơn</p>
            <div className="flex justify-between items-center w-full mt-2">
              <p className="text-base">Giá sản phẩm: </p>
              <p className="text-base">{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex justify-between items-center w-full mt-2">
              <p className="text-base">Vận chuyển: </p>
              <p className="text-base">
                {formatPrice(shipMethodList[shipMethod])}
              </p>
            </div>
            <div className="flex justify-between items-center w-full mt-2">
              <p className="text-base">Giảm giá: </p>
              <p className="text-base">-{formatPrice(discount)}</p>
            </div>
            <div className="flex justify-between items-center w-full mt-2">
              <p className="text-base">Tổng cộng: </p>
              <p className="text-base">
                {formatPrice(
                  totalPrice + shipMethodList[shipMethod] - discount
                )}
              </p>
            </div>
          </div>
          {user ? (
            <button
              onClick={handleCheckout}
              type="button"
              className="primary-btn w-full mt-2"
            >
              Đặt hàng
            </button>
          ) : (
            <a href="/auth" className="primary-btn w-full mt-2 text-center">
              Đăng nhập
            </a>
          )}
        </div>
        {/* </div> */}
      </div>

      {/* Modal */}
      <SelectAddressModal
        address={address}
        addressList={addressList}
        open={openSelectAddress}
        onClose={() => setOpenSelectAddress(false)}
        callBack={(a) => {
          setAddress(a);
        }}
      />
      {/* Modal */}
    </div>
  );
};

export default Checkout;
