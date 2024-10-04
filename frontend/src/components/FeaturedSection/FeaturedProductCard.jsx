import React, { useEffect } from "react";
import formatPrice from "../../helper/formatPrice";
import ProductQuickviews from "../ProductQuickviews/ProductQuickviews";
import { useState } from "react";

const FeaturedProductCard = ({ product }) => {
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

  const addToCart = (product, q) => {
    const item = {
      product,
      quantity: q,
    };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
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
            <button className="bg-white rounded-full p-2 border hover:bg-slate-300">
              <svg
                className="w-6 h-6 text-gray-800"
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
            </button>
            <button
              onClick={() => setOpenProductQuickView(true)}
              className="bg-white rounded-full p-2 border hover:bg-slate-300"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
          <p className="md:text-xl  font-bold line-clamp-1">
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
