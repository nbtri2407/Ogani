import React, { useEffect, useState } from "react";
import AddAddressModal from "../modals/AddAddressModal";
import SummaryApi from "../../common/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateAddressModal from "../modals/UpdateAddressModal";

const AddressTab = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressUpdate, setAddressUpdate] = useState({});

  const fetchAllAddress = async () => {
    await axios
      .get(SummaryApi.address.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setAddress(response?.data?.data);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchAllAddress();
  }, []);

  const handleSetDefaultAddress = async (addressId) => {
    await axios
      .post(
        SummaryApi.setDefaultAddress.url,
        {
          addressId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        fetchAllAddress();
        toast.success("Cập nhật thành công!");
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div className="flex justify-center p-4 bg-gray-100">
      <div className="grid grid-cols-1 gap-4 border p-4 ">
        <p className="text-2xl font-bold mb-4">Địa chỉ</p>
        <div className="max-h-[50vh] overflow-auto scrollbar-custom px-2">
          {address?.map((a, i) => {
            return (
              <div key={i}>
                <div className="flex justify-between gap-4">
                  <div className="">
                    <div className="flex">
                      <p>{a.receiver}</p>
                      <p className="mx-2">|</p>
                      <p>{a.phone}</p>
                    </div>
                    <p className="text-gray-500">{a.home}</p>
                    <p className="text-gray-500">
                      {a.province.name}, {a.district.name}, {a.ward.name}
                    </p>
                    {a.isDefault && (
                      <p className="text-red-500 border border-red-500 max-w-fit px-2">
                        Mặc định
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-start gap-2">
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          setAddressUpdate(a);
                          setOpenModalUpdate(true);
                        }}
                        className="text-primary hover:underline mr-2"
                      >
                        Cập nhật
                      </button>
                      <button className="text-red-500 hover:underline">
                        Xoá
                      </button>
                    </div>
                    {!a.isDefault && (
                      <div className="">
                        <button
                          onClick={() => handleSetDefaultAddress(a._id)}
                          className="hover:underline"
                        >
                          Đặt mặc định
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="col-span-2"></p>
          <button
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="primary-btn"
            onClick={() => setOpenModal(true)}
          >
            Thêm địa chỉ
          </button>
        </div>
      </div>
      <AddAddressModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        callBack={() => fetchAllAddress()}
      />
      <UpdateAddressModal
        addressUpdate={addressUpdate}
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        callBack={() => fetchAllAddress()}
      />
    </div>
  );
};

export default AddressTab;
