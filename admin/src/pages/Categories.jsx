import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import ReactPaginate from "react-paginate";
import AddCategoryForm from "../components/Forms/AddCategoryForm";
import axios from "axios";
import SummaryApi from "../common/apiUrl";
import moment from "moment";
import { MdDelete, MdEdit } from "react-icons/md";
import UpdateCategoryForm from "../components/Forms/UpdateCategory";
import { toast } from "react-toastify";
import ConfirmDelete from "../components/Modal/ConfirmDelete";

const Categories = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState({
    _id: "",
    categoryName: "",
    description: "",
    imageUrl: "",
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState("");
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const fetchAllCategories = async () => {
    await axios
      .get(SummaryApi.getAllCategory.url, {
        withCredentials: true,
        params: {
          page: currentPage,
          limit: 6,
        },
      })
      .then(function (response) {
        setCategories(response?.data?.data);
        setPagination(response?.data?.pagination);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const handleDeleteCategory = async () => {
    await axios
      .delete(SummaryApi.deleteCategory.url, {
        data: { _id: deleteCategoryId },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(function (response) {
        setShowModalDelete(false);
        toast.success(response?.data?.message);
        fetchAllCategories();
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchAllCategories();
  }, [currentPage]);

  return (
    <div className="px-10 py-2 relative">
      <div className="flex items-center justify-between py-4 border-b border-slate-400">
        <h1 className="text-[2rem] font-bold">Tất cả danh mục</h1>
        <IoIosAddCircle
          className="text-[1.6rem] hover:text-primary transition-all cursor-pointer"
          onClick={() => setShowAddForm(true)}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[70vh]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Hình ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Tên 
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày tạo
              </th>
              <th scope="col" className="px-6 py-3" colSpan={2}>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => {
              return (
                <tr className="bg-white border-b " key={index}>
                  <td className="border-b p-2 flex justify-start">
                    <img className="w-20" src={category?.imageUrl} alt="" />
                  </td>
                  <td className="px-6 py-4">{category?.categoryName}</td>
                  <td className="px-6 py-4 max-w-64">
                    <p className="text-ellipsis line-clamp-2">
                      {category?.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {moment(category?.createdAt).format("LLL")}
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
        previousLabel={"Trước"}
        nextLabel={"Sau"}
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

      {showAddForm && (
        <AddCategoryForm
          title={"Category"}
          onClose={() => setShowAddForm(false)}
          callBack={fetchAllCategories(deleteCategoryId)}
        />
      )}

      {showUpdateForm && (
        <UpdateCategoryForm
          onClose={() => setShowUpdateForm(false)}
          callBack={fetchAllCategories}
          category={editCategory}
        />
      )}
      {showModalDelete && (
        <ConfirmDelete
          onClose={() => setShowModalDelete(false)}
          callBack={handleDeleteCategory}
          title={"Danh mục"}
        />
      )}
    </div>
  );
};

export default Categories;
