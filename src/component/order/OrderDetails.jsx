import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../../Redux/action/order";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import TrackStepper from "../order/TrackStepper";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="orderDetailsPage">
          <h3>Order ID - {order._id}</h3>
            <section className="order_item" >
              <h2>Order Item</h2>
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <p>
                      <Link to={`/product/${item.product}`}>
                        {item.name.length > 70
                          ? `${item.name.substring(0, 70)}...`
                          : item.name}
                      </Link>
                      <span>₹{item.price}</span>
                    </p>
                    <img src={item.image} alt="Product" />
                  </div>
                ))}
            </section>
            <section className="order_status">
              <h2>Order Status</h2>
              <div>
                <TrackStepper
                  orderOn={order.createdAt}
                  processingAt={order.processingAt}
                  shippedAt={order.shippedAt}
                  deliveredAt={order.deliveredAt}
                  activeStep={
                    order.orderStatus === "Delivered"
                      ? 3
                      : order.orderStatus === "Shipped"
                      ? 2
                      : order.orderStatus === "Processing"
                      ? 1
                      : 0
                  }
                />
              </div>
            </section>

          <section className="shipping_info">
            <h2>Shipping Info</h2>
            <div>
              <div>
                <p>Name :</p>
                <span>{order.user && order.user.name}</span>
              </div>
              <div>
                <p>Phone : </p>
                <span> {order.shippingInfo && order.shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address :</p>
                <span>
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                </span>
              </div>
            </div>
          </section>
          <section className="order_summery">
            <h2>Order Summery</h2>
            <p>
              <div>
                <p>Subtotal</p>
                <span>₹{order.itemsPrice}</span>
              </div>
              <div>
                <p>Shipping Charges</p>
                <span>₹{order.shippingCharges}</span>
              </div>
              <div>
                <b>Total</b>

                <span>₹{order.totalAmount}</span>
              </div>
            </p>
          </section>
          <section className="payment">
            <p>Payment Method </p>
            <p>{order.paymentMethod}</p>
          </section>
        </main>
      )}
    </>
  );
};

export default OrderDetails;
