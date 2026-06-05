import React from "react";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price?: number;
  discount?: number; // ✅ optional
  className?: string;
}

const PriceView = ({ price, discount = 0, className }: Props) => {
  if (price === undefined) return null;

  // ✅ Calculate discounted price if discount > 0
  const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      {/* Show final price */}
      <PriceFormatter
        amount={finalPrice}
        className="text-white font-bold text-xs"
      />

      {/* If discount applied, show original price struck through */}
      {discount > 0 && (
        <PriceFormatter
          amount={price}
          className="line-through font-normal text-gray-400 text-xs"
        />
      )}
    </div>
  );
};

export default PriceView;
