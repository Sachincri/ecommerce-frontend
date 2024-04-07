import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrder } from "../../Redux/action/order";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import OrderCard from "./OrderCard";
import CategoryNav from "../layout/CategoryNav";
import Header from "../layout/Header";

const MyOrders = () => {
  const { orders, loading, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [orderStatus, setorderStatus] = useState("");

  const handleCheckboxChange = (value, e) => {
    if (e.target.value) {
      setorderStatus(value);
    } else {
      setorderStatus(null);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(getMyOrder(search, orderStatus));
  }, [dispatch, search, orderStatus, error]);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <CategoryNav />
          <main className="myOrders">
            <section className="filters_sec">
              <div className="filter_head">
                <h1>Filters</h1>{" "}
              </div>

              <div className="check_filter">
                <div>
                  <h5>ORDER STATUS</h5>
                </div>

                <div>
                  <div>
                    {["Delivered", "Cancelled", "Retuned"].map((el, i) => (
                      <div key={i}>
                        <input
                          type="checkbox"
                          checked={orderStatus === el}
                          onChange={(e) => handleCheckboxChange(el, e)}
                        />
                        <span>{el}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="check_filter">
                <div>
                  <h5>ORDER TIME </h5>
                </div>

                <div>
                  <div>
                    {[2022, 2023, 2024].map((el, i) => (
                      <div key={i}>
                        <input type="checkbox" />
                        <span>{el}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div>
                <input
                  type="text"
                  placeholder="Search your orders here"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />{" "}
                <button>search</button>
              </div>
              {orders
                .flatMap((order) => {
                  const { _id, orderStatus, orderItems } = order;

                  return orderItems.flatMap((item) => (
                    <div key={_id}>
                      <OrderCard
                        {...item}
                        orderId={_id}
                        orderStatus={orderStatus}
                      />
                    </div>
                  ));
                })
                .reverse()}
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default MyOrders;
