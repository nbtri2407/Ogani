import React from "react";

const OrderSuccess = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-3xl text-indigo-600 font-bold">
          Đặt hàng thành công!
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Cảm ơn bạn đã đặt hàng
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Đơn hàng của bạn đã được gửi đến hệ thống. Chúng tôi sẽ liên hệ với
          bạn trong thời gian sớm nhất.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/profile#order"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm  font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Xem các đơn hàng của bạn
          </a>
          <a href="#" className="text-sm  font-bold text-gray-900">
            Liên hệ hỗ trợ <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
