import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user);

  const navigator = useNavigate();
  if (!user || user.role !== "ADMIN") {
    navigator("/login");
  }
  return <div className="">Home</div>;
};

export default Home;
