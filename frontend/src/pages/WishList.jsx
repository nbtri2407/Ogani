import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FeaturedProductCard from "../components/FeaturedSection/FeaturedProductCard";

const WishList = () => {
  const user = useSelector((state) => state?.user?.user);
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    setWishList(user?.wishList);
  }, []);
  useEffect(() => {
    setWishList(user?.wishList);
  }, [user]);

  window.addEventListener("cartChanged", (event) => {
    countTotalCartItems();
  });

  const getWishList = async () => {};

  return (
    <div class="bg-white">
      <div class="mx-auto max-w-6xl px-6 xl:px-0 mt-16">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
          Danh sách sản phẩm yêu thích
        </h2>

        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* <div class="group relative">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
                alt="Front of men&#039;s Basic Tee in black."
                class="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    Basic Tee
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">Black</p>
              </div>
              <p class="text-sm font-medium text-gray-900">$35</p>
            </div>
          </div> */}
          {wishList?.map((p, i) => {
            return (
              <div className="" key={i}>
                <FeaturedProductCard
                  product={p}
                  key={i}
                  callBack={() => fetchAllProducts()}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishList;
