import React, { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import SummaryApi from "../common/apiUrl";
import axios from "axios";
import FeaturedProductCard from "../components/FeaturedSection/FeaturedProductCard";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/Card/ProductCard";

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sortOptions = [
    { name: "nameAsc", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);

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

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [sortType, setSortType] = useState("");

  const [pName, SetPName] = useState("");
  useEffect(() => {
    SetPName(queryParams.get("pName") || "");
  }, [queryParams]);

  useEffect(() => {
    setNameFilter(pName);
    handleFilter({
      categoryFilter,
      priceFilter,
      nameFilter,
    });
  }, [pName]);

  const [categories, setCategories] = useState([]);
  const fetchAllCategories = async () => {
    await axios
      .get(SummaryApi.getAllCategory.url, {
        withCredentials: true,
        params: {
          page: 1,
          limit: Infinity,
        },
      })
      .then(function (response) {
        setCategories(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error?.response?.data?.message);
      });
  };

  const weights = ["0,5KG", "1KG", "5KG", "10KG"];
  const priceRanges = [
    { label: "0 - 100.000đ", min: 0, max: 100000 },
    { label: "100.000đ - 500.000đ", min: 100000, max: 500000 },
    { label: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
    { label: "> 1.000.000đ", min: 1000000, max: Infinity },
  ];

  const handleCategoryChange = (category) => {
    setCategoryFilter((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (range) => {
    setPriceFilter((prev) => {
      const isExisting = prev.find(
        (p) => p.min === range.min && p.max === range.max
      );
      if (isExisting) {
        return prev.filter((p) => p.min !== range.min || p.max !== range.max);
      } else {
        return [...prev, range];
      }
    });
  };

  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleFilter = ({ categoryFilter, priceFilter, nameFilter }) => {
    let filtered = products;
    if (categoryFilter.length > 0) {
      filtered = filtered.filter((product) => {
        return categoryFilter.includes(product.category.categoryName);
      });
    }

    if (priceFilter.length > 0) {
      filtered = filtered.filter((product) => {
        return priceFilter.some((range) => {
          return Object.values(product.size).some(
            (size) => size.price >= range.min && size.price <= range.max
          );
        });
      });
    }

    if (nameFilter != "") {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (sortType != "") {
      filtered = filtered.sort((a, b) => {
        if (sortType === "nameAsc") {
          return a.productName.localeCompare(b.productName);
        } else if (sortType === "nameDesc") {
          return b.productName.localeCompare(a.productName);
        } else if (sortType === "priceAsc") {
          return a.size["5KG"].price - b.size["5KG"].price;
        } else if (sortType === "priceDesc") {
          return b.size["5KG"].price - a.size["5KG"].price;
        } else {
          return 0;
        }
      });
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleFilter({
      categoryFilter,
      priceFilter,
      nameFilter,
    });
  }, [categoryFilter, priceFilter, nameFilter, sortType]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / pageSize));
    setPaginatedData(paginate(filteredProducts, pageSize, currentPage));
  }, [filteredProducts, currentPage, sortType]);

  const paginate = (array, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  };
  const [paginatedData, setPaginatedData] = useState(
    paginate(filteredProducts, pageSize, currentPage)
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllCategories();
    fetchAllProducts();
  }, []);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <div className="mt-4 border-t border-gray-200">
                <div className="max-w-md mx-auto">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-5 flex items-center ps-3 pointer-events-none">
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
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                      type="search"
                      id="default-search"
                      className="block w-[90%] mx-auto my-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tên sản phẩm..."
                      required
                    />
                  </div>
                </div>
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Danh mục sản phẩm
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {categories.map((category, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            checked={categoryFilter.includes(
                              category.categoryName
                            )}
                            onChange={() =>
                              handleCategoryChange(category.categoryName)
                            }
                            id={`filter-mobilec-${i}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobilec-${i}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {category.categoryName}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Khoảng giá
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {priceRanges.map((price, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            checked={
                              priceFilter.find(
                                (p) =>
                                  p.min === price.min && p.max === price.max
                              ) !== undefined
                            }
                            onChange={() => handlePriceChange(price)}
                            id={`filter-mobilep-${i}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobilep-${i}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {price.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-6xl px-6 xl:px-0">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="lg:text-4xl text-xl font-bold tracking-tight text-gray-900">
              Tất cả sản phẩm
            </h1>

            <div className="flex items-center justify-between">
              <select
                className="flex-1 max-w-[70%] border border-slate-300 rounded-md outline-none"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="nameAsc">Name A-Z</option>
                <option value="nameDesc">Name Z-A</option>
                <option value="priceAsc">Price Low to High</option>
                <option value="priceDesc">Price High to Low</option>
              </select>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block text-start">
                <div className="max-w-md mx-auto">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Search
                  </label>
                  <div className="relative z-20">
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
                      className="block w-full my-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tên sản phẩm..."
                      required
                    />
                  </div>
                </div>
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Danh mục
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {categories.map((category, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            checked={categoryFilter.includes(
                              category.categoryName
                            )}
                            onChange={() =>
                              handleCategoryChange(category.categoryName)
                            }
                            id={`filter-mobilec-${i}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label
                            htmlFor={`filter-mobilec-${i}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {category.categoryName}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Khoảng giá
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {priceRanges.map((price, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            checked={
                              priceFilter.find(
                                (p) =>
                                  p.min === price.min && p.max === price.max
                              ) !== undefined
                            }
                            onChange={() => handlePriceChange(price)}
                            id={`filter-mobilep-${i}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobilep-${i}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {price.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
              {/* Product grid */}
              {paginatedData.length > 0 ? (
                <>
                  <div className="lg:col-span-3 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {paginatedData?.map((p, i) => {
                      return (
                        <div className="col-span-1" key={i}>
                          {/* <FeaturedProductCard
                            product={p}
                            key={i}
                            callBack={() => fetchAllProducts()}
                          /> */}
                          <ProductCard
                            product={p}
                            key={i}
                            callBack={() => fetchAllProducts()}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="lg:col-span-1"></div>
                  <div className="lg:col-span-3">
                    <ReactPaginate
                      previousLabel={"Trước"}
                      nextLabel={"Sau"}
                      breakLabel={"..."}
                      pageCount={totalPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={
                        "flex items-center justify-center gap-1"
                      }
                      pageClassName={"px-3 py-1 border border-slate-400 "}
                      pageLinkClassName={"page-link"}
                      previousClassName={"px-3 py-1 border border-slate-400"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"px-3 py-1 border border-slate-400 "}
                      nextLinkClassName={"page-link"}
                      breakClassName={"px-3 py-1 border border-slate-400 "}
                      breakLinkClassName={"page-link"}
                      activeClassName={"bg-blue-400 text-white"}
                    />
                  </div>
                </>
              ) : (
                <div className="lg:col-span-3">
                  <p className="text-center">Không tìm thấy sản phẩm</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Shop;
