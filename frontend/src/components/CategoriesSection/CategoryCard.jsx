import React from "react";

const CategoryCard = ({ _id, name, img }) => {
  return (
    <div className="min-w-56 min-h-56 border">
      <div
        className="bg-cover bg-center h-56 relative bg-clip-padding"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
        }}
      >
        <a
          href={`/category/${_id}`}
          className="text-lg font-semibold bg-primary text-white w-[90%] translate-x-[-50%] py-1 absolute bottom-2"
        >
          {name}
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
