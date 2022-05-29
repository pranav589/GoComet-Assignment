import React, { useContext, useState } from "react";
import "./Product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ProductsContext } from "../../context/productContext";
import {
  ADD_TO_WISHLIST,
  GET_SIMILAR_PRODUCTS,
  REMOVE_FROM_WISHLIST,
} from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import ReactModal from "../Modal/Modal";

function Product({ item }) {
  const { state, dispatch } = useContext(ProductsContext);
  const {
    productName,
    price,
    sizes,
    brand,
    images,
    gender,
    buyButtonWinnerSkuId,
  } = item;
  const { wishList, similarProducts } = state;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="product">
      <div
        className="image"
        onClick={() => navigate(`/${buyButtonWinnerSkuId}`, { state: item })}
      >
        {/* <img src={images[0].src} alt="" /> */}
        <Carousel autoPlay stopOnHover showThumbs={false}>
          {images.map((img, index) => (
            <img src={img.src} alt="" key={index} />
          ))}
        </Carousel>
      </div>
      <div className="wishlistBtn">
        {wishList.some(
          (p) => p.buyButtonWinnerSkuId === item.buyButtonWinnerSkuId
        ) ? (
          <button
            onClick={() =>
              dispatch({
                type: REMOVE_FROM_WISHLIST,
                payload: item,
              })
            }
          >
            <AiFillHeart />
            Remove from Wishlist
          </button>
        ) : (
          <button
            onClick={() =>
              dispatch({
                type: ADD_TO_WISHLIST,
                payload: item,
              })
            }
          >
            <AiOutlineHeart />
            Add to Wishlist
          </button>
        )}
      </div>
      <div className="info">
        <button
          onClick={() => {
            setIsOpen(true);
            dispatch({
              type: GET_SIMILAR_PRODUCTS,
              payload: {
                id: item.productId,
                info: item.additionalInfo,
              },
            });
          }}
        >
          Show Similar Product
        </button>
        <h2 className="title">{productName}</h2>

        <h3 className="price">Price: {price}</h3>
        <h4 className="size">Size: {sizes}</h4>

        <h4 className="brand">Brand: {brand}</h4>

        <h4 className="ideal_for">Ideal for:{gender}</h4>
      </div>
      <ReactModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="similarContainer">
          {similarProducts.length === 0 ? (
            <h2>No Similar Products Found.</h2>
          ) : (
            similarProducts.slice(0, 4)?.map((prod) => (
              <div
                className="similar"
                onClick={() =>
                  navigate(`/${buyButtonWinnerSkuId}`, { state: item })
                }
              >
                <img src={prod.images[0].src} alt="" />
                <p>{prod.productName}</p>
              </div>
            ))
          )}
        </div>
      </ReactModal>
    </div>
  );
}

export default Product;
