import React from "react";
import CategoriesSection from "../components/CategoriesSection/CategoriesSection";
import Heading from "../components/heading/Heading";
import FeaturedSection from "../components/FeaturedSection/FeaturedSection";

const Home = () => {
  return (
    <div>
      <CategoriesSection />
      <Heading title={"Sản phẩm nổi bật"} />
      <FeaturedSection />
    </div>
  );
};

export default Home;
