import React, { useContext, useEffect, useState } from "react";
import formatPrice from "../../helper/formatPrice";
import Context from "../../context";
import { useSelector } from "react-redux";
import SummaryApi from "../../common/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import ProductQuickviews from "../ProductQuickviews/ProductQuickviews";

const ProductCard = ({ product, callBack }) => {
  const user = useSelector((state) => state?.user?.user);
  const { getUserDetails } = useContext(Context);

  const getPriceRange = (product) => {
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    Object.values(product.size).forEach((size) => {
      minPrice = Math.min(minPrice, size.price);
      maxPrice = Math.max(maxPrice, size.price);
    });

    return {
      minPrice,
      maxPrice,
    };
  };

  const [isInWishList, setIsInWishList] = useState(false);
  useEffect(() => {
    setIsInWishList(user?.wishList.some((item) => item._id === product._id));
  }, [user]);

  const addToWishlist = async (productId) => {
    await axios
      .post(
        SummaryApi.wishlist.url,
        {
          productId: productId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success("Đã thêm vào danh sách yêu thích!");
        getUserDetails();
        const wishListEvent = new CustomEvent("wishListChanged", {
          detail: "newWishList",
        });
        window.dispatchEvent(wishListEvent);
        callBack();
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const removeWishlist = async (productId) => {
    await axios
      .patch(
        SummaryApi.wishlist.url,
        {
          productId: productId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success("Đã xoá khỏi danh sách yêu thích!");
        getUserDetails();
        const wishListEvent = new CustomEvent("wishListChanged", {
          detail: "newWishList",
        });
        window.dispatchEvent(wishListEvent);
        callBack();
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const handleLikeProduct = (id) => {
    isInWishList ? removeWishlist(id) : addToWishlist(id);
  };

  const [openProductQuickView, setOpenProductQuickView] = useState(false);

  return (
    <>
      <div className=" bg-white border border-slate-200 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <a href={`/product/${product._id}`}>
          <img
            className="w-full h-48 object-cover"
            src={product.imageUrl[0]}
            alt={product.name}
          />
          <div className="p-5 pb-0">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 ">
              {product.productName}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-xl font-bold text-red-400 mt-2">
              {`${formatPrice(getPriceRange(product).minPrice)} - ${formatPrice(
                getPriceRange(product).maxPrice
              )}`}
            </p>
          </div>
        </a>
        <div className="flex items-center justify-between gap-2 px-5 py-4">
          <button
            onClick={() => handleLikeProduct(product._id)}
            type="button"
            className={`border ${
              isInWishList
                ? "text-white bg-primary border-primary hover:bg-primary/70"
                : "text-primary border-primary hover:bg-primary hover:text-white"
            } font-medium rounded-lg text-sm p-2 py-2 text-center inline-flex items-center`}
          >
            <svg
              className="w-5 h-5"
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
          <button
            onClick={() => setOpenProductQuickView(true)}
            className="flex-1 px-2 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 "
          >
            <p className="line-clamp-1">Thêm vào giỏ hàng</p>
          </button>
        </div>
      </div>
      <ProductQuickviews
        product={product}
        open={openProductQuickView}
        onClose={() => setOpenProductQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
