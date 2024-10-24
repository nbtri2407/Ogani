import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import SummaryApi from "../common/apiUrl";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Users = () => {
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const fetchAllUsers = async () => {
    await axios
      .get(SummaryApi.getAllUsers.url, {
        withCredentials: true,
        params: {
          page: currentPage,
          limit: 15,
        },
      })
      .then(function (response) {
        setUsers(response?.data?.data);
        setPagination(response?.data?.pagination);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, [currentPage]);
  return (
    <div className="px-10 py-2 relative">
      <div className="flex items-center justify-between py-4 border-b border-slate-400">
        <h1 className="text-[2rem] font-bold">Tất cả người dùng</h1>
        <IoIosAddCircle className="text-[1.6rem] hover:text-primary transition-all cursor-pointer" />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[70vh]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Địa chỉ
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày đăng ký
              </th>
              <th scope="col" className="px-6 py-3" colSpan={2}>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr className="bg-white border-b " key={index}>
                  <td className="px-6 py-4">{user?.name}</td>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4">{user?.phone}</td>
                  <td className="px-6 py-4">{user?.address}</td>
                  <td className="px-6 py-4">
                    {moment(user?.createdAt).format("MM/DD/YYYY h:mm A")}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setEditCategory(category);
                        setShowUpdateForm(true);
                      }}
                      className="font-medium text-blue-600 hover:underline mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => {
                        setDeleteCategoryId(category?._id);
                        setShowModalDelete(true);
                      }}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pagination.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex items-center justify-center gap-1 mt-8"}
        pageClassName={"px-3 py-1 border border-blue-400 "}
        pageLinkClassName={"page-link"}
        previousClassName={"px-3 py-1 border border-blue-400"}
        previousLinkClassName={"page-link"}
        nextClassName={"px-3 py-1 border border-blue-400 "}
        nextLinkClassName={"page-link"}
        breakClassName={"px-3 py-1 border border-blue-400 "}
        breakLinkClassName={"page-link"}
        activeClassName={"bg-blue-400 text-white"}
      />
    </div>
  );
};

export default Users;
