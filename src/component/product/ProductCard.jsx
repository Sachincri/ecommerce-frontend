import React from "react";
import { Link } from "react-router-dom";
import { GrStar } from "react-icons/gr";
import { Rating } from "@mui/material";
import { IoMdHeart } from "react-icons/io";
import {
  addToWishList,
  recentlyViewedProduct,
} from "../../Redux/action/profile";
import { useDispatch } from "react-redux";

const ProductCard = ({
  _id,
  name,
  images,
  ratings,
  numOfReviews,
  reviews,
  price,
  cuttedPrice,
  highlights,
  discount
}) => {
  const dispatch = useDispatch();

  const comment = reviews?.filter((com) => com.comment !== "").length;
  const addToWish = (productId) => {
    dispatch(addToWishList(productId));
  };
  const recentlyViewed = (productId) => {
    dispatch(recentlyViewedProduct(productId));
  };
  return (
    <section className="card" onClick={() => recentlyViewed(_id)}>
      <div>
        <IoMdHeart onClick={() => addToWish(_id)} />
      </div>
      <Link className={"productCard"} to={`/product/${_id}`}>
        <div className="first">
          <img src={images && images[0]?.url} alt={name} />
        </div>

        <p className="mobile">
          {name.length > 20 ? `${name.substring(0, 16)}...` : name}
        </p>

        <div className="second">
          {" "}
          <p>{name.length > 60 ? `${name.substring(0, 60)}...` : name}</p>
          <div className="rating">
            <p>
              {ratings?.toFixed(1)} <GrStar />
            </p>
            <Rating
              className="star"
              readOnly
              value={ratings}
              size="small"
              precision={0.5}
              sx={{ color: "green" }}
            />
            <p>({numOfReviews})</p>
            <b>
              {numOfReviews} Ratings & {comment} Reviews
            </b>
          </div>
          <div>
            <ul>
              {highlights?.map((highlight, i) => (
                <li key={i}>
                  <p>{highlight}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="thard">
          <div>
            <h3>{`₹${price}`}</h3>
            <div>
              <p>{`₹${cuttedPrice}`}</p>
              <span>
                {discount}%&nbsp;<span>off</span>
              </span>
            </div>
          </div>
          <span>{price > 2000 ? "Free delivery" : ""}</span>
        </div>
      </Link>
    </section>
  );
};
export default ProductCard;
