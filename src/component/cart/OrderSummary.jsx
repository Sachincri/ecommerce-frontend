import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import CartPrice from "./CartPrice";
import Header from "../layout/Header";
import CartItemCard from "./CartItemCard";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [activeStep, setActiveStep] = useState(1);



  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = itemsPrice > 2000 ? 0 : 40;


  const totalPrice = itemsPrice + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      itemsPrice,
      shippingCharges,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };
    const handleStepChange = (step) => {
    setActiveStep(step);
    const data = {
      itemsPrice,
      shippingCharges,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <CheckoutSteps activeStep={1} />
      <main className="order_summary">
        <section className="order_summary_1">
          <section>
            <section className="order_summary_login">
              <div>
                <div>
                  <p>1</p>
                  <h4>LOGIN</h4>
                </div>
                <Link>CHANGE</Link>
              </div>
              <div>
                <p>{user.name}</p>
                <p>customer</p> <span>+91 {shippingInfo.phoneNo}</span>
              </div>
            </section>
            <section className="order_summary_shipping">
              <div className={activeStep === 1 ? "steps" : "tab_head"}>
                <p>2</p>
                <h4>DELIVERY ADDRESS</h4>
              </div>
              {activeStep === 1 && (
                <div>
                  <div>
                    <div>
                      <span>{user.name}</span>
                      <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div>{address}</div>
                  </div>
                  <button onClick={() => handleStepChange(2)}>
                    DELIVER HERE
                  </button>
                </div>
              )}
            </section>
            <section className="order_summary_order_item">
              <div className={activeStep === 2 ? "steps" : "tab_head"}>
                <p>3</p> <h4>ORDER SUMMARY</h4>
              </div>

              {activeStep === 2 && (
                <div>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item}>
                        <CartItemCard {...item} />
                      </div>
                    ))}
                  <div className="next_button">
                    <button onClick={() => handleStepChange(3)}>
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </section>
            <section className="order_summary_mob_view">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item}>
                    <CartItemCard {...item} />
                  </div>
                ))}
            </section>
            <section className="order_summary_payment">
              <div className={activeStep === 3 ? "steps" : "tab_head"}>
                <p>4</p>
                <h4>PAYMENT OPTION</h4>
              </div>
              {activeStep === 3 && (
                <div className="payment_s2">
                  <Payment />
                </div>
              )}
            </section>
          </section>
          <aside>
            <CartPrice cartItems={cartItems} />
          </aside>
        </section>
        <section className="order_summary_2">
          <button onClick={proceedToPayment}>Continue</button>{" "}
          <div>
            <p>Policies:Returns Policy</p> <span>|</span>
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
  );
};

export default OrderSummary;
