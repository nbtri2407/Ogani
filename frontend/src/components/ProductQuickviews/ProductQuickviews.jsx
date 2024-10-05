import React, { useEffect } from "react";
("use client");

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import formatPrice from "../../helper/formatPrice";
import { toast } from "react-toastify";

const ProductQuickviews = ({ product, onClose, open }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [selectedSize, setSelectedSize] = useState(null);
  const getPriceRange = (product) => {
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    if (product.size != null) {
      Object.values(product.size).forEach((size) => {
        minPrice = Math.min(minPrice, size.price);
        maxPrice = Math.max(maxPrice, size.price);
      });
    }

    return {
      minPrice,
      maxPrice,
    };
  };
  const sizeData = product.size || {};

  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(99);
  const handleSubQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(+quantity + 1);
    } else {
      setQuantity(maxQuantity);
    }
  };

  useEffect(() => {
    if (selectedSize != null) {
      setMaxQuantity(sizeData[selectedSize].quantity);
    }
  }, [selectedSize]);

  useEffect(() => {
    if (quantity > maxQuantity) {
      setQuantity(maxQuantity);
    }
  }, [quantity, maxQuantity]);

  const addOrUpdateProductInCart = (newProduct, quantity, size) => {
    if (size == null) {
      toast.error("Chọn phân loại sản phẩm");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.product._id === newProduct._id && item.size === size
    );
    if (existingProductIndex !== -1) {
      if (
        Number(cart[existingProductIndex].quantity) + Number(quantity) <
        Number(cart[existingProductIndex].product.size[size].quantity)
      ) {
        cart[existingProductIndex].quantity =
          Number(cart[existingProductIndex].quantity) + Number(quantity);
      } else {
        cart[existingProductIndex].quantity = +Number(
          cart[existingProductIndex].product.size[selectedSize].quantity
        );
      }
    } else {
      const newItem = {
        product: newProduct,
        quantity,
        size,
      };
      cart.push(newItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Đã thêm vào giỏ hàng");
    const cartEvent = new CustomEvent("cartChanged", {
      detail: "newCart",
    });
    window.dispatchEvent(cartEvent);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => onClose()}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img
                    alt={product.productName}
                    src={product.imageUrl[0]}
                    className="object-cover object-center"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {product.productName}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    {selectedSize ? (
                      <p className="text-3xl text-red-400 font-bold mt-4">
                        {formatPrice(sizeData[selectedSize].price)}
                      </p>
                    ) : (
                      <p className="text-3xl text-red-400 font-bold mt-6">{`${formatPrice(
                        getPriceRange(product).minPrice
                      )} - ${formatPrice(getPriceRange(product).maxPrice)}`}</p>
                    )}

                    {/* Reviews */}
                    <div className="mt-4">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                product.rating > rating
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {product.rating} out of 5 stars
                        </p>
                        <a
                          href="#"
                          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {product.reviewCount} reviews
                        </a>
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-4">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>
                    {/* Sizes */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium text-gray-900">
                          Phân loại
                        </h3>
                        {selectedSize ? (
                          <h3 className="text-md font-medium text-gray-900">{`${sizeData[selectedSize].quantity} sản phẩm`}</h3>
                        ) : (
                          <></>
                        )}
                      </div>

                      <fieldset aria-label="Choose a size" className="mt-4">
                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="grid grid-cols-4 gap-4 "
                        >
                          {Object.keys(sizeData).map((key) => (
                            <Radio
                              key={key}
                              value={key}
                              disabled={!(sizeData[key].quantity > 0)}
                              className={classNames(
                                sizeData[key].quantity > 0
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                              )}
                            >
                              <span>{key}</span>
                              {sizeData[key].quantity > 0 ? (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    stroke="currentColor"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  >
                                    <line
                                      x1={0}
                                      x2={100}
                                      y1={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </Radio>
                          ))}
                        </RadioGroup>
                      </fieldset>
                    </div>

                    <div className="mt-6 flex gap-2 items-center">
                      <div className="relative flex items-center max-w-[10rem]">
                        <button
                          type="button"
                          onClick={handleSubQuantity}
                          id="decrement-button"
                          data-input-counter-decrement="quantity-input"
                          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 "
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
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          min={0}
                          max={maxQuantity}
                          type="text"
                          id="quantity-input"
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                          placeholder="0"
                        />
                        <button
                          type="button"
                          onClick={handleAddQuantity}
                          id="increment-button"
                          data-input-counter-increment="quantity-input"
                          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900"
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

                      <button
                        type="button"
                        onClick={() =>
                          addOrUpdateProductInCart(
                            product,
                            quantity,
                            selectedSize
                          )
                        }
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductQuickviews;
