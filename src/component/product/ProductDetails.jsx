import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Header from "../layout/Header";
import ReviewCard from "./ReviewCard";
import { Rating } from "@mui/material";
import Loader from "../layout/Loader";
import { DialogTitle } from "@mui/material";
import { IoMdFlash } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import CategoryNav from "../layout/CategoryNav";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../Redux/action/cart";
import ReactImageMagnify from "react-image-magnify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRecentlyViewed, newReview } from "../../Redux/action/product";
import RandomProductsSlider from "../home/RandomProductsSlider";
import { getSimilarProducts } from "../../Redux/action/product";
import { getProductDetails } from "../../Redux/action/product";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import RecentlyView from "../home/RecentlyView";

export const getDiscount = (price, cuttedPrice) => {
  return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
};

const ProductDetails = () => {
  const { products, product, error, message, loading, recentlyViewed } =
    useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const refs = useRef([]);

  const [img, setImg] = useState(product.images && product.images[0]);
  const [viewAll, setViewAll] = useState({ reviews: false, offers: false });
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const reviews = product.reviews?.filter((com) => com.comment !== "");

  const productId = params.id;

  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  const hoverHandler = (image, i) => {
    setImg(image.url);
    refs.current[i]?.classList.add("active");
    for (let j = 0; j < product.images.length; j++) {
      if (i !== j) {
        refs.current[j]?.classList.remove("active");
      }
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", productId);
    dispatch(newReview(formData));
    setOpen(false);
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

    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error, message]);

  const addToCartHandler = () => {
    dispatch(addToCart(params.id));
    toast.success("Item Added To Cart");
    navigate("/cart");
  };

  const buyNow = () => {
    dispatch(addToCart(params.id));
    navigate("/shipping");
  };
  useEffect(() => {
    if (product.images) {
      setImg(product.images[0].url);
    }
    if (user) {
      dispatch(getRecentlyViewed());
    }
    dispatch(getSimilarProducts(product.category));
  }, [dispatch, product, product.category, product.images, user]);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <main className="productdetail">
          <CategoryNav />
          <section className="detailsec">
            <section>
              <div className="left">
                <div className="left_1">
                  {product.images?.map((image, i) => (
                    <div
                      className={i === 0 ? "img_wrap active" : "img_wrap"}
                      key={i}
                      onMouseOver={() => hoverHandler(image, i)}
                      ref={addRefs}
                    >
                      <img src={image.url} alt={image.name} />
                    </div>
                  ))}
                </div>
                <div className="left_2">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "img",
                        isFluidWidth: true,
                        src: img,
                      },
                      largeImage: {
                        src: img,
                        width: 1500,
                        height: 1700,
                      },
                      enlargedImageContainerDimensions: {
                        width: 810,
                        height: 480,
                      },
                      imageClassName: "small",

                      enlargedImageContainerStyle: {
                        top: "50%",
                        left: "50%",
                        borderRadius: "4px",
                        transform: "translate(27%, -45%)",
                        boxShadow: "0 4px 20px 2px rgba(0,0,0,.2)",
                      },
                      shouldUsePositiveSpaceLens: true,
                    }}
                  />
                </div>
              </div>

              <div className="button">
                <div>
                  <FaShoppingCart />
                  <p
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </p>
                </div>
                <div>
                  <IoMdFlash />
                  <p
                    disabled={product.Stock < 1 ? true : false}
                    onClick={buyNow}
                  >
                    Buy now
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h3>{product.name}</h3>

              <div className="sec1">
                <div>
                  <p>
                    {product.ratings && product.ratings.toFixed(1)}
                    <AiFillStar />{" "}
                  </p>
                  <span>
                    {" "}
                    {product.numOfReviews} Ratings & {reviews?.length} Reviews
                  </span>
                </div>
                <div>
                  <h1>₹{product.price}</h1>
                  <p>₹{product.cuttedPrice}</p>
                  <span>
                    {product.discount} %&nbsp;
                    <p>off</p>
                  </span>
                </div>
              </div>

              <div className="sec2">
                <div className="offers">
                  <h4>Available offers</h4>

                  {viewAll.offers
                    ? product.offers?.map((off, i) => (
                        <div key={i}>
                          <p>
                            <MdLocalOffer />
                          </p>
                          <span>{off}</span>
                        </div>
                      ))
                    : product.offers?.slice(-4).map((off, i) => (
                        <div key={i}>
                          <p>
                            <MdLocalOffer />
                          </p>
                          <span>{off}</span>
                        </div>
                      ))}
                  {product.offers?.length > 4 && (
                    <span
                      onClick={() =>
                        setViewAll((prev) => ({
                          ...prev,
                          offers: !prev.offers,
                        }))
                      }
                    >
                      {viewAll.offers
                        ? "Close"
                        : ` All ${product.offers?.length} offers`}
                    </span>
                  )}
                </div>
                <div className="highlights">
                  <div>
                    <h5>Highlights</h5>

                    <ul>
                      {product.highlights?.map((highlight, i) => (
                        <li key={i}>
                          <p>{highlight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="warranty">
                  {product.warranty && (
                    <div>
                      <h5>Warranty</h5>
                      <p> {product.warranty}</p>
                    </div>
                  )}
                </div>
                <div className="description">
                  <div>
                    <h5>Description</h5>
                    <article>{product.description}</article>
                  </div>
                </div>
              </div>

              <section className="reviews">
                <div>
                  <h1>Reating & Reviews</h1>
                  <button onClick={submitReviewToggle}>Rate Product</button>
                </div>
                <Dialog open={open} onClose={submitReviewToggle}>
                  <DialogTitle>Submit Review</DialogTitle>
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    style={{ marginLeft: "1.5rem" }}
                  />
                  <DialogContent>
                    <textarea
                      cols="30"
                      rows="5"
                      value={comment}
                      min="15"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
                {reviews?.length < 1 ? (
                  <div>
                    <p>No reviews</p>
                  </div>
                ) : (
                  <div>
                    {viewAll.reviews
                      ? reviews
                          ?.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                          ))
                          .reverse()
                      : reviews
                          ?.slice(-2)
                          .map((review) => (
                            <ReviewCard key={review._id} review={review} />
                          ))
                          .reverse()}
                    <p>
                      {reviews?.length > 2 && (
                        <span
                          onClick={() =>
                            setViewAll((prev) => ({
                              ...prev,
                              reviews: !viewAll.reviews,
                            }))
                          }
                        >
                          {viewAll.reviews
                            ? "Close"
                            : ` All ${reviews.length} reviews`}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </section>
            </section>
            <div className="mobileView">
              <button
                disabled={product.Stock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                AddToCart
              </button>
              <button
                disabled={product.Stock < 1 ? true : false}
                onClick={buyNow}
              >
                Buynow
              </button>
            </div>
          </section>
          <section className="similarProduct">
            <div>
              <RandomProductsSlider
                title={"Similar products"}
                productsArray={products}
              />
            </div>

            <div>
              {user && recentlyViewed && (
                <RecentlyView recentlyViewed={recentlyViewed} />
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ProductDetails;
