import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";

const CartPrice = ({ cartItems }) => {
  const shippingCharges = cartItems.price > 2000 ? 40 : "Free";

  return (
    <div className="cart_price">
      <div>
      <h4>PRICE DETAILS</h4>
      <div>
        <p>Price ({cartItems.length} item)</p>
        <p>
          {cartItems
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toLocaleString()}
        </p>
      </div>
      <div>
        <p>Discount </p>
        <p style={{ color: "green" }}>
          -{" "}
          {cartItems
            .reduce(
              (sum, item) =>
                sum +
                item.cuttedPrice * item.quantity -
                item.price * item.quantity,
              0
            )
            .toLocaleString()}
        </p>
      </div>
      <div>
        <p>Delivery Charges</p>
        <p style={{ color: "green" }}>{shippingCharges}</p>
      </div>
      <span>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - -
      </span>
      <div>
        <p>Total Amount</p>
        <p>
          {cartItems
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toLocaleString()}
        </p>
      </div>
      <span>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - -
      </span>
      <p>
        {" "}
        You will save ₹
        {cartItems.reduce(
          (sum, item) =>
            sum +
            (item.cuttedPrice * item.quantity - item.price * item.quantity),
          0
        )}{" "}
        on this order
      </p>
      </div>
      <div><AiFillSafetyCertificate/>
        <p>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
      </div>
    </div>
  );
};

export default CartPrice;
