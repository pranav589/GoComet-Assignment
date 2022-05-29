import React, { useContext } from "react";
import Filters from "../../components/Filters/Filters";
import ProductsList from "../../components/ProductsList/ProductsList";
import { ProductsContext } from "../../context/productContext";
import "./ProductListingPage.css";

function ProductListingPage() {
  const { state } = useContext(ProductsContext);

  const sortProducts = (type, products) => {
    if (type === "LOW_TO_HIGH") {
      return products.sort((a, b) => a.price - b.price);
    }
    if (type === "HIGH_TO_LOW") {
      return products.sort((a, b) => b.price - a.price);
    }
    return products;
  };

  const sortedProducts = sortProducts(state.sortBy, state.products);

  function filterByColor(colorList, products) {
    if (colorList.length > 0) {
      return products.filter((prod) => colorList.includes(prod.primaryColour));
    }
    return products;
  }

  let filteredByColor = filterByColor(state.colorList, sortedProducts);

  function filterByBrand(brandList, products) {
    if (brandList.length > 0) {
      return products.filter((prod) => brandList.includes(prod.brand));
    }
    return products;
  }

  let filteredByBrand = filterByBrand(state.brandList, filteredByColor);

  function filterBySearch(products) {
    if (products) {
      return products.filter((prod) =>
        prod.productName.toLowerCase().includes(state.searchQuery)
      );
    }
  }

  let filteredBySearch = filterBySearch(filteredByBrand);
  function filterByGender(gender, products) {
    if (gender) {
      return products.filter((prod) => prod.gender === gender);
    }
    return products;
  }

  let filteredByGender = filterByGender(state.filterByGender, filteredBySearch);

  return (
    <div className="productListingPage">
      <Filters />
      <ProductsList filteredByGender={filteredByGender} />
    </div>
  );
}

export default ProductListingPage;
