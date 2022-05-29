import {
  CLEAR_FILTERS,
  FILTER_BRANDS,
  FILTER_COLORS,
  HIGH_TO_LOW,
  LOW_TO_HIGH,
  FILTER_GENDER,
  FILTER_SEARCH,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_CART_QTY,
  GET_SIMILAR_PRODUCTS,
} from "../actions/productActions";

const productReducer = (state, action) => {
  switch (action.type) {
    case LOW_TO_HIGH:
      return {
        ...state,
        sortBy: "LOW_TO_HIGH",
      };
    case HIGH_TO_LOW:
      return {
        ...state,
        sortBy: "HIGH_TO_LOW",
      };
    case FILTER_COLORS:
      let alreadyInList = state.colorList.includes(action.payload);

      return {
        ...state,
        colorList: alreadyInList
          ? state.colorList.filter((col) => col !== action.payload)
          : [...state.colorList, action.payload],
      };

    case FILTER_GENDER:
      return {
        ...state,
        filterByGender: action.payload,
      };
    case FILTER_BRANDS:
      let alreadyInBrandList = state.brandList.includes(action.payload);

      return {
        ...state,
        brandList: alreadyInBrandList
          ? state.brandList.filter((brand) => brand !== action.payload)
          : [...state.brandList, action.payload],
      };
    case FILTER_SEARCH:
      return { ...state, searchQuery: action.payload };

    case CLEAR_FILTERS:
      return {
        ...state,
        colorList: [],
        sortBy: "",
        filterByGender: "",
        brandList: [],
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishList: [...state.wishList, { ...action.payload, qty: 1 }],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishList: state.wishList.filter(
          (c) => c.buyButtonWinnerSkuId !== action.payload.buyButtonWinnerSkuId
        ),
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, size: action.payload.size, qty: 1 },
        ],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (c) =>
            c.prod.buyButtonWinnerSkuId !== action.payload.buyButtonWinnerSkuId
        ),
      };

    case CHANGE_CART_QTY:
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.prod.buyButtonWinnerSkuId === action.payload.id
            ? (c.qty = action.payload.qty)
            : c.qty
        ),
      };

    case GET_SIMILAR_PRODUCTS:
      return {
        ...state,
        similarProducts: state.products.filter((ele) => {
          return (
            ele.additionalInfo === action.payload.info &&
            ele.productId !== action.payload.id
          );
        }),
      };

    default:
      return state;
  }
};

export default productReducer;
