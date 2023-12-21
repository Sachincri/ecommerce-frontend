import React from "react";
import { AiFillStar } from "react-icons/ai";
const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <p>
        <span>
          {review.rating}
          <AiFillStar />
        </span>
        {review.name}{" "}
      </p>
      <article>{review.comment}</article>
    </div>
  );
};

export default ReviewCard;
