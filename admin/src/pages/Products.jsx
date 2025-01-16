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
  const [categories, setCategories] = useState([]);
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

  const [isOpen, setIsOpen] = useState(false);
  // Toggle Dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
        setFilteredProducts(response?.data?.data);
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

  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOptions, setSortOptions] = useState({
    name: "",
    quantity: "",
    price: "",
    discount: "",
    dateCreate: "",
  });

  const handleSetSortOptions = (name) => {
    let type = "asc";
    if (sortOptions[name] == "asc") type = "desc";
    if (sortOptions[name] == "desc") type = "";

    setSortOptions({ ...sortOptions, [name]: type });
  };

  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleFilter = ({ nameFilter, sortOptions }) => {
    let filtered = products;

    if (nameFilter != "") {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (sortOptions.name != "") {
      filtered = filtered.sort((a, b) => {
        if (sortOptions.name === "asc") {
          return a.productName.localeCompare(b.productName);
        }
        if (sortOptions.name === "desc") {
          return b.productName.localeCompare(a.productName);
        }
      });
    }

    if (sortOptions.quantity != "") {
      filtered = filtered.sort((a, b) => {
        // Tính tổng số lượng của từng sản phẩm
        const totalQuantityA = Object.values(a.size).reduce(
          (sum, size) => sum + size.quantity,
          0
        );
        const totalQuantityB = Object.values(b.size).reduce(
          (sum, size) => sum + size.quantity,
          0
        );

        if (sortOptions.quantity === "asc") {
          return totalQuantityA - totalQuantityB; // Sắp xếp tăng dần
        }
        if (sortOptions.quantity === "desc") {
          return totalQuantityB - totalQuantityA; // Sắp xếp giảm dần
        }
      });
    }

    if (sortOptions.price != "") {
      filtered = filtered.sort((a, b) => {
        if (sortOptions.price === "asc") {
          return a.size["5KG"].price - b.size["5KG"].price;
        }
        if (sortOptions.price === "desc") {
          return b.size["5KG"].price - a.size["5KG"].price;
        }
      });
    }
    if (sortOptions.discount != "") {
      filtered = filtered.sort((a, b) => {
        if (sortOptions.discount === "asc") {
          return a.discount - b.discount;
        }
        if (sortOptions.discount === "desc") {
          return b.discount - a.discount;
        }
      });
    }

    if (sortOptions.dateCreate != "") {
      filtered = filtered.sort((a, b) => {
        if (sortOptions.dateCreate === "asc") {
          return a.createdAt - b.createdAt;
          // return a.createdAt.localeCompare(b.createdAt);
        }
        if (sortOptions.dateCreate === "desc") {
          return b.createdAt - a.createdAt;
        }
      });
    }

    if (categoryFilter !== "") {
      filtered = filtered.filter(
        (product) => product.category._id === categoryFilter
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilterCategory = (e) => {
    setCategoryFilter(e.target.value);
  };

  useEffect(() => {
    handleFilter({
      nameFilter,
      sortOptions,
    });
  }, [nameFilter, sortOptions, categoryFilter]);

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

  const paginatedData = paginate(filteredProducts, pageSize, currentPage);

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
    setTotalPages(Math.ceil(filteredProducts.length / pageSize));
  }, [pageSize, filteredProducts]);

  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    const categories = Array.from(
      new Set(
        products?.map((product) =>
          JSON.stringify({
            id: product.category._id,
            name: product.category.categoryName,
          })
        )
      )
    ).map((category) => JSON.parse(category));
    setCategories(categories);
  }, [products]);

  return (
    <div className="px-10 py-2 relative min-h-[90vh]">
      <div className="flex items-center justify-between py-4 border-b border-slate-400">
        <h1 className="text-[2rem] font-bold">Tất cả sản phẩm</h1>
        <div className="flex items-center gap-2">
          {/* <button
            className="flex items-center gap-2 group hover:underline transition-all"
            onClick={() => setShowAddForm(true)}
          >
            Thêm sản phẩm
            <IoIosAddCircle className="text-[1.6rem] group-hover:text-primary transition-all cursor-pointer" />
          </button> */}
          <button
            onClick={() => setShowAddForm(true)}
            type="button"
            className="gap-2 text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
          >
            <IoIosAddCircle className="text-xl group-hover:text-primary transition-all cursor-pointer" />
            Thêm sản phẩm
          </button>
          {/* <a
            href="http://localhost:5050/api/download"
            className="gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
          >
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
              />
            </svg>
            Xuất CSV
          </a> */}

          <div className="relative inline-block text-left">
            {/* Button */}
            <button
              onClick={toggleDropdown}
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none"
            >
              Export
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <a
                    href="http://localhost:5050/api/export?format=csv"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 hover:text-white transition-all"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    File CSV
                  </a>
                  <a
                    href="http://localhost:5050/api/export?format=excel"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 hover:text-white transition-all"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    File Excel
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* end dropdown */}
        </div>
      </div>
      <div className="flex items-center gap-16 justify-between py-4 border-b border-slate-400">
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
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              id="default-search"
              className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tên sản phẩm..."
              required
            />
          </div>
          <div className="">
            <select
              onChange={(e) => handleFilterCategory(e)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            >
              <option value={""} selected>
                Tất cả
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
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
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[60vh]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-32">
                <div className="flex items-center">
                  Tên sẩn phẩm
                  <button
                    onClick={() => handleSetSortOptions("name")}
                    className="cursor-pointer"
                  >
                    {sortOptions.name == "" ? (
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    ) : (
                      <svg
                        className={`w-2 h-2 ms-1.5 ${
                          sortOptions.name == "asc" ? "" : "rotate-180"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 10"
                      >
                        <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Danh mục
                  {/* <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a> */}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Số lượng
                  <button
                    onClick={() => handleSetSortOptions("quantity")}
                    className="cursor-pointer"
                  >
                    {sortOptions.quantity == "" ? (
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    ) : (
                      <svg
                        className={`w-2 h-2 ms-1.5 ${
                          sortOptions.quantity == "asc" ? "" : "rotate-180"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 10"
                      >
                        <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Giá bán
                  <button
                    onClick={() => handleSetSortOptions("price")}
                    className="cursor-pointer"
                  >
                    {sortOptions.price == "" ? (
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    ) : (
                      <svg
                        className={`w-2 h-2 ms-1.5 ${
                          sortOptions.price == "asc" ? "" : "rotate-180"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 10"
                      >
                        <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </th>
              {/* <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Giảm giá
                  <button
                    onClick={() => handleSetSortOptions("discount")}
                    className="cursor-pointer"
                  >
                    {sortOptions.discount == "" ? (
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    ) : (
                      <svg
                        className={`w-2 h-2 ms-1.5 ${
                          sortOptions.discount == "asc" ? "" : "rotate-180"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 10"
                      >
                        <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </th> */}
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Mô tả
                  {/* <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a> */}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Ngày tạo
                  <button
                    onClick={() => handleSetSortOptions("dateCreate")}
                    className="cursor-pointer"
                  >
                    {sortOptions.dateCreate == "" ? (
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    ) : (
                      <svg
                        className={`w-2 h-2 ms-1.5 ${
                          sortOptions.dateCreate == "asc" ? "" : "rotate-180"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 10"
                      >
                        <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                      </svg>
                    )}
                  </button>
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
                  {/* <td className="px-6 py-4">{product?.discount}%</td> */}
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
