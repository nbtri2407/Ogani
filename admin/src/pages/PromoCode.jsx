import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import ReactPaginate from "react-paginate";
import AddPromoCode from "../components/Forms/AddPromoCode";
import axios from "axios";
import { toast } from "react-toastify";
import SummaryApi from "../common/apiUrl";
import PromoCard from "../components/Cards/PromoCard ";
import ConfirmDelete from "../components/Modal/ConfirmDelete";
import UpdatePromoCode from "../components/Forms/UpdatePromoCode";

const PromoCode = () => {
  const [promoCodes, setPromoCodes] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatePromoCode, setUpdatePromoCode] = useState({});
  const [deletePromoCodeId, setDeletePromoCodeId] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const [codeFilter, setCodeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredPromoCodes, setFilteredPromoCodes] = useState([]);

  const getAllPromoCode = async () => {
    await axios
      .get(SummaryApi.promoCode.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setPromoCodes(response?.data?.data);
        setFilteredPromoCodes(response?.data?.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getAllPromoCode();
  }, []);

  const handleDeleteProduct = async () => {
    await axios
      .delete(SummaryApi.promoCode.url, {
        data: { promoCodeId: deletePromoCodeId },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(function (response) {
        setShowModalDelete(false);
        toast.success(response?.data?.message);
        getAllPromoCode();
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const handleFilter = ({ codeFilter }) => {
    let filtered = promoCodes;

    if (codeFilter !== "") {
      filtered = filtered.filter((promoCode) =>
        promoCode.code.toLowerCase().includes(codeFilter.toLowerCase())
      );
    }

    if (statusFilter !== "") {
      filtered = filtered.filter(
        (promoCode) => promoCode.status === statusFilter
      );
    }

    setFilteredPromoCodes(filtered);
  };

  useEffect(() => {
    handleFilter({
      codeFilter,
    });
  }, [codeFilter, statusFilter]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (array, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  };

  const paginatedData = paginate(filteredPromoCodes, pageSize, currentPage);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredPromoCodes.length / pageSize));
  }, [pageSize, filteredPromoCodes]);

  return (
    <div className="px-10 py-2 relative min-h-[90vh]">
      <div className="flex items-center justify-between py-4 border-b border-slate-400">
        <h1 className="text-[2rem] font-bold">Mã giảm giá</h1>

        <IoIosAddCircle
          className="text-[1.6rem] hover:text-primary transition-all cursor-pointer"
          onClick={() => setShowAddForm(true)}
        />
      </div>
      <div className="flex items-center gap-2 justify-between py-4 border-b border-slate-400">
        <div className="flex-1 flex gap-8">
          <label
            htmlFor="default-search"
            className="text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative lg:w-2/3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={codeFilter}
              onChange={(e) => setCodeFilter(e.target.value)}
              id="default-search"
              className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập mã giảm giá để tìm kiếm"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              checked={statusFilter === ""}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tất cả
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value="active"
              name="default-radio"
              checked={statusFilter === "active"}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Đang hoạt động
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-3"
              type="radio"
              value="inactive"
              name="default-radio"
              checked={statusFilter === "inactive"}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="default-radio-3"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Hết hạn
            </label>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <p>Số sản phẩm trên 1 trang</p>
          <select
            className="rounded-lg"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={15}>15</option>
            <option value={18}>18</option>
            <option value={21}>21</option>
            <option value={24}>24</option>
            <option value={27}>27</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 p-2">
          {paginatedData.map((promoCode, index) => (
            <PromoCard
              key={index}
              promo={promoCode}
              handleDelete={() => {
                setShowModalDelete(true);
                setDeletePromoCodeId(promoCode._id);
              }}
              handleEdit={(p) => {
                console.log("p", p);

                setUpdatePromoCode(p);
                setShowUpdateForm(true);
              }}
            />
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Trước"}
        nextLabel={"Sau"}
        breakLabel={"..."}
        pageCount={totalPages}
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

      {/* Modal */}
      {showAddForm && (
        <AddPromoCode
          onClose={() => setShowAddForm(false)}
          callBack={() => {
            getAllPromoCode();
          }}
        />
      )}

      {showUpdateForm && (
        <UpdatePromoCode
          promo={updatePromoCode}
          onClose={() => setShowUpdateForm(false)}
          callBack={() => {
            getAllPromoCode();
          }}
        />
      )}

      {showModalDelete && (
        <ConfirmDelete
          title={"Mã giảm giá"}
          onClose={() => setShowModalDelete(false)}
          callBack={handleDeleteProduct}
        />
      )}

      {/* showUpdateForm */}
    </div>
  );
};

export default PromoCode;
