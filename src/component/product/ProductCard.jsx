import React from "react";
import { getDiscount } from "./ProductDetails";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({
  _id,
  name,
  images,
  ratings,
  numOfReviews,
  price,
  cuttedPrice,
}) => {

  return (
    <Link className="productCard" to={`/product/${_id}`}>
      <div>
        <img src={images && images[0]?.url} alt={name} />
      </div>
      <section>
        <p>{name.length > 60 ? `${name.substring(0, 60)}...` : name}</p>
        <div>
          <span>
            {ratings.toFixed(1)} <AiFillStar />
          </span>
          <p>
            ({numOfReviews})
          </p>
        </div>
        <div>
          <h3>{`₹${price}`}</h3>
          <p>{`₹${cuttedPrice}`}</p>
          <span>
            {getDiscount(price, cuttedPrice)}%&nbsp;<span>off</span>
          </span>
        </div>
        <span>{price > 2000 ? "Free delivery" : ""}</span>
      </section>
    </Link>
  );
};
export default ProductCard;
