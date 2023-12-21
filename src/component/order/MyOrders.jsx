import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrder } from "../../Redux/action/order";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import OrderCard from "./OrderCard";

const MyOrders = () => {

  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.orders);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(getMyOrder());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="myOrders">
          <h2>My Orders</h2>
          {orders &&
            orders
              .map((order) => {
                const { _id, orderStatus, orderItems } = order;

                return orderItems.map((item) => (
                  <OrderCard
                    {...item}
                    key={_id}
                    orderId={_id}
                    orderStatus={orderStatus}
                  />
                ));
              })
              .reverse()}
        </main>
      )}
    </>
  );
};

export default MyOrders;
