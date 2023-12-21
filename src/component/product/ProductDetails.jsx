import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import ReviewCard from "./ReviewCard";
import { Rating } from "@mui/material";
import Loader from "../layout/Loader";
import ProductCard from "./ProductCard";
import { MdLocalOffer } from "react-icons/md";
import { getRandomProducts } from "../home/Home";
import ReactImageMagnify from "react-image-magnify";
import { DialogTitle } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../Redux/action/cart";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "../admin/Product/CreateNewProduct";
import { newReview } from "../../Redux/action/productAction";
import { getSimilarProducts } from "../../Redux/action/productAction";
import { getProductDetails } from "../../Redux/action/productAction";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
export const getDiscount = (price, cuttedPrice) => {
  return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
};

const ProductDetails = () => {
  const { products, product, error, message, loading } = useSelector(
    (state) => state.product
  );

  const reviews = product.reviews?.filter((com) => com.comment !== "");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [img, setImg] = useState(product.images && product.images[0]);

  const [viewAll, setViewAll] = useState({ reviews: false, offers: false });
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = params.id;

  const hoverHandler = (image, i) => {
    setImg(image.url);
    refs.current[i]?.classList.add("active");
    for (let j = 0; j < product.images.length; j++) {
      if (i !== j) {
        refs.current[j]?.classList.remove("active");
      }
    }
  };
  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
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
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error, message]);

  const addToCartHandler = () => {
    setQuantity(quantity);
    dispatch(addToCart(params.id, quantity));
    toast.success("Item Added To Cart");
  };

  const buyNow = () => {
    dispatch(addToCart(params.id, quantity));
    navigate("/shipping");
  };
  useEffect(() => {
    if (product.images && product.images[0]) {
      setImg(product.images[0].url);
    }
    dispatch(getSimilarProducts(product.category));
  }, [dispatch, product, product.category, product.images]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mininav">
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <Link to={`/products?category=${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          <main className="productdetail">
            <section>
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
                        <img src={image.url} alt={image.neme} />
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
                          width: 1600,
                          height: 1800,
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
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={buyNow}
                  >
                    Buy now
                  </button>
                </div>
              </section>
              <section>
                {/* Product Details section */}

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
                      {/* {product.discount} */}
                      {getDiscount(product.price, product.cuttedPrice)}%&nbsp;
                      <p>off</p>
                    </span>
                  </div>
                </div>

                <div className="sec2">
                  {" "}
                  <div className="offers">
                    <h4>Available offers</h4>

                    {viewAll.offers
                      ? product.offers?.map((off, i) => (
                          <div key={i}>
                            <MdLocalOffer />
                            <span>{off}</span>
                          </div>
                        ))
                      : product.offers?.slice(-4).map((off, i) => (
                          <div key={i}>
                            <MdLocalOffer />
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
                    <div>
                      <h5>Warranty</h5>
                      <p> {product.warranty}</p>
                    </div>
                  </div>
                  <div className="description">
                    <div>
                      <h5>Description</h5>
                      <article>{product.description}</article>
                    </div>
                  </div>
                </div>

                {/* Product Details section */}

                {/* Reviews section */}

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
                        required
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

                {/* Reviews section */}
              </section>
              <div className="mobileView">
                <button
                  disabled={product.Stock < 1 ? true : false}
                  onClick={buyNow}
                >
                  Buynow
                </button>
                <button
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  AddToCart
                </button>
              </div>
            </section>
            <section className="similarProduct">
              <h1>Similar products</h1>
              <div>
                {products&&getRandomProducts(products, 10)?.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;
