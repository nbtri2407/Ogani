import React, { useRef, useState } from "react";
import p1 from "../../assets/img/product/product-1.jpg";
import formatPrice from "../../helper/formatPrice";
const TopProduct = ({ title, productList }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }

    if (scrollRef.current.scrollLeft == 0) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth * 2,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const maxScrollLeft =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      if (scrollRef.current.scrollLeft >= maxScrollLeft) {
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: scrollRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };
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
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">{title}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="h-8 w-8 bg-slate-100 hover:bg-slate-200 font-semibold text-slate-400 border border-slate-300"
          >
            {"<"}
          </button>
          <button
            onClick={scrollRight}
            className="h-8 w-8 bg-slate-100 hover:bg-slate-200 font-semibold text-slate-400 border border-slate-300"
          >
            {">"}
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="inline-flex items-center overflow-hidden w-full transition-all"
      >
        <div className="min-w-full flex flex-col gap-4 py-2 px-1">
          {productList.slice(0, 3).map((p, i) => {
            return (
              <a
                href={`/product/${p._id}`}
                className="w-full flex hover:shadow-lg transition-all border border-slate-200"
                key={i}
              >
                <img src={p.imageUrl[0]} alt="" className="h-28 w-28" />
                <div className="flex flex-col items-start p-4">
                  <p className="text-lg line-clamp-1">{p.productName}</p>
                  <p className="text-xl font-bold text-black">
                    {`${formatPrice(getPriceRange(p).minPrice)} - ${formatPrice(
                      getPriceRange(p).maxPrice
                    )}`}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
        <div className="min-w-full flex flex-col gap-4 py-2 px-1">
          {productList.slice(3, 6).map((p, i) => {
            return (
              <a
                href={`/product/${p._id}`}
                className="w-full flex hover:shadow-lg transition-all border border-slate-200"
                key={i}
              >
                <img src={p.imageUrl[0]} alt="" className="h-28 w-28" />
                <div className="flex flex-col items-start p-4">
                  <p className="text-lg line-clamp-1">{p.productName}</p>
                  <p className="text-xl font-bold text-black">
                    {`${formatPrice(getPriceRange(p).minPrice)} - ${formatPrice(
                      getPriceRange(p).maxPrice
                    )}`}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
