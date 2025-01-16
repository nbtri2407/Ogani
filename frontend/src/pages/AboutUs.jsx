import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Về Chúng Tôi
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Chào mừng bạn đến với cửa hàng rau củ quả hữu cơ của chúng tôi!
            Chúng tôi luôn cam kết mang đến sản phẩm tươi sạch và an toàn nhất.
          </p>
        </div>
        {/* Các phần thông tin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sứ mệnh */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5ROtr2su3veAWEFWIOvmLo6I-65_2BMNBpyAmUmPTZiMdaP50_Umy8ghqvaGOOjieH8&usqp=CAU"
              alt="Sứ mệnh của chúng tôi"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-bold mt-4">Sứ Mệnh</h3>
            <p className="text-gray-600 mt-2">
              Cung cấp rau củ quả hữu cơ chất lượng cao, đồng thời thúc đẩy nông
              nghiệp bền vững.
            </p>
          </div>
          {/* Tầm nhìn */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img
              src="https://foodinstitute.com/wp-content/uploads/2023/03/d6tu_l3chle.jpg"
              alt="Tầm nhìn của chúng tôi"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-bold mt-4">Tầm Nhìn</h3>
            <p className="text-gray-600 mt-2">
              Hướng đến tương lai nơi mọi người đều được thưởng thức thực phẩm
              tươi ngon, lành mạnh và bền vững.
            </p>
          </div>
          {/* Giá trị cốt lõi */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img
              src="https://eu-images.contentstack.com/v3/assets/blt58a1f8f560a1ab0e/blt8e44b05342be9836/6699582c101198815fad220f/Raleys_ONE_Market-organic_produce-Truckee_CA.jpg"
              alt="Giá trị của chúng tôi"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-bold mt-4">Giá Trị</h3>
            <p className="text-gray-600 mt-2">
              Chúng tôi trân trọng cộng đồng, sự bền vững và sức khỏe của khách
              hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
