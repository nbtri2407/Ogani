import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, đừng ngần ngại liên hệ
            với chúng tôi.
          </p>
        </div>

        {/* Form Liên hệ */}
        {/* <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          <form>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Họ và Tên
              </label>
              <input
                type="text"
                id="name"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Nhập địa chỉ email của bạn"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="message"
              >
                Tin nhắn
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Nhập nội dung tin nhắn của bạn"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Gửi Tin Nhắn
            </button>
          </form>
        </div> */}
        <section className="contact py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Phone */}
              <div className="contact__widget text-center">
                <span className="icon_phone text-4xl text-green-600"></span>
                <h4 className="text-lg font-semibold mt-2">Phone</h4>
                <p className="text-gray-600">+84967456435</p>
              </div>

              {/* Address */}
              <div className="contact__widget text-center">
                <span className="icon_pin_alt text-4xl text-green-600"></span>
                <h4 className="text-lg font-semibold mt-2">Địa chỉ</h4>
                <p className="text-gray-600">470 Đ. Trần Đại Nghĩa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng</p>
              </div>

              {/* Open time */}
              <div className="contact__widget text-center">
                <span className="icon_clock_alt text-4xl text-green-600"></span>
                <h4 className="text-lg font-semibold mt-2">Giờ mở cửa</h4>
                <p className="text-gray-600">08:00 đến 22:00 </p>
              </div>

              {/* Email */}
              <div className="contact__widget text-center">
                <span className="icon_mail_alt text-4xl text-green-600"></span>
                <h4 className="text-lg font-semibold mt-2">Email</h4>
                <p className="text-gray-600">hello@ogani.com</p>
              </div>
            </div>
          </div>
        </section>
        <div className="flex items-center mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5179.633706943961!2d108.24787429026243!3d15.974100270221367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology!5e1!3m2!1sen!2s!4v1735831843604!5m2!1sen!2s"
            // width="1200"
            height="450"
            style={{ border: "0" }}
            className="flex-1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
