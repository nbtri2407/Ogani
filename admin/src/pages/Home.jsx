import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TotalRevenue from "../components/DashboardItems/TotalRevenue";

const Home = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user);

  const navigator = useNavigate();
  if (!user || user.role !== "ADMIN" || user == null) {
    navigator("/login");
  }
  return <TotalRevenue />;
};

export default Home;
