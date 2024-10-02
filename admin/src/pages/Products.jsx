import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import ReactPaginate from "react-paginate"; 
import axios from "axios";
import SummaryApi from "../common/apiUrl";
import moment from "moment";
import formatPrice from "../helper/formatPrice"; 
import { toast } from "react-toastify";
import ConfirmDelete from "../components/Modal/ConfirmDelete";
import AddProductForm from "../components/Forms/AddProductForm";
import UpdateProductForm from "../components/Forms/UpdateProductForm";

const Products = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({
    productName: "",
    category: "",
    imageUrl: [],
    price: 1,
    quantity: 1,
    discount: 0,
    weight: 0,
    description: "",
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const fetchAllProducts = async () => {
    await axios
      .get(SummaryApi.getAllProduct.url, {
        withCredentials: true,
        params: {
          page: 1,
          limit: Infinity,
        },
      })
      .then(function (response) {
        setProducts(response?.data?.data); 
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const getTotalQuantity = (product) => {
    let totalQuantity = 0;

    Object.values(product.size).forEach((size) => {
      totalQuantity += size.quantity;
    });

    return totalQuantity;
  };

  const getPriceRange = (product) => {
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    Object.values(product.size).forEach((size) => {
      minPrice = Math.min(minPrice, size.price);
      maxPrice = Math.max(maxPrice, size.price);
    });

    return {
      minPrice,
      maxPrice,
    };
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (array, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  };

  const paginatedData = paginate(products, pageSize, currentPage);

  const handleDeleteProduct = async () => {
    await axios
      .delete(SummaryApi.deleteProduct.url, {
        data: { _id: deleteProductId },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(function (response) {
        setShowModalDelete(false);
        toast.success(response?.data?.message);
        fetchAllProducts();
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    setTotalPages(Math.ceil(products.length / pageSize));
  }, [pageSize, products]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="px-10 py-2 relative min-h-[90vh]">
      <div className="flex items-center justify-between py-4 border-b border-slate-400">
        <h1 className="text-[2rem] font-bold">Tất cả sản phẩm</h1>

        <IoIosAddCircle
          className="text-[1.6rem] hover:text-primary transition-all cursor-pointer"
          onClick={() => setShowAddForm(true)}
        />
      </div>
      <div className="flex items-center gap-2 justify-end py-4 border-b border-slate-400">
        <p>Số sản phẩm trên 1 trang</p>
        <select
          className="rounded-lg"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-32">
                <div className="flex items-center">
                  Tên sẩn phẩm
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Danh mục
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Số lượng
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Giá bán
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Giảm giá
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Mô tả
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Ngày tạo
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Hành động</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((product, index) => {
              return (
                <tr className="bg-white border-b " key={index}>
                  <td className="px-2 py-4 flex items-center">
                    <img className="w-10" src={product?.imageUrl?.[0]} alt="" />
                    <p className="min-w-24 text-ellipsis line-clamp-2 max-w-52">
                      {product?.productName}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {product?.category?.categoryName}
                  </td>
                  <td className="px-6 py-4">{getTotalQuantity(product)}</td>
                  <td className="px-6 py-4">{`${formatPrice(
                    getPriceRange(product).minPrice
                  )} - ${formatPrice(getPriceRange(product).maxPrice)}`}</td>
                  <td className="px-6 py-4">{product?.discount}%</td>
                  <td className="px-6 py-4 max-w-52">
                    <p className="text-ellipsis line-clamp-2">
                      {product?.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {moment(product?.createdAt).format("LLL")}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setEditProduct(product);
                        setShowUpdateForm(true);
                      }}
                      className="font-medium text-blue-600 hover:underline mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => {
                        setDeleteProductId(product?._id);
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

      {showAddForm && (
        <AddProductForm
          onClose={() => setShowAddForm(false)}
          callBack={fetchAllProducts}
        />
      )}

      {showUpdateForm && (
        <UpdateProductForm
          onClose={() => setShowUpdateForm(false)}
          callBack={fetchAllProducts}
          product={editProduct}
        />
      )}
      {showModalDelete && (
        <ConfirmDelete
          title={"Sản phẩm"}
          onClose={() => setShowModalDelete(false)}
          callBack={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default Products;
