import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import SummaryApi from "../../common/apiUrl";

const CategoriesSection = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500,
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
          left: 500,
          behavior: "smooth",
        });
      }
    }
  };

  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    await axios
      .get(SummaryApi.getAllCategory.url, {
        withCredentials: true,
        params: {
          page: 1,
          limit: Infinity,
        },
      })
      .then(function (response) {
        setCategories(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchAllCategories();
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="categories mt-10">
      <div className="container mx-auto">
        <div className="flex items-center w-full">
          <button
            onClick={scrollLeft}
            className="mr-4 border text-3xl py-6 px-1 hidden lg:block"
          >
            <svg
              className="w-4 h-4 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
              />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-y-auto no-scrollbar flex-1"
          >
            {categories?.map((category, index) => {
              return (
                <CategoryCard
                  key={index}
                  _id={category._id}
                  name={category.categoryName}
                  img={category.imageUrl}
                />
              );
            })} 
          </div>
          <button
            onClick={scrollRight}
            className="ml-4 border text-3xl py-6 px-1 hidden lg:block"
          >
            <svg
              className="w-4 h-4 text-gray-800 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
