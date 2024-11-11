import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FeaturedProductCard from "../components/FeaturedSection/FeaturedProductCard";
import SummaryApi from "../common/apiUrl";
import axios from "axios";
import ProductCard from "../components/Card/ProductCard";

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

  const [recomment, setRecomment] = useState([]);
  const [recomment2, setRecomment2] = useState([]);
  const getRecommentProducts = async () => {
    await axios
      .get(SummaryApi.recommentWishlist.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setRecomment(response?.data?.products);
        setRecomment2(response?.data?.products2);
      })
      .catch(function (error) {
        console.log(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getRecommentProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 xl:px-0 mt-16">
        {wishList ? (
          wishList.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Danh sách sản phẩm yêu thích
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Bạn chưa có sản phẩm yêu thích nào!{" "}
                <a
                  className="text-primary hover:underline duration-200"
                  href="/shop"
                >
                  Tất cả sản phẩm
                </a>
              </h2>
            </>
          )
        ) : (
          <>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              <a
                className="text-primary hover:underline duration-200"
                href="/auth"
              >
                Đăng nhập
              </a>{" "}
              để xem danh sách yêu thích của bạn
            </h2>
          </>
        )}

        <div className="pt-16">
          {recomment && (
            <>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Có thể bạn cũng thích
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {recomment?.map((p, i) => {
                  return (
                    <div className="" key={i}>
                      {/* <FeaturedProductCard
                        product={p}
                        key={i}
                        callBack={() => fetchAllProducts()}
                      /> */}
                      <ProductCard product={p} />
                    </div>
                  );
                })}
                {recomment2?.map((p, i) => {
                  return (
                    <div className="" key={i}>
                      {/* <FeaturedProductCard
                        product={p}
                        key={i}
                        callBack={() => fetchAllProducts()}
                      /> */}
                      <ProductCard
                        product={p}
                        key={i}
                        callBack={() => fetchAllProducts()}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
