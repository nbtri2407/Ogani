import React from "react";
import CategoriesSection from "../components/CategoriesSection/CategoriesSection";
import Heading from "../components/heading/Heading";
import FeaturedSection from "../components/FeaturedSection/FeaturedSection";
import ProductQuickviews from "../components/ProductQuickviews/ProductQuickviews";

const Home = () => {
  // const [openProductQuickView, setOpenProductQuickView] = useState(false);
  // const [productQuickView, setProductQuickView] = useState(false);

  return (
    <div className="mx-auto max-w-6xl text-center">
      <CategoriesSection />
      <Heading title={"Sản phẩm nổi bật"} />
      <FeaturedSection />

      
    </div>
  );
};

export default Home;
