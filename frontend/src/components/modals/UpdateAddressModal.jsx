import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SummaryApi from "../../common/apiUrl";
import { toast } from "react-toastify";

const UpdateAddressModal = ({ addressUpdate, open, onClose, callBack }) => {
  const user = useSelector((state) => state?.user?.user);
  const [info, setInfo] = useState({
    receiver: addressUpdate.receiver,
    phone: addressUpdate.phone,
    home: addressUpdate.home,
  });

  const handleInputOnChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  useEffect(() => {
    info.receiver = addressUpdate.receiver;
    info.phone = addressUpdate.phone;
    info.home = addressUpdate.home;
    setSelectedProvince(addressUpdate.province?.code);
    setSelectedDistrict(addressUpdate.district?.code);
    setSelectedWard(addressUpdate.ward?.code);
  }, [addressUpdate]);

  // Lấy danh sách tỉnh thành
  useEffect(() => {
    axios
      .get("https://open.oapi.vn/location/provinces?page=0&size=63")
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  // Lấy danh sách huyện/quận khi tỉnh thay đổi
  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `https://open.oapi.vn/location/districts?page=0&size=100&provinceId=${selectedProvince}`
        )
        .then((response) => {
          setDistricts(response.data.data);
          // setWards([]); // Clear wards when province changes
          // setSelectedDistrict(""); // Reset district selection
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    }
  }, [selectedProvince]);

  // Lấy danh sách xã/phường khi huyện thay đổi
  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(
          `https://open.oapi.vn/location/wards?page=0&size=30&districtId=${selectedDistrict}`
        )
        .then((response) => {
          setWards(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
        });
    }
  }, [selectedDistrict]);

  // Hàm xử lý khi chọn tỉnh
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  // Hàm xử lý khi chọn huyện
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  // Hàm xử lý khi chọn xã
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  function getProvinceNameByCode(id) {
    const province = provinces.find((province) => province.id == id);
    return province ? province.name : null;
  }

  function getDistrictNameByCode(id) {
    const district = districts.find((district) => district.id == id);
    return district ? district.name : null;
  }

  function getWardNameByCode(id) {
    const ward = wards.find((ward) => ward.id == id);
    return ward ? ward.name : null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      data: {
        addressId: addressUpdate._id,
        receiver: info.receiver,
        phone: info.phone,
        home: info.home,
        province: {
          code: selectedProvince,
          name: getProvinceNameByCode(selectedProvince),
        },
        district: {
          code: selectedDistrict,
          name: getDistrictNameByCode(selectedDistrict),
        },
        ward: {
          code: selectedWard,
          name: getWardNameByCode(selectedWard),
        },
      },
    };

    await axios
      .put(SummaryApi.address.url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        toast.success("Cập nhật địa chỉ thành công!");
        callBack();
        onClose();
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        open ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/40`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Thêm địa chỉ
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="grid gap-12 grid-cols-1 p-4">
              {/*  =-- */}
              <div className="col-span-1">
                <div className="col-span-1 flex flex-col gap-4">
                  <h1 className="text-xl w-full">Thông tin vận chuyển</h1>

                  <input
                    type="text"
                    name="receiver"
                    placeholder="Tên Người Nhận"
                    value={info.receiver}
                    onChange={(e) => handleInputOnChange(e)}
                    className="w-full p-2 border border-black/30 rounded-md outline-none"
                    required
                  />
                  <input
                    type="tel"
                    pattern="[0][0-9]{9,10}"
                    maxLength={12}
                    name="phone"
                    value={info.phone}
                    onChange={(e) => handleInputOnChange(e)}
                    placeholder="Số điện thoại"
                    className="w-full p-2 border border-black/30 rounded-md outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="home"
                    value={info.home}
                    onChange={(e) => handleInputOnChange(e)}
                    placeholder="Số nhà, tên đường"
                    className="w-full p-2 border border-black/30 rounded-md outline-none"
                    required
                  />
                  {/* ------------ grid grid-cols-3 */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* Select Thành Phố */}
                    <select
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      className="col-span-1 h-10 text-sm rounded-lg text-gray-700 outline-none border-gray-300 cursor-pointer"
                    >
                      <option value="">-- Tỉnh/Thành Phố --</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    {/* Select Huyện */}
                    <select
                      className="col-span-1 h-10 text-sm rounded-lg text-gray-700 outline-none border-gray-300 cursor-pointer"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      disabled={!selectedProvince} // Disable if no province selected
                    >
                      <option value="">-- Quận/Huyện --</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>

                    {/* Select Xã */}
                    <select
                      className="col-span-1 h-10 text-sm rounded-lg text-gray-700 outline-none border-gray-300 cursor-pointer"
                      value={selectedWard}
                      onChange={handleWardChange}
                      disabled={!selectedDistrict} // Disable if no district selected
                    >
                      <option value="">-- Xã/Phường --</option>
                      {wards.map((ward) => (
                        <option key={ward.id} value={ward.id}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddressModal;
