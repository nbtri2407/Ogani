import React, { useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/apiUrl";
import axios from "axios";
import { Radio, RadioGroup } from "@headlessui/react";
import formatPrice from "../helper/formatPrice";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const productId = useParams();

  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(99);
  const [showImg, setShowImg] = useState("");
  const fetchProductDetails = async () => {
    await axios
      .get(SummaryApi.getProductDetail.url, {
        withCredentials: true,
        params: {
          productId: productId.id,
        },
      })
      .then(function (response) {
        setProductDetails(response?.data?.data);
        setShowImg(response?.data?.data?.imageUrl?.[0]);
      })
      .catch(function (error) {
        console.log(error?.response?.data?.message);
      });
  };

  const handleChangeImg = (imageUrl) => {
    setShowImg(imageUrl);
  };

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const reviews = { average: 4, totalCount: 117 };

  const sizeData = productDetails.size || {};
  const [selectedSize, setSelectedSize] = useState(null);

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

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div className="bg-white container mx-auto">
      <div className="pt-16 grid grid-cols-2 gap-4">
        <nav className="col-span-2 mb-4" aria-label="Breadcrumb">
          <ol
            role="list"
            className="flex max-w-2xl items-center space-x-2 lg:max-w-7xl"
          >
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-lg font-medium text-gray-900">
                  {productDetails?.category?.categoryName}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-lg">
              <p
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productDetails?.productName}
              </p>
            </li>
          </ol>
        </nav>
        <div className="md:col-span-1 col-span-2 grid gap-4">
          <div className="w-full">
            <img className="h-auto w-full rounded-lg" src={showImg} alt="" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productDetails?.imageUrl?.map((imgUrl, i) => {
              return (
                <div className="cursor-pointer" key={i}>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={imgUrl}
                    alt=""
                    onClick={() => handleChangeImg(imgUrl)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:col-span-1 col-span-2 text-start">
          <p className="text-4xl font-bold">{productDetails?.productName}</p>
          <div className="my-2">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      reviews.average > rating
                        ? "text-gray-900"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.totalCount} reviews
              </p>
            </div>
          </div>

          {selectedSize ? (
            <p className="text-3xl text-red-400 font-bold mt-6">
              {formatPrice(sizeData[selectedSize].price)}
            </p>
          ) : (
            <p className="text-3xl text-red-400 font-bold mt-6">{`${formatPrice(
              getPriceRange(productDetails).minPrice
            )} - ${formatPrice(getPriceRange(productDetails).maxPrice)}`}</p>
          )}

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-gray-900">Phân loại</h3>
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

          <div className="mt-6 flex gap-2">
            <div className="relative flex items-center max-w-[8rem]">
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
              className="text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
            >
              <svg
                className="w-3.5 h-3.5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              Thêm vào giỏ hàng
            </button>
            <button
              type="button"
              class="text-primary border border-primary hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
            >
              <svg
              className="w-5 h-5 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
