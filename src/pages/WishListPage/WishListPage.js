import React, { useContext } from "react";
import { REMOVE_FROM_WISHLIST } from "../../actions/productActions";
import { ProductsContext } from "../../context/productContext";
import "./WishListPage.css";

function WishListPage() {
  const { state, dispatch } = useContext(ProductsContext);
  const { wishList } = state;

  if (wishList.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No Products in the Wishlist</h2>;
  }

  return wishList.map((prod) => (
    <div>
      <div className="wishListPage">
        <div className="wishListImg">
          <img src={prod.images[0].src} alt="" />
        </div>
        <div className="wishListInfo">
          <h3>{prod.productName}</h3>
          <h3>Rs. {prod.price}</h3>
          <button
            onClick={() =>
              dispatch({ type: REMOVE_FROM_WISHLIST, payload: prod })
            }
          >
            Remove From Wishlist
          </button>
        </div>
      </div>
      <hr style={{ width: "80%" }} />
    </div>
  ));
}

export default WishListPage;
