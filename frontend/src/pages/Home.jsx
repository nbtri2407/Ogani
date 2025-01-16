import React, { useEffect, useState } from "react";
import CategoriesSection from "../components/CategoriesSection/CategoriesSection";
import Heading from "../components/heading/Heading";
import FeaturedSection from "../components/FeaturedSection/FeaturedSection";
import ProductQuickviews from "../components/ProductQuickviews/ProductQuickviews";
import Banner1 from "../assets/img/banner/banner-1.jpg";
import Banner2 from "../assets/img/banner/banner-2.jpg";
import TopProduct from "../components/TopProduct/TopProduct";
import axios from "axios";
import SummaryApi from "../common/apiUrl";
import ShopFeatures from "../components/ShopFeatures/ShopFeatures";

const Home = () => {
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [topSoldProducts, setTopSoldProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const getTopProducts = async () => {
    await axios
      .get(SummaryApi.topProduct.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setTopRatedProducts(response?.data?.topRatedProducts);
        setTopSoldProducts(response?.data?.topSoldProducts);
        setLatestProducts(response?.data?.latestProducts);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getTopProducts();
  }, []);

  return (
    <div className="mx-auto max-w-6xl text-center">
      <CategoriesSection />
      <Heading title={"Sản phẩm nổi bật"} />
      <FeaturedSection />
      <div className="mt-16 mx-auto grid xl:grid-cols-2 px-4 gap-4"> 
        <img className="w-full" src={Banner1} alt="logo" />
        <img className="w-full" src={Banner2} alt="logo" />
      </div>
      <div className="mt-16 grid xl:grid-cols-3 lg:grid-cols-2 gap-8 px-4">
        <TopProduct title={"Sản phẩm mới"} productList={latestProducts} />
        <TopProduct
          title={"Bán chạy nhất"}
          productList={topSoldProducts}
        />
        <TopProduct
          title={"Đánh giá cao"}
          productList={topRatedProducts}
        />
      </div>
      <ShopFeatures />
    </div>
  );
};

export default Home;
