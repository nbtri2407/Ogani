import React from "react";

const CategoryCard = ({name,img}) => {
  return (
    <div className="min-w-56 min-h-56 border">
      <div
        className="bg-cover bg-center h-56 relative bg-clip-padding"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize:  "cover", 
        }}
      >
        <h5 className="bg-primary text-white w-[90%] mx-[50%] translate-x-[-50%] py-1 absolute bottom-2">
          <a href="#" className="text-lg font-semibold ">
            {name}
          </a>
        </h5>
      </div>
    </div>
  );
};

export default CategoryCard;
