import React, { useContext } from "react";
import { ProductsContext } from "../../context/productContext";
import Product from "../Product/Product";
import "./ProductsList.css";

function ProductsList({ filteredByGender }) {
  const { dispatch } = useContext(ProductsContext);
  return (
    <div className="productsList">
      <div className="sort_by_div">
        <label htmlFor="sort_by">Sort By Price</label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => dispatch({ type: "LOW_TO_HIGH" })}
          />
          Low To High
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => dispatch({ type: "HIGH_TO_LOW" })}
          />
          High To Low
        </label>
      </div>
      <div className="products">
        {filteredByGender?.map((item) => (
          <Product item={item} key={item.buyButtonWinnerSkuId} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
