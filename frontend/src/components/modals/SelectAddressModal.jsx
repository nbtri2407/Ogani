import React, { useState } from "react";
import { useEffect } from "react";

const SelectAddressModal = ({
  addressList,
  address,
  open,
  onClose,
  callBack,
}) => {
  const [addressSelected, setAddressSelected] = useState();
  useEffect(() => {
    setAddressSelected(address);
  }, [open]);
  const handleShipChange = (event) => {
    setAddressSelected(addressList[event.target.value]);
  };

  const handleClose = () => {
    callBack(addressSelected);
    onClose();
  };
  const handleClickSelect = (address) => {
    callBack(address);
    onClose();
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
              Chọn địa chỉ
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal"
              onClick={handleClose}
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
          <ul className="grid w-full gap-4 max-h-[50vh] overflow-auto scrollbar-custom p-4">
            {addressList?.map((a, i) => {
              return (
                <li key={i}>
                  <input
                    type="radio"
                    id={`address${i}`}
                    name="address"
                    value={i}
                    className="hidden peer"
                    onChange={handleShipChange}
                    checked={a === addressSelected}
                    required
                  />
                  <label
                    htmlFor={`address${i}`}
                    className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    {/* <div className="block">
                      <div className="w-full text-lg font-bold">Tiêu chuẩn</div>
                      <div className="w-full">2-3 ngày làm việc</div>
                      <div className="w-full font-semibold">
                        {formatPrice(shipMethodList["standard"])}
                      </div>
                    </div> */}
                    <div className="flex justify-between gap-4 w-full">
                      <div className="flex-1">
                        <div className="flex">
                          <p>{a?.receiver}</p>
                          <p className="mx-2">|</p>
                          <p>{a?.phone}</p>
                        </div>
                        <p className="text-gray-500">{a?.home}</p>
                        <p className="text-gray-500">
                          {a?.province?.name}, {a?.district?.name},{" "}
                          {a?.ward?.name}
                        </p>
                        {a.isDefault && (
                          <p className="text-red-500 border border-red-500 max-w-fit px-2">
                            Mặc định
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleClickSelect(a)}
                          type="button"
                          className="text-primary hover:underline"
                        >
                          Chọn
                        </button>
                      </div>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectAddressModal;
