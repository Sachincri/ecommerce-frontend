import React, { useEffect } from "react";
import CartPrice from "./CartPrice";
import Header from "../layout/Header";
import Img from "../../assets/cart.webp";
import CartItemCard from "./CartItemCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../Redux/action/product";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);



  const checkoutHandler = () => {
    if (shippingInfo.address !== undefined) {
      navigate("/OrderSummary");
    } else {
      navigate("/shipping");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <img src={Img} alt="" />
          <p>Your cart is empty!</p>
          <Link to="/">Shop now</Link>
        </div>
      ) : (
        <>
          <main className="cart">
            <section>
              <div className="cart_sec">
                <div className="cart_sec_1">
                  <span>FlipKart</span>
                  <p>Grocery</p>
                </div>

                <div className="cart_sec_2">
                  <div>
                    <p>Deliver to:</p>
                    <span>
                      {shippingInfo.city} - {shippingInfo.pinCode}
                    </span>
                  </div>
                  <Link to="/shipping">change</Link>
                </div>

                <div className="cart_sec_3">
                  {cartItems.map((item) => (
                    <div key={item.product}>
                      <CartItemCard
                        {...item}
                      />
                    </div>
                  ))}
                </div>
                <div className="cart_sec_4">
                  <button onClick={checkoutHandler}>Place Order</button>
                </div>
              </div>
              <aside>
                <CartPrice cartItems={cartItems} />
              </aside>
            </section>
            <section>
              <button onClick={checkoutHandler}>Place Order</button>
              <div>
                <p>Policies: Returns Policy</p> <span>|</span>
                <p>Terms of use</p>
                <span>|</span>
                <p>Security</p>
                <span>|</span>
                <p>Privacy</p>
                <span>|</span>
                <p>Infringement</p>
                <span>© 2007-2024 Flipkart.com</span>
              </div>
              <div>
                <p>Need help? Visit the Help Center or Contact Us </p>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Cart;
