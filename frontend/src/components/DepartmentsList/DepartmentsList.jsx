import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SummaryApi from "../../common/apiUrl";

const DepartmentsList = ({ status }) => {
  let height = 0;
  const list = {
    hidden: { height: height },
    show: { height: 455 },
  };

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

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <motion.ul
      initial={{ height: 0 }}
      variants={list}
      animate={status ? "show" : "hidden"}
      className="w-full z-40 overflow-auto border text-start text-[1rem] transition-all bg-slate-50 scrollbar-custom"
    >
      {categories?.map((c, i) => {
        return (
          <li
            key={i}
            className="pt-4 px-6 flex hover:bg-slate-200 duration-200"
          >
            <a href={`/category/${c._id}`} className="flex-1">
              {c.categoryName}
            </a>
          </li>
        );
      })}
    </motion.ul>
  );
};

export default DepartmentsList;
