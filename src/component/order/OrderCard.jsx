import { Rating } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { newReview } from "../../Redux/action/productAction";

const OrderCard = (item) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const ratingSubmitHandler = () => {
    dispatch(newReview(rating));
  };
  const { orderStatus, name, image, price, orderId } = item;
  return (
    // <div>
      <Link className="ordercard" to={`/orderdetails/${orderId}`}>
        <img src={image} alt={name} />
        <div>
          <p>{orderStatus}</p>
          <p>{name.length > 60 ? `${name.substring(0, 60)}...` : name}</p>
          <span>{price}</span>
        </div>
      </Link>
      // {/* <form onClick={ratingSubmitHandler}>
      //   {" "}
      //   <Rating
      //     onChange={(e) => setRating(e.target.value)}
      //     value={rating}
      //     style={{ marginLeft: "1.5rem" }}
      //   />    
      // </form> */}
    // </div>
  );
};

export default OrderCard;
