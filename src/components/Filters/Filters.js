import React, { useContext } from "react";
import {
  FILTER_BRANDS,
  FILTER_COLORS,
  FILTER_GENDER,
} from "../../actions/productActions";
import { ProductsContext } from "../../context/productContext";
import "./Filters.css";

function Filters() {
  const { state, dispatch } = useContext(ProductsContext);
  let colors = [];
  let idealFor = [];
  let brands = [];
  const colorList = state.products.filter((prod) => {
    return (
      !colors.includes(prod.primaryColour) && colors.push(prod.primaryColour)
    );
  });

  const filteringByGender = state.products.filter((prod) => {
    return !idealFor.includes(prod.gender) && idealFor.push(prod.gender);
  });

  const brandList = state.products.filter((prod) => {
    return !brands.includes(prod.brand) && brands.push(prod.brand);
  });

  const handleBrandSelect = (brand) => {
    dispatch({ type: FILTER_BRANDS, payload: brand });
  };

  const handleColorSelect = (color) => {
    dispatch({ type: FILTER_COLORS, payload: color });
  };

  const handleGenderSelect = (gender) => {
    dispatch({ type: FILTER_GENDER, payload: gender });
  };

  return (
    <div className="filters">
      <h2>Filters</h2>
      <div className="filter">
        <div className="ideal_for">
          <h3>Ideal For:</h3>
          <div className="ideals">
            {idealFor.map((gender, index) => (
              <div className="row" key={index}>
                <input
                  type="radio"
                  name="gender"
                  onClick={() => handleGenderSelect(gender)}
                />
                <label htmlFor={gender}>{gender}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="color">
          <h3>Color:</h3>
          <div className="colors">
            {colors.map((col, index) => (
              <div className="row" key={index}>
                <input
                  type="checkbox"
                  id={col}
                  name={col}
                  value={col}
                  onClick={() => handleColorSelect(col)}
                />
                <label htmlFor={col}>{col}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="color">
          <h3>Brands:</h3>
          <div className="colors">
            {brands.map((brand, index) => (
              <div className="row" key={index}>
                <input
                  type="checkbox"
                  id={brand}
                  name={brand}
                  value={brand}
                  onClick={() => handleBrandSelect(brand)}
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
