import React, { useEffect } from "react";
("use client");

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import formatPrice from "../../helper/formatPrice";
import { toast } from "react-toastify";

const Cart = ({ callBack, onClose, open }) => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  useEffect(() => {
    setCarts(getCartFromLocalStorage()) || [];
    calculateTotalCartPrice();
  }, [localStorage.getItem("cart")]);
  
  const calculateTotalCartPrice = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => {
      return sum + item.quantity * item.product.size[item.size].price;
    }, 0);
    setTotalPrice(total);
  }; 

  const removeProductFromCart = (cartItemDelete, size) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(
      (item) => item.product._id !== cartItemDelete._id || item.size !== size
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    setCarts(getCartFromLocalStorage()) || [];
  };

  const updateQtyCart = (cartItem, size, qty) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.product._id === cartItem._id && item.size === size
    );
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity = qty;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCarts(getCartFromLocalStorage()) || [];
  };

  const handleChangeQuantity = (cartItem, size, e) => {
    const qty = +e.target.value;
    const maxQty = cartItem.size[size].quantity;
    if (qty < maxQty) {
      updateQtyCart(cartItem, size, qty);
    } else {
      updateQtyCart(cartItem, size, maxQty);
      toast.error("Tối đa");
    }
    // updateQtyCart(cartItem, qty);
  };

  const handleSubQuantity = (cartItem, size, quantity) => {
    if (quantity > 1) {
      updateQtyCart(cartItem, size, quantity - 1);
    }
  };
  const handleAddQuantity = (cartItem, size, quantity) => {
    const maxQty = cartItem.size[size].quantity;
    if (quantity < maxQty) {
      updateQtyCart(cartItem, size, quantity + 1);
    } else {
      updateQtyCart(cartItem, size, maxQty);
      toast.error("Tối đa");
    }
  };

  const sizeOption = ["100G", "500G", "1KG", "5KG"];

  const handleChangeSize = (cartItem, e) => {
    const sizeUpdate = e.target.value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.product._id === cartItem.product._id && item.size === cartItem.size
    );
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].size = sizeUpdate;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCarts(getCartFromLocalStorage()) || [];
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Giỏ hàng
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => onClose()}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {carts?.map((cart, i) => (
                          <li key={i} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={cart.product.productName}
                                src={cart.product.imageUrl[0]}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#" className="line-clamp-1">
                                      {cart.product.productName}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    {formatPrice(
                                      cart.product.size[cart.size].price
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-base">
                                <div className="flex gap-2">
                                  {/* <p className="text-gray-700">Số lượng:</p> */}
                                  <div className="relative flex items-center max-w-[8rem]">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleSubQuantity(
                                          cart.product,
                                          cart.size,
                                          cart.quantity
                                        )
                                      }
                                      id="decrement-button"
                                      data-input-counter-decrement="quantity-input"
                                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    >
                                      <svg
                                        className="w-2 h-2 text-gray-900 "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 2"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M1 1h16"
                                        />
                                      </svg>
                                    </button>
                                    <input
                                      value={cart.quantity}
                                      onChange={(e) =>
                                        handleChangeQuantity(
                                          cart.product,
                                          cart.size,
                                          e
                                        )
                                      }
                                      min={0}
                                      type="text"
                                      id="quantity-input"
                                      aria-describedby="helper-text-explanation"
                                      className="bg-gray-50 border border-x-0 border-gray-300 h-6 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                                      placeholder="0"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAddQuantity(
                                          cart.product,
                                          cart.size,
                                          cart.quantity
                                        )
                                      }
                                      id="increment-button"
                                      data-input-counter-increment="quantity-input"
                                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    >
                                      <svg
                                        className="w-2 h-2 text-gray-900"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M9 1v16M1 9h16"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <p className="text-gray-700">
                                  {formatPrice(
                                    cart.product.size[cart.size].price *
                                      cart.quantity
                                  )}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-base">
                                {/* <p className="text-gray-700">
                                  Phân loại:
                                </p> */}
                                <select
                                  onChange={(e) => handleChangeSize(cart, e)}
                                  className="h-8 text-xs rounded-lg text-gray-700 outline-none border-gray-300"
                                >
                                  {sizeOption.map((size) => (
                                    <option
                                      value={size}
                                      selected={cart.size === size}
                                    >
                                      {size}
                                    </option>
                                  ))}
                                </select>
                                <p className="text-gray-700">
                                  Kho: {cart.product.size[cart.size].quantity}
                                </p>
                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      removeProductFromCart(
                                        cart.product,
                                        cart.size
                                      );
                                    }}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Xoá
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Tổng cộng</p>
                    <p>{formatPrice(totalPrice)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Phí vận chuyển được tính khi thanh toán.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Thanh toán
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      Hoặc{" "}
                      <button
                        type="button"
                        onClick={() => onClose()}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Tiếp tục mua hàng
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Cart;
