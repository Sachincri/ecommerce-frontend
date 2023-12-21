import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/action/productAction";
import ProductCard from "./ProductCard";
import Slider from "@mui/material/Slider";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { categories } from "../admin/Product/CreateNewProduct";
import { BsFillStarFill } from "react-icons/bs";
import Pagination from "@mui/material/Pagination";
import Loader from "../layout/Loader";
import { Box, Stack } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
} from "@mui/material";

const ProductsPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );
  const [discount, setDiscount] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [ratingsToggle, setRatingsToggle] = useState(true);
  const [disToggle, setDisToggle] = useState(true);
  const [priceToggle, setPriceToggle] = useState(true);
  // const [recentlyViewed, setRecentlyViewed] = useState([]);

  const { products, loading, error, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.product);
  const keyword = params.keyword;

  const [currentPage, setCurrentPage] = useState(1);

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
  const handleCheckboxChange = (value, event) => {
    if (event.target.checked) {
      setRatings(value);
    } else {
      setRatings(null);
    }
  };
  const handleCheckboxChangeDis = (value, event) => {
    if (event.target.checked) {
      setDiscount(value);
    } else {
      setDiscount(null);
    }
  };

  // const addToRecentlyViewed = (productId) => {
  //   setRecentlyViewed(prevRecentlyViewed => {
  //     const updatedList = [productId, ...prevRecentlyViewed.filter(id => id !== productId)];
  //     return updatedList.slice(0, 5); // Limit to 5 recently viewed items
  //   });
  // };

  useEffect(() => {
    if (window.innerWidth < 600) {
      setPriceToggle(false);
      setRatingsToggle(false);
    }
    dispatch(
      getAllProducts(keyword, currentPage, price, category, ratings, discount)
    );
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    discount,
    error,
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleTabChange = (e, newValue) => {
    // e.preventDefault();
    setActiveTab(newValue);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="productPage">
          <ul>
            {categories.map((category) => (
              <li key={category} onClick={() => setCategory(category)}>
                <Link to={"/products"}>{category}</Link>
              </li>
            ))}
          </ul>

          <section>
            <div className="mobile">
              <Button
                variant="contained"
                color="primary"
                onClick={handleDialogOpen}
              >
                Open Dialog
              </Button>

              <Dialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                fullScreen
                sx={{ ml: 0, p: 0 }}
              >
                <Box sx={{ display: "flex" }}>
                  <DialogTitle>Filter</DialogTitle>
                  <DialogTitle sx={{ ml: 20, fontSize: 15 }}>
                    clear filter
                  </DialogTitle>
                </Box>
                <DialogContent>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ ml: -3, width: 100 }}>
                      <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        orientation="vertical"
                        variant="scrollable"
                        sx={{ bgcolor: "#e9eaf0", width: 100 }}
                      >
                        <Tab
                          sx={{ hover: "#e1e2e6" }}
                          label="CUSTOMER RATINGS"
                        />
                        <Tab label="DISCOUNT" />
                        <Tab label="Tab 3" />{" "}
                      </Tabs>
                    </Box>{" "}
                    <Box
                      sx={{
                        ml: 5,
                        minWidth: 200,
                      }}
                    >
                      {activeTab === 0 && (
                        <div>
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
                              <span>
                                {el} <BsFillStarFill /> & above
                              </span>
                            </Box>
                          ))}
                        </div>
                      )}
                      {activeTab === 1 && (
                        <div>
                          {" "}
                          {[50, 40, 30, 20, 10].map((el, i) => (
                            <Box
                              sx={{
                                p: 2,
                              }}
                              key={i}
                            >
                              <input
                                type="checkbox"
                                checked={discount === el}
                                onChange={(e) => handleCheckboxChangeDis(el, e)}
                              />
                              <span> {el} % & above</span>
                            </Box>
                          ))}
                        </div>
                      )}
                      {activeTab === 2 && <div>Content for Tab 3</div>}
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogClose} color="primary">
                    Close
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
                      {ratings} <BsFillStarFill /> & above
                    </p>
                  ) : (
                    ""
                  )}
                  {discount > 0 ? <p>{discount} % & above</p> : ""}
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
              {/* ratings filter */}
              <div className="check_filter">
                <div
                  className="filter_head"
                  onClick={() => setRatingsToggle(!ratingsToggle)}
                >
                  <h5>CUSTOMER RATINGS</h5>
                  {ratingsToggle ? <MdExpandLess /> : <MdExpandMore />}
                </div>
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
                            <BsFillStarFill /> & above
                          </span>
                        </div>
                      ))}

                      <p onClick={() => clearRatingFilters()}>CLEAR</p>
                    </div>
                  )}
                </div>
              </div>
              {/* ratings filter */}
              {/* discount filter */}
              <div className="check_filter">
                <div
                  className="filter_head"
                  onClick={() => setDisToggle(!disToggle)}
                >
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
                          <span>{el}% & above</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* discount filter */}
            </section>
            <section className="product_sec">
              {products &&
                products?.map((product) => (
                  <div key={product._id}>
                    <ProductCard {...product} />
                  </div>
                ))}
              <div className="pagination">
                {" "}
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
        </main>
      )}
    </>
  );
};

export default ProductsPage;
