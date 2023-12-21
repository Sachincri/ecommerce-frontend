import React from "react";
import Gif from '../../assets/gif1.gif'
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <img src={Gif} alt="" />

      <h2>Your Order has been Placed successfully </h2>
      <Link to="/myorder">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;