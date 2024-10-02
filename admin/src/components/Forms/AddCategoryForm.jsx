import React, { useEffect, useState } from "react";
import SummaryApi from "../../common/apiUrl";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategoryForm = ({ onClose, callBack }) => {
  const [data, setData] = useState({
    categoryName: "",
    imageUrl: "",
    description:
      "This brand represents a symbol of trust and quality across various industries. It embodies a commitment to excellence and innovation, catering to the needs of consumers worldwide. With a focus on delivering value and performance, this brand has earned a reputation for reliability and customer satisfaction. Its products and services are designed to meet the evolving demands of a diverse global market.",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [file, setFile] = useState([]);

  const handleUploadImg = (item) => {
    setFile([...item.allEntries.filter((file) => file.status === "success")]);
  };

  const [isGetDesAI, setIsGetDesAI] = useState(false);
  const getDescriptionAI = async () => {
    try {
      if (data.categoryName == "") {
        toast.warning("Hãy nhập tên danh mục sản phẩm!");
      } else {
        setIsGetDesAI(true);
        const result = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCMHrle1Rw6tWycrHVYn-AKThDZI_CZDnI",
          {
            contents: [
              {
                parts: [
                  {
                    text: `Tạo một đoạn mô tả ngắn từ 5-6 câu cho Danh mục sản phẩm có tên là: ${data.categoryName}. Để hiện thị trên website bán rau củ quả sạch của tôi`,
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
        const des = result.data.candidates[0].content.parts[0].text;
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

  const handleAddCategory = async () => {
    await axios
      .post(SummaryApi.addCategory.url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(function (response) {
        toast.success(response?.data?.message);
        onClose();
        callBack();
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (file?.[0]?.cdnUrl !== undefined) {
      setData({ ...data, ["imageUrl"]: file?.[0]?.cdnUrl });
    } else {
      setData({ ...data, ["imageUrl"]: "" });
    }
  }, [file]);

  console.log("data", data);

  return (
    <div className="absolute top-0 h-[92vh] left-0 right-0 bg-black/20">
      <div className="absolute rounded-lg z-10 top-[10%] left-[50%] translate-x-[-50%] flex flex-col gap-6 w-[50%] p-4 shadow bg-white border">
        <button
          className="block ml-auto text-2xl border border-black/20 text-primary hover:bg-primary hover:text-white transition-all"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <h1 className="text-2xl">Thêm Danh mục sản phẩm</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="categoryName">Tên</label>
          <input
            className="border border-black/50 p-2 rounded outline-none"
            type="text"
            name="categoryName"
            id="categoryName"
            value={data?.categoryName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="categoryName">Hình ảnh</label>
          <div className="w-full flex gap-2 justify-between items-center">
            <FileUploaderMinimal
              className="flex-1"
              onChange={handleUploadImg}
              imgOnly="true"
              multiple="false"
              pubkey="029924d007fae1b85894"
            />
            <div>
              {file?.[0]?.cdnUrl && (
                <div className="w-full flex justify-center">
                  <img
                    className="w-32 h-32"
                    src={file?.[0]?.cdnUrl}
                    alt={file?.[0]?.fileInfo?.originalFilename}
                  />
                </div>
              )}
            </div>
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
            rows="5"
            className=" p-2 border border-black/50 rounded outline-none"
            type="text"
            name="description"
            id="description"
            value={data?.description}
            onChange={handleChange}
            required
          />
        </div>
        <button
          onClick={handleAddCategory}
          className="primary-btn bg-primary py-2 text-white hover:bg-primary/80"
        >
          Thêm
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
