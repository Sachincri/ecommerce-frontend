import React from "react";
import { Link } from "react-router-dom";
import { getDiscount } from "../product/ProductDetails";
const CartItemCard = ({
  item,
  deleteCartItems,
  decreaseQuantity,
  increaseQuantity,
}) => {
  return (
    <main className="cartItem">
      <div>
        <img src={item.image} alt="img" />

        <div>
          <Link to={`/product/${item.product}`}>
            {item.name.length > 60
              ? `${item.name.substring(0, 60)}...`
              : item.name}
          </Link>
          <span>{` ₹${item.price}`}<span>{item.cuttedPrice}</span></span>
          <span style={{color:"green"}}>{getDiscount(item.price,item.cuttedPrice)} % off</span>
        </div>
      </div>

      <div>
        <article>
          <button onClick={decreaseQuantity}>-</button>
          <input readOnly type="number" value={item.quantity} />
          <button onClick={increaseQuantity}>+</button>{" "}
        </article>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </main>
  );
};

export default CartItemCard;
