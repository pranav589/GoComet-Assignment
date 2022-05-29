import React, { useContext, useEffect, useState } from "react";
import {
  CHANGE_CART_QTY,
  FILTER_SEARCH,
  REMOVE_FROM_CART,
} from "../../actions/productActions";
import { ProductsContext } from "../../context/productContext";
import "./Header.css";
import ReactModal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ProductsContext);
  const [isOpen, setIsOpen] = useState(false);
  const { wishList, cart } = state;

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.prod.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="header">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Myntra_logo.png"
            alt="logo"
            width="40px"
          />
        </div>
        <div className="tabs">
          <div className="tab" onClick={() => navigate("/")}>
            Men
          </div>
          <div className="tab" onClick={() => navigate("/")}>
            Women
          </div>
          <div className="tab" onClick={() => navigate("/")}>
            Kids
          </div>
          <div className="tab" onClick={() => navigate("/")}>
            Home & Living
          </div>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => {
              dispatch({
                type: FILTER_SEARCH,
                payload: e.target.value,
              });
            }}
          />
        </div>
        <ReactModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <>
            {cart.length === 0 ? (
              <h1>No Products in the cart</h1>
            ) : (
              cart?.map((product, index) => (
                <div className="modal" key={index}>
                  <img src={product.prod.images[0].src} alt="" />
                  <div className="modalInfo">
                    <p className="modalInfoName">{product.prod.productName}</p>
                    <p className="modalAddInfo">
                      {product.prod.additionalInfo} | Size- {product.size}
                    </p>

                    <div className="qty">
                      <select
                        value={product.qty}
                        onChange={(e) =>
                          dispatch({
                            type: CHANGE_CART_QTY,
                            payload: {
                              id: product.prod.buyButtonWinnerSkuId,
                              qty: e.target.value,
                            },
                          })
                        }
                      >
                        {[1, 2, 3, 4, 5].map((x) => (
                          <option value={x} key={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="modalPrice">Rs. {product.prod.price}</div>

                    <button
                      onClick={() =>
                        dispatch({
                          type: REMOVE_FROM_CART,
                          payload: product.prod,
                        })
                      }
                      className="addToCart"
                    >
                      Remove From cart
                    </button>
                  </div>
                </div>
              ))
            )}
            <h3>Total: Rs. {total}</h3>
          </>
        </ReactModal>

        <div className="tabs1">
          <div className="tab1">
            <p>Profile</p>
          </div>
          <div className="tab1" onClick={() => navigate("/wishlist")}>
            <p>{wishList.length} Wishlist</p>
          </div>
          <div className="tab1" onClick={() => setIsOpen(true)}>
            <p>{cart.length} Bag</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
