import React, { useEffect, useState } from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import SummaryApi from "../../common/apiUrl";
import axios from "axios";

const FeaturedSection = () => {
  const [products, setProducts] = useState([]);
  const [fill, setFill] = useState("all");

  const fetchAllProducts = async () => {
    await axios
      .get(SummaryApi.getAllProduct.url, {
        withCredentials: true,
        params: {
          page: 1,
          limit: 8,
        },
      })
      .then(function (response) {
        setProducts(response?.data?.data);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const categories = Array.from(
    new Set(products?.map((product) => product.category.categoryName))
  ); 

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          onClick={() => setFill("all")}
          type="button"
          className={`${ 
            fill === "all"
              ? "hover:text-white border-blue-600 text-blue-700 hover:bg-blue-700"
              : "border-gray-200 hover:border-gray-400 text-gray-900"
          } border focus:outline-none rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3`}
        >
          Tất cả
        </button>
        {categories?.map((c, i) => {
          return (
            <button
              key={i}
              onClick={() => setFill(c)}
              type="button"
              className={`${
                fill == c
                  ? "hover:text-white border-blue-600 text-blue-700 hover:bg-blue-700"
                  : "border-gray-200 hover:border-gray-400 text-gray-900"
              } border focus:outline-none rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((p, i) => {
          return (
            (p.category.categoryName === fill || fill === "all") && (
              <FeaturedProductCard product={p} key={i} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedSection;
