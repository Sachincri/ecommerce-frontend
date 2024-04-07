import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Loader from "../layout/Loader";
import ProductCard from "./ProductCard";
import Slider from "@mui/material/Slider";
import { Box, Stack } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { VscSettings } from "react-icons/vsc";
import Pagination from "@mui/material/Pagination";
import { RiListSettingsFill } from "react-icons/ri";
// import NoProducts from "../../assets/noproducts.png";
import { useDispatch, useSelector } from "react-redux";
import { GrFormPreviousLink, GrStar } from "react-icons/gr";
import { Link, useLocation, useParams } from "react-router-dom";
import { getAllProducts } from "../../Redux/action/product";
import { MdExpandMore, MdExpandLess, MdPercent } from "react-icons/md";
import { categories } from "../layout/CategoryNav";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
} from "@mui/material";
import { addToWishList, removeToWishList } from "../../Redux/action/profile";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { products, loading, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.product);
  const { error, message } = useSelector((state) => state.profile);

  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [ratingsToggle, setRatingsToggle] = useState(true);
  const [disToggle, setDisToggle] = useState(false);
  const [priceToggle, setPriceToggle] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const priceHandler = (e, newPrice) => {
    e.preventDefault();
    setPrice(newPrice);
  };

  const clearAllFilters = () => {
    setPrice([0, 250000]);
    setRatings(0);
    setDiscount(0);
  };
  const clearPriceFilters = () => {
    setPrice([0, 250000]);
  };
  const clearRatingFilters = () => {
    setRatings(0);
  };
  const clearDiscountFilters = () => {
    setDiscount(0);
  };
  const handleCheckboxChange = (value, event) => {
    if (event.target.checked) {
      setRatings(value);
    } else {
      setRatings(0);
    }
  };
  const handleCheckboxPrice = (value, event) => {
    if (event.target.checked) {
      setPrice(value);
    } else {
      setPrice([0, 250000]);
    }
  };

  const handleCheckboxChangeDis = (value, event) => {
    if (event.target.checked) {
      setDiscount(value);
    } else {
      setDiscount(0);
    }
  };
  const handleTabChange = (e, newValue) => {
    e.preventDefault();
    setActiveTab(newValue);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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

  useEffect(() => {
    if (window.innerWidth < 600) {
      setPriceToggle(false);
      setRatingsToggle(false);
    }

    dispatch(
      getAllProducts(
        params.keyword,
        currentPage,
        price,
        category,
        ratings,
        discount
      )
    );
    window.scrollTo(0, 0);
  }, [
    dispatch,
    params.keyword,
    currentPage,
    price,
    category,
    ratings,
    discount,
    error,
  ]);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <main className="productPage">
          <nav className="category_nav">
            {categories.map((c, i) => (
              <section className="dropdown" key={i}>
                <p className="dropbtn">{c.name}</p>
                <div className="dropdown-content">
                  {c.arr &&
                    c.arr.map((category, index) => (
                      <Link onClick={() => setCategory(category)} key={index}>
                        {category}
                      </Link>
                    ))}
                </div>
              </section>
            ))}
          </nav>
          {products?.length === 0 ? (
            <div className="p_not_found">
              <img
                draggable="false"
                src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
                alt="Not Found"
              />
              <h1>Sorry, no results found!</h1>
              <p>
                Please check the spelling or try searching for something else
              </p>
            </div>
          ) : (
            <section>
              <div className="mobile">
                <div>
                  <span>
                    <RiListSettingsFill /> Short
                  </span>
                  <span onClick={handleDialogOpen}>
                    <VscSettings /> Filters
                  </span>
                </div>

                <Dialog
                  open={isDialogOpen}
                  onClose={handleDialogClose}
                  fullScreen
                  sx={{ ml: 0, p: 0 }}
                >
                  <Box sx={{ display: "flex" }}>
                    <DialogTitle sx={{ ml: -2, fontSize: 25 }}>
                      <GrFormPreviousLink onClick={handleDialogClose} />
                    </DialogTitle>
                    <DialogTitle sx={{ ml: -4 }}>Filters</DialogTitle>
                    <DialogTitle
                      sx={{ ml: 15, fontSize: 15 }}
                      onClick={() => clearAllFilters()}
                    >
                      clear filter
                    </DialogTitle>
                  </Box>
                  <DialogContent>
                    <Box sx={{ mt: -1, display: "flex" }}>
                      <Box sx={{ ml: -3, width: 100 }}>
                        <Tabs
                          value={activeTab}
                          onChange={handleTabChange}
                          orientation="vertical"
                          variant="scrollable"
                          sx={{ bgcolor: "#e9eaf0" }}
                        >
                          <Tab label="Price" />
                          <Tab label="CUSTOMER RATINGS" />
                          <Tab label="DISCOUNT" />
                        </Tabs>
                      </Box>{" "}
                      <Box
                        sx={{
                          ml: 5,
                          mt: -2,
                          minWidth: 200,
                        }}
                      >
                        {activeTab === 0 && (
                          <Box>
                            {[
                              [100, 5000],
                              [5001, 10000],
                              [10001, 20000],
                              [20001, 40000],
                            ].map((el, i) => (
                              <Box
                                sx={{
                                  bgcolor: "background.paper",
                                  p: 2,
                                }}
                                key={i}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    price[0] === el[0] && price[1] === el[1]
                                  }
                                  onChange={(e) => handleCheckboxPrice(el, e)}
                                />
                                {""}
                                <span style={{ paddingLeft: "0.5rem" }}>
                                  {el[0]} to {el[1]}
                                </span>
                              </Box>
                            ))}
                          </Box>
                        )}
                        {activeTab === 1 && (
                          <Box>
                            {[4, 3, 2, 1].map((el, i) => (
                              <Box
                                sx={{
                                  bgcolor: "background.paper",
                                  p: 2,
                                }}
                                key={i}
                              >
                                <input
                                  type="checkbox"
                                  checked={ratings === el}
                                  onChange={(e) => handleCheckboxChange(el, e)}
                                />{" "}
                                <span style={{ paddingLeft: "0.5rem" }}>
                                  {el} <GrStar /> & above
                                </span>
                              </Box>
                            ))}
                          </Box>
                        )}
                        {activeTab === 2 && (
                          <Box>
                            {" "}
                            {[50, 40, 30, 20, 10].map((el, i) => (
                              <Box sx={{ p: 2 }} key={i}>
                                <input
                                  type="checkbox"
                                  checked={discount === el}
                                  onChange={(e) =>
                                    handleCheckboxChangeDis(el, e)
                                  }
                                />
                                <span style={{ paddingLeft: "0.5rem" }}>
                                  {el} <MdPercent /> & above
                                </span>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                      Apply
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <section className="filters_sec">
                <div className="filter_head">
                  <h1>Filters</h1>{" "}
                  <p onClick={() => clearAllFilters()}>CLEAR ALL</p>
                </div>
                {
                  <div className="view_filter">
                    {ratings > 0 ? (
                      <p onClick={clearRatingFilters}>
                        {ratings} <GrStar /> & above
                      </p>
                    ) : (
                      ""
                    )}
                    {discount > 0 ? (
                      <p onClick={clearDiscountFilters}>{discount} % & above</p>
                    ) : (
                      ""
                    )}
                    {price[1] < 250000 ? (
                      <p>{price[1].toLocaleString()} Min</p>
                    ) : (
                      ""
                    )}
                    {/* {category} */}
                  </div>
                }
                <div className="price_sec">
                  <div
                    className="filter_head"
                    onClick={() => setPriceToggle(priceToggle)}
                  >
                    <h5>PRICE</h5>
                    {(JSON.stringify(price) === JSON.stringify([0, 250000])) ===
                    false ? (
                      <p onClick={() => clearPriceFilters()}>CLEAR</p>
                    ) : (
                      ""
                    )}
                  </div>
                  {priceToggle && (
                    <>
                      <div>
                        <Slider
                          value={price}
                          onChange={priceHandler}
                          valueLabelDisplay="auto"
                          getAriaLabel={() => "Price range slider"}
                          aria-labelledby="range-slider"
                          min={0}
                          max={250000}
                        />
                      </div>
                      <div>
                        <span>₹{price[0].toLocaleString()}</span>
                        <span>to</span>
                        <span>₹{price[1].toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="check_filter">
                  <div onClick={() => setRatingsToggle(!ratingsToggle)}>
                    <h5>CUSTOMER RATINGS</h5>
                    {ratingsToggle ? <MdExpandLess /> : <MdExpandMore />}
                  </div>
                  {ratings > 0 ? (
                    <p onClick={clearRatingFilters}>
                      <RxCross2 /> Clear all
                    </p>
                  ) : (
                    ""
                  )}
                  <div>
                    {ratingsToggle && (
                      <div>
                        {[4, 3, 2, 1].map((el, i) => (
                          <div key={i}>
                            <input
                              type="checkbox"
                              checked={ratings === el}
                              onChange={(e) => handleCheckboxChange(el, e)}
                            />
                            <span>
                              {el}
                              <GrStar /> & above
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="check_filter">
                  <div onClick={() => setDisToggle(!disToggle)}>
                    <h5>DISCOUNT</h5>
                    {disToggle ? <MdExpandLess /> : <MdExpandMore />}
                  </div>
                  <div>
                    {disToggle && (
                      <div>
                        {[50, 40, 30, 20, 10].map((el, i) => (
                          <div key={i}>
                            <input
                              type="checkbox"
                              checked={discount === el}
                              onChange={(e) => handleCheckboxChangeDis(el, e)}
                            />
                            <span>
                              {el} <MdPercent /> & above
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
              <section className={"product_sec"}>
                {products?.map((product) => (
                  <div key={product._id}>
                    <ProductCard {...product} />
                  </div>
                ))}
                <div className="pagination">
                  <div>
                    <Stack spacing={5}>
                      {filteredProductsCount > resultPerPage && (
                        <Pagination
                          count={Number(
                            (
                              (filteredProductsCount + 6) /
                              resultPerPage
                            ).toFixed()
                          )}
                          page={currentPage}
                          onChange={(e, val) => setCurrentPage(val)}
                          color="primary"
                        />
                      )}
                    </Stack>
                  </div>
                </div>
              </section>
            </section>
          )}
        </main>
      )}
    </>
  );
};

export default ProductsPage;
