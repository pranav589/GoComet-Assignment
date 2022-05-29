import { createContext, useReducer } from "react";
import MaleData from "../data/Male.json";
import FemaleData from "../data/Female.json";
import productReducer from "../reducers/productReducer";

const initialState = {
  products: [...MaleData, ...FemaleData],
  colorList: [],
  sortBy: "",
  filterByGender: "",
  brandList: [],
  searchQuery: "",
  wishList: [],
  cart: [],
  similarProducts: [],
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
