import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditUserInfoModal from "../modals/EditUserInfoModal";

const UserInfoTab = () => {
  const user = useSelector((state) => state?.user?.user);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  let userEdit = user;

  useEffect(() => {
    userEdit = user;
  }, [user]);

  return (
    <div className="flex justify-center p-4 bg-gray-100">
      <div className="grid grid-cols-1 gap-4 border p-4">
        <p className="text-2xl font-bold mb-4">Thông tin tài khoản</p>
        <div className="grid grid-cols-3 gap-4">
          <p className="font-bold">Tên người dùng:</p>
          <p className="col-span-2">{user?.name}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="font-bold">Địa chỉ email:</p>
          <p className="col-span-2">{user?.email}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="font-bold">Số điện thoại:</p>
          <p className="col-span-2">{user?.phone}</p>
        </div>
        {/* <div className="grid grid-cols-3 gap-4">
          <p className="font-bold">Địa chỉ:</p>
          <p className="col-span-2">{user?.phone}</p>
        </div> */}
        <div className="grid grid-cols-3 gap-4">
          <p className="col-span-2"></p>
          <button
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="primary-btn"
            onClick={() => setOpenModalEdit(true)}
          >
            Cập nhật thông tin
          </button>
        </div>
      </div>
      <EditUserInfoModal
        user={userEdit}
        open={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
      />
    </div>
  );
};
//
export default UserInfoTab;
