import React, { useContext, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./ProductDetailsPage.css";
import { useLocation } from "react-router-dom";
import { ProductsContext } from "../../context/productContext";
import { ADD_TO_CART } from "../../actions/productActions";
import ReactModal from "../../components/Modal/Modal";

function ProductDetailsPage() {
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState(null);
  const {
    productName,
    images,
    price,
    inventoryInfo,
    brand,
    gender,
    rating,
    buyButtonWinnerSkuId,
  } = location.state;

  const { state, dispatch } = useContext(ProductsContext);
  const { cart } = state;
  const [img, setImg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCart = () => {
    selectedSize === null ? alert("Please select a size.") : handleAddToCart();
  };

  const handleAddToCart = () => {
    alert("Product added to the bag!");
    dispatch({
      type: ADD_TO_CART,
      payload: {
        prod: location.state,
        size: selectedSize,
      },
    });
  };

  return (
    <div className="productDetailsPage">
      <div className="detailImages">
        {images.map((image, index) => (
          <img
            src={image.src}
            alt=""
            key={index}
            onClick={() => {
              setImg(image.src);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      <div className="detailInfo">
        <h2>{productName}</h2>
        <h3 style={{ display: "flex" }}>
          {brand} | {gender} | Rating- {rating.toFixed(2)}
        </h3>
        <hr />
        <p className="price">Rs {price}</p>
        <p className="others">Inclusive of all taxes</p>
        <div className="sizes">
          <p>Select Sizes</p>
          <div className="sizeSelect">
            {inventoryInfo.map((si, index) => (
              <p
                key={index}
                style={{
                  borderColor: selectedSize === si.label ? "red" : "#7e818c",
                }}
                onClick={() => setSelectedSize(si.label)}
              >
                {si.label}
              </p>
            ))}
          </div>
        </div>
        <div className="addToCart">
          {cart.some(
            (p) => p.prod.buyButtonWinnerSkuId === buyButtonWinnerSkuId
          ) ? (
            <button>Already added to the cart</button>
          ) : (
            <button onClick={() => handleCart()}>Add to cart</button>
          )}
        </div>
      </div>

      <ReactModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Zoom>
          <img src={img} alt="product" />
        </Zoom>
      </ReactModal>
    </div>
  );
}

export default ProductDetailsPage;
