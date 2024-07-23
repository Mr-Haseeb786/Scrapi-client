import React from "react";

const ProductSpecialStat = ({ title, bgClr = "bg-accent" }) => {
  return (
    <div
      className={`${bgClr} px-4`}
      style={{
        clipPath:
          "polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 10% 50%, 0% 0%)",
      }}
    >
      <h2 className=''>{title}</h2>
    </div>
  );
};

export default ProductSpecialStat;
