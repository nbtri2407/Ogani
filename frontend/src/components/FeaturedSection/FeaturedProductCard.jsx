import React, { useContext, useEffect } from "react";
import formatPrice from "../../helper/formatPrice";
import ProductQuickviews from "../ProductQuickviews/ProductQuickviews";
import { useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/apiUrl";
import { toast } from "react-toastify";
import Context from "../../context";
import { useSelector } from "react-redux";

const FeaturedProductCard = ({ product, callBack }) => {
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

  useEffect(() => {}, []);
  if (product.discount > 0) {
    sellingPrice = Math.round(product.price * ((100 - product.discount) / 100));
  }

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

  const [openProductQuickView, setOpenProductQuickView] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div
          className="relative group overflow-hidden max-w-full aspect-square rounded-lg border border-slate-200"
          style={{
            backgroundImage: `url(${product.imageUrl[0]})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute w-full -bottom-11 group-hover:bottom-4 flex gap-4 items-center justify-center transition-all duration-300">
            {isInWishList ? (
              <button
                onClick={() => removeWishlist(product._id)}
                className="bg-primary rounded-full p-2 border hover:bg-primary/80 text-white transition-all"
              >
                <svg
                  className="w-6 h-6 "
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
                {/* addToWishlist */}
              </button>
            ) : (
              <button
                onClick={() => addToWishlist(product._id)}
                className="bg-white rounded-full p-2 border hover:bg-primary hover:text-white transition-all"
              >
                <svg
                  className="w-6 h-6 "
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
                {/* addToWishlist */}
              </button>
            )}
            <button
              onClick={() => setOpenProductQuickView(true)}
              className="bg-white rounded-full p-2 border hover:bg-primary hover:text-white transition-all"
            >
              <svg
                className="w-6 h-6"
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
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
            </button>
          </div>
        </div>
        <a href={`/product/${product._id}`} className="">
          <p className="md:text-xl  font-bold line-clamp-1 hover:underline">
            {product.productName}
          </p>
        </a>
        <p className="md:text-lg text-base text-red-400 font-bold">{`${formatPrice(
          getPriceRange(product).minPrice
        )} - ${formatPrice(getPriceRange(product).maxPrice)}`}</p>
      </div>
      <ProductQuickviews
        product={product}
        open={openProductQuickView}
        onClose={() => setOpenProductQuickView(false)}
      />
    </>
  );
};

export default FeaturedProductCard;
