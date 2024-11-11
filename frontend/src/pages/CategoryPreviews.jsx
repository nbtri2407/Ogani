import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/apiUrl";
import FeaturedProductCard from "../components/FeaturedSection/FeaturedProductCard";

const CategoryPreviews = () => {
  const categoryId = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const fetchCategory = async () => {
    await axios
      .get(SummaryApi.getCategoryById.url, {
        withCredentials: true,
        params: {
          categoryId: categoryId.id,
        },
      })
      .then(function (response) {
        setCategory(response?.data?.category);
        setProducts(response?.data?.products);
      })
      .catch(function (error) {
        console.log(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  console.log(products);

  return (
    <div className="mx-auto max-w-6xl text-center mt-10">
      <div className="pt-16 grid grid-cols-2 gap-4">
        <nav className="col-span-2 mb-4" aria-label="Breadcrumb">
          <ol
            role="list"
            className="flex max-w-2xl items-center space-x-2 lg:max-w-7xl"
          >
            <li>
              <div className="flex items-center">
                <a
                  href="/shop"
                  className="mr-2 text-lg font-medium text-gray-900"
                >
                  Cửa hàng
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-500"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-lg">
              <p aria-current="page" className="font-medium">
                {category?.categoryName}
              </p>
            </li>
          </ol>
        </nav>
        <div className="md:col-span-1 col-span-2 grid gap-4">
          <div className="w-full">
            <img
              className="aspect-square w-full rounded-lg border border-slate-300"
              src={category?.imageUrl}
              alt=""
            />
          </div>
        </div>
        <div className="md:col-span-1 col-span-2 text-start">
          <p className="text-4xl font-bold">{category?.categoryName}</p>
          <p className="text-lg text-slate-600 mt-2">{category?.description}</p>
        </div>
        {products.length > 0 ? (
          <>
            <p className="col-span-2 text-start font-bold mt-4 text-xl">
              Các sản phẩm {category?.categoryName} nổi bật
            </p>
            <div className="col-span-2 grid grid-cols-4 gap-2">
              {products.map((product, i) => (
                <FeaturedProductCard product={product} key={i} />
              ))}
            </div>
          </>
        ) : (
          <p className="col-span-2 font-bold mt-4 text-xl">
            Danh mục này chưa có sản phẩm nào
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPreviews;
