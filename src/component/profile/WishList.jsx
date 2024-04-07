import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { GrStar } from "react-icons/gr";
import { addToWishList } from "../../Redux/action/profile";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";

const WishList = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.profile);

  const addToWish = (productId) => {
    dispatch(addToWishList(productId));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

    window.scrollTo(0, 0);
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="wishist">
          <h2>WishList</h2>
          {user.wishList.length === 0 ? (
            <div>
              <p>No Product found</p>
            </div>
          ) : (
            <div className="wishlist_sec_1">
              {user.wishList?.map((wish) => (
                <div className="wishist_card" key={wish._id}>
                  <div>
                    <IoMdHeart onClick={() => addToWish(wish.product)} />
                  </div>
                  <Link to={`/product/${wish.product}`}>
                    <div className="wishist_1">
                      <img src={wish.image} alt={wish.name} />
                    </div>

                    <div className="wishist_2">
                      <p>
                        {wish.name.length > 60
                          ? `${wish.name.substring(0, 60)}...`
                          : wish.name}
                      </p>
                      <div>
                        <p>
                          {wish.rating} <GrStar />
                        </p>
                        <p>({wish.numOfReviews})</p>
                      </div>
                    </div>
                    <div className="wishist_3">
                      <div>
                        <h3>{`₹${wish.price}`}</h3>
                        <div>
                          <p>{`₹${wish.cuttedPrice}`}</p>
                          <span>
                            {wish.discount}%&nbsp;
                            <span>off</span>
                          </span>
                        </div>
                      </div>
                      <span>{wish.price > 2000 ? "Free delivery" : ""}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WishList;
