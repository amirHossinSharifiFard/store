import React, { useContext } from "react";
import { Link } from "react-router-dom";
import trashIcon from "../../assets/icons/trash.svg"

// functions
import { shortName, isInCart, quantityCount } from "../../helper/functions";

// context
import { CartContext } from "../../context/CounterContextProvider";

const Product = ({ productData }) => {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div>
      <img src={productData.image} alt='product' style={{ width: "200px" }} />
      <h3>{shortName(productData.title)}</h3>
      <p>{productData.price}</p>
      <div>
        <Link to={`/products/${productData.id}`}> details</Link>
        <div>
          {quantityCount(state, productData.id) === 1 && (
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: productData })
              }>
              <img src={trashIcon} alt="trash" style={{width:"20px"}}/>
            </button>
          )}
          {quantityCount(state, productData.id) > 1 && (
            <button
              onClick={() =>
                dispatch({ type: "DECREASE", payload: productData })
              }>
              -
            </button>
          )}

          {isInCart(state, productData.id) ? (
            <button
              onClick={() =>
                dispatch({ type: "INCREASE", payload: productData })
              }>
              +
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch({ type: "ADD_ITEM", payload: productData })
              }>
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
