import React from "react";

const TopProductSold = ({ productList }) => {
  return (
    <div className="border p-4 flex flex-col gap-4">
      <h1 className="font-bold text-lg">Sản phẩm bán chạy nhất</h1>
      <div className="flex justify-between items-center">
        <p>Sản phẩm</p>
        <p>Lượt mua</p>
      </div>
      <div className="grid gap-4">
        {productList.map((p, i) => {
          return (
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <img
                  className="max-w-10 aspect-square"
                  src={p?.imageUrl?.[0]}
                  alt=""
                />
                <p className="line-clamp-2">{p?.productName}</p>
              </div>
              <p className="text-red-500">{p?.sold}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopProductSold;
