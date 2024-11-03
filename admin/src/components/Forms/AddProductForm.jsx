import React, { useEffect, useState } from "react";
import SummaryApi from "../../common/apiUrl";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AddProductForm = ({ onClose, callBack }) => {
  const [data, setData] = useState({
    productName: "",
    category: "",
    imageUrl: [],
    size: {},
    description: "",
  });

  const [sizeData, setSizeData] = useState({
    "100G": { quantity: "", price: "" },
    "500G": { quantity: "", price: "" },
    "1KG": { quantity: "", price: "" },
    "5KG": { quantity: "", price: "" },
  });

  const handleInputChange = (weight, field, value) => {
    setSizeData((prevData) => ({
      ...prevData,
      [weight]: {
        ...prevData[weight],
        [field]: value,
      },
    }));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [files, setFiles] = useState([]);

  const handleUploadImg = (items) => {
    setFiles([...items.allEntries.filter((file) => file.status === "success")]);
  };

  const [categoriesList, setCategoriesList] = useState([]);
  const fetchAllCategories = async () => {
    await axios
      .get(SummaryApi.getAllCategory.url, {
        withCredentials: true,
      })
      .then(function (response) {
        setCategoriesList(response?.data?.data);
      })
      .catch(function (error) {
        console.log("error",error); 
      });
  };

  const [isGetDesAI, setIsGetDesAI] = useState(false);
  const getDescriptionAI = async () => {
    try {
      if (data.productName == "") {
        toast.warning("Please enter product name!");
      } else {
        setIsGetDesAI(true);
        const result = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCMHrle1Rw6tWycrHVYn-AKThDZI_CZDnI",
          {
            contents: [
              {
                parts: [
                  {
                    text: `Tạo một đoạn mô tả ngắn từ 5-6 câu cho sản phẩm có tên sản phẩm là: ${data.productName}. Để hiện thị trên website bán rau củ quả sạch của tôi`,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let des = result.data.candidates[0].content.parts[0].text; 
        des = des.replace(/#/g, "");  
        setData((prevData) => ({
          ...prevData,
          description: des,
        }));
        setIsGetDesAI(false);
      }
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    data.imageUrl = files.map((file) => file.cdnUrl);
    data.size = sizeData;
    await axios
      .post(SummaryApi.addProduct.url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(function (response) {
        toast.success(response?.data?.message);
        callBack();
        onClose();
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="absolute top-0 h-[92vh] left-0 right-0 bg-black/20">
      <div className="absolute rounded-lg z-10 top-[4%] left-[50%] translate-x-[-50%] flex flex-col gap-4 xl:w-[50%] w-[80%] max-h-[86vh] overflow-y-auto p-4 shadow bg-white border">
        <div className="flex jus">
          <h1 className="text-2xl">Thêm sản phẩm</h1>
          <button
            className="block ml-auto text-2xl border border-black/20 text-primary hover:bg-primary hover:text-white transition-all"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={(e) => handleAddProduct(e)}>
          <div className="grid gap-4 grid-cols-1">
            <div className="col-span-1">
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <div className="flex flex-col gap-1 col-span-1">
                  <label
                    for="default-input"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên Sản Phẩm
                  </label>
                  <input
                    type="text"
                    name="productName"
                    id="default-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={data.productName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="category"
                  >
                    Danh mục
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="category"
                    id="category"
                    value={data.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn danh mục</option>

                    {categoriesList.map((category, index) => {
                      return (
                        <option key={index} value={category._id}>
                          {category.categoryName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/* Quantity and Price */}
              <div className="grid grid-cols-1 gap-2 mt-1 mb-4">
                <h3 className="col-span-1">Phân loại</h3>
                <div className="grid grid-cols-12 gap-2 items-center col-span-1 text-end">
                  <label
                    for="small-input-100G"
                    className="block text-sm font-bold text-black min-w-10 col-span-2"
                  >
                    100G
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="small-input-100G"
                    placeholder="Số lượng"
                    value={sizeData["100G"].quantity}
                    onChange={(e) =>
                      handleInputChange("100G", "quantity", e.target.value)
                    }
                    className="block col-span-5 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    min={1000}
                    id="small-input-100G1"
                    placeholder="Giá bán"
                    value={sizeData["100G"].price}
                    onChange={(e) =>
                      handleInputChange("100G", "price", e.target.value)
                    }
                    className="block col-span-5 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {/* flex items-center gap-2  */}
                <div className="grid grid-cols-12 gap-2 items-center col-span-1 text-end"> 
                  <label
                    for="small-input-500g"
                    className="block text-sm font-bold text-black col-span-2"
                  >
                    500G
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="small-input-500g"
                    placeholder="Số lượng"
                    value={sizeData["500G"].quantity}
                    onChange={(e) =>
                      handleInputChange("500G", "quantity", e.target.value)
                    }
                    className="block col-span-5 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    min={1000}
                    id="small-input-500g1"
                    placeholder="Giá bán"
                    value={sizeData["500G"].price}
                    onChange={(e) =>
                      handleInputChange("500G", "price", e.target.value)
                    }
                    className="block col-span-5 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-12 gap-2 items-center col-span-1 text-end">
                  <label
                    for="small-input-1KG"
                    className="block col-span-2 text-sm font-bold text-black min-w-10"
                  >
                    1KG
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="small-input-1KG"
                    placeholder="Số lượng"
                    value={sizeData["1KG"].quantity}
                    onChange={(e) =>
                      handleInputChange("1KG", "quantity", e.target.value)
                    }
                    className="block col-span-5 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    min={1000}
                    id="small-input-1KG1"
                    placeholder="Giá bán"
                    value={sizeData["1KG"].price}
                    onChange={(e) =>
                      handleInputChange("1KG", "price", e.target.value)
                    }
                    className="block col-span-5 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-12 gap-2 items-center col-span-1 text-end">
                  <label
                    for="small-input-5KG"
                    className="block col-span-2 text-sm font-bold text-black min-w-10"
                  >
                    5KG
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="small-input-5KG"
                    placeholder="Số lượng"
                    value={sizeData["5KG"].quantity}
                    onChange={(e) =>
                      handleInputChange("5KG", "quantity", e.target.value)
                    }
                    className="block col-span-5 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    min={1000}
                    id="small-input-5KG1"
                    placeholder="Giá bán"
                    value={sizeData["5KG"].price}
                    onChange={(e) =>
                      handleInputChange("5KG", "price", e.target.value)
                    }
                    className="block col-span-5 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <label htmlFor="description">Mô tả</label>
                  {isGetDesAI ? (
                    <div role="status mt-2">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="underline text-black hover:text-primary/80"
                      onClick={getDescriptionAI}
                    >
                      Tạo mô tả tự động
                    </button>
                  )}
                </div>
                <textarea
                  rows="4"
                  className="text-black p-2 border border-black/50 rounded outline-none"
                  type="text"
                  name="description"
                  id="description"
                  spellcheck="false"
                  value={data?.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-span-1">
              <label htmlFor="Product Image">Hình Ảnh</label>
              <FileUploaderMinimal
                onChange={handleUploadImg}
                imgOnly="true"
                multiple-max="4"
                pubkey="029924d007fae1b85894"
              />
              {/* <div className="flex mt-2 gap-2 justify-start">
                {files.map((file) => (
                  <div key={file.uuid}>
                    <img
                      className="w-32 border"
                      src={file.cdnUrl}
                      alt={file.fileInfo.originalFilename}
                    />
                  </div>
                ))}
              </div> */}
            </div>
          </div>
          <button
            type="submit"
            className="float-end primary-btn mt-2 lg:w-[30%] w-full mx-auto bg-primary py-2 text-white hover:bg-primary/80"
          >
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
