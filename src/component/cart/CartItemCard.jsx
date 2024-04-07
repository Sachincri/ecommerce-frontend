import React from "react";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../Redux/action/cart";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const CartItemCard = ({
  product,
  quantity,
  name,
  image,
  price,
  cuttedPrice,
  stock,
  discount,
}) => {
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item Remove");
  };
  return (
    <main className="cartItem">
      <div className="cartItem_sec_1">
        <div>
          <img src={image} alt="img" />
        </div>
        <div>
          <Link to={`/product/${product}`}>
            {name?.length > 60 ? `${name.substring(0, 60)}...` : name}
          </Link>
          <span>
            {` ₹${price}`}
            <span>{cuttedPrice}</span>
          </span>
          <span style={{ color: "green" }}>{discount} % off</span>
        </div>
      </div>

      <div className="cartItem_sec_2">
        <div>
          <button onClick={() => decreaseQuantity(product, quantity)}>-</button>
          <input readOnly type="number" value={quantity} />
          <button onClick={() => increaseQuantity(product, quantity, stock)}>
            +
          </button>{" "}
        </div>
        <p onClick={() => deleteCartItems(product)}>Remove</p>
      </div>
    </main>
  );
};

export default CartItemCard;
