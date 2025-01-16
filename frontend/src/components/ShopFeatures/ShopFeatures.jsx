import React from "react";

const ShopFeatures = () => {
  const features = [
    {
      name: "Nguồn Gốc Xuất Xứ",
      description: "Được trồng tại nông trại Oganic, Việt Nam.",
    },
    {
      name: "Thành Phần Dinh Dưỡng",
      description: "Giàu vitamin, chất xơ và khoáng chất tự nhiên.",
    },
    {
      name: "Quy Cách Đóng Gói",
      description:
        "Đóng gói: 100g, 500g, 1kg hoặc 5kg phù hợp nhu cầu gia đình.",
    },
    {
      name: "	Hương Vị Tự Nhiên",
      description: "Tươi ngon, giữ nguyên hương vị tự nhiên.",
    },
    {
      name: "Bảo Quản và Sử Dụng",
      description: "Bảo quản trong ngăn mát tủ lạnh, sử dụng trong 5-7 ngày.",
    },
    {
      name: "	Lưu Ý Sản Phẩm",
      description: "Rau củ quả tự nhiên có thể thay đổi màu sắc theo mùa.",
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-6xl xl:px-0 grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Thông Tin Sản Phẩm
          </h2>
          <p className="mt-4 text-gray-500">
            Rau củ quả hữu cơ được trồng hoàn toàn tự nhiên, không sử dụng phân
            bón hóa học và thuốc trừ sâu. Quy trình sản xuất đảm bảo tiêu chuẩn
            chất lượng cao, mang đến sự an toàn và dinh dưỡng tốt nhất cho gia
            đình bạn.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt=""
            src="https://maydonggoiop.com/wp-content/uploads/2023/12/Rau-cu-qua-huu-co-chua-nhieu-dinh-duong-vitamin-khoang-chat.jpg"
            className="rounded-lg bg-gray-100 w-full aspect-square"
          />
          <img
            alt=""
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQvZxJOBUsImyFdDE3feA8rCPPgGk6-84TQPS1TF15ANMs3W8Mk4gsjWO13Dn31AMW47A&usqp=CAU"
            className="rounded-lg bg-gray-100 w-full aspect-square"
          />
          <img
            alt=""
            src="https://omegajuicers.vn/wp-content/uploads/2023/11/rau-cu-qua-huu-co-omgreen.jpg"
            className="rounded-lg bg-gray-100 w-full aspect-square"
          />
          <img
            alt=""
            src="https://pmquynhlam.vn/wp-content/uploads/2024/03/combo-rau-cu-qua-huu-co-ql-compressed.jpg"
            className="rounded-lg bg-gray-100 w-full aspect-square"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopFeatures;
