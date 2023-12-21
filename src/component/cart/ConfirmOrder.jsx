import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = itemsPrice > 2000 ? 0 : 40;

  const tax = itemsPrice * 0.18;

  const totalPrice = itemsPrice + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      itemsPrice,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <CheckoutSteps activeStep={1} />
      <main className="confirmOrderPage">
        <section>
          <h2>Shipping Info</h2>
          <div>
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{address}</span>
            </div>
          </div>
        </section>
        {/*  */}
        <section>
          <h2>Your Cart Items</h2>
          <div>
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <div>
                    <Link to={`/product/${item.product}`}>
                      {item.name.length > 60
                        ? `${item.name.substring(0, 60)}...`
                        : item.name}
                    </Link>{" "}
                    <span>
                      Qty {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>
        <section>
          <h2>Order Summery</h2>
          <div>
            <div>
              <p>Subtotal</p>
              <span>₹{itemsPrice}</span>
            </div>
            <div>
              <p>Shipping Charges</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div>
              <p>
                <b>Total</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </section>
        <div>
          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </main>
    </>
  );
};

export default ConfirmOrder;
