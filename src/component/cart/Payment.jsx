import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { server } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, paymentVerification } from "../../Redux/action/order";

const Payment = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);
  const { message, error } = useSelector((state) => state.order);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true);

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    if (paymentMethod === "COD") {
      dispatch(
        createOrder(
          shippingInfo,
          cartItems,
          paymentMethod,
          orderInfo.itemsPrice,
          orderInfo.shippingCharges,
          orderInfo.totalPrice
        )
      );
    } else {
      const {
        data: { key },
      } = await axios.get(`${server}/razorpaykey`);

      const {
        data: { order, orderOptions },
      } = await axios.post(
        `${server}/createorderonline`,
        {
          shippingInfo,
          paymentMethod,
          orderItems: cartItems,
          itemsPrice: orderInfo.itemsPrice,
          shippingCharges: orderInfo.shippingCharges,
          totalAmount: orderInfo.totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: user.name,
        description: "",
        order_id: order.id,

        handler: function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          dispatch(
            paymentVerification(
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOptions
            )
          );
        },

        theme: { color: "#2874f0" },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch({ type: "emptyState" });
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
      setDisableBtn(false);
    }
  }, [dispatch, message, error, navigate]);
  return (
    <>
      <CheckoutSteps activeStep={3} />
      <main className="confirmOrder">
        <h1>PAYMENT</h1>

        <form onSubmit={submitHandler}>
          <div>
            <label>Cash On Delivery</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPaymentMethod("COD")}
              required
            />
          </div>
          <div>
            <label>Online</label>
            <input
              type="radio"
              required
              name="payment"
              onChange={() => setPaymentMethod("Online")}
            />
          </div>

          <div className="button">
            <button disabled={disableBtn} type="submit">
              Place Order
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Payment;
