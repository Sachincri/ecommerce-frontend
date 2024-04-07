import React from "react";
import { Link } from "react-router-dom";

const OrderCard = (item) => {
  const { orderStatus, name, image, price, orderId } = item;
  return (
    <Link className="ordercard" to={`/orderdetails/${orderId}`}>
      <img src={image} alt={name} />
      <div>
        <p>{name.length > 40 ? `${name.substring(0, 40)}...` : name}</p>
        <span>{price}</span>
        <p>{orderStatus}</p>
      </div>
    </Link>
  );
};

export default OrderCard;
