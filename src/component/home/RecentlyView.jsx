import React from "react";
import { GrStar } from "react-icons/gr";
import { IoMdHeart } from "react-icons/io";
import { addToWishList } from "../../Redux/action/profile";
import { Link } from "react-router-dom";
import { settings } from "./ProductSlider";
import Slider from "react-slick";

const RecentlyView = ({ recentlyViewed }) => {
  return (
    <>
      <section className="viewed">
        <div className="viewed_sec_1">
          <h2>Recently Viewed</h2>
        </div>
        <div className="viewed_sec_2">
          <Slider {...settings}>
            {recentlyViewed &&
              recentlyViewed
                ?.map((viewed) => (
                  <section className="wishist_card" key={viewed._id}>
                    <div>
                      <IoMdHeart
                        onClick={() => addToWishList(viewed.product)}
                      />
                    </div>
                    <Link to={`/product/${viewed.product}`}>
                      <div className="wishist_1">
                        <img src={viewed.image} alt={viewed.name} />
                      </div>

                      <div className="wishist_2">
                        <span className="big_width">
                          {viewed.name.length > 60
                            ? `${viewed.name.substring(0, 60)}...`
                            : viewed.name}
                        </span>
                        <div>
                          <p>
                            {viewed.rating} <GrStar />
                          </p>
                          <p>({viewed.numOfReviews})</p>
                        </div>
                        <p className="small_width">
                          {viewed.name.length > 20
                            ? `${viewed.name.substring(0, 17)}...`
                            : viewed.name}
                        </p>
                      </div>
                      <div className="wishist_3">
                        <div>
                          <h3>{`₹${viewed.price}`}</h3>
                          <div>
                            <p>{`₹${viewed.cuttedPrice}`}</p>

                            <span>
                              {viewed.discount}
                              %&nbsp;
                              <span>off</span>
                            </span>
                          </div>
                        </div>
                        <span>
                          {viewed.price > 2000 ? "Free delivery" : ""}
                        </span>
                      </div>
                    </Link>
                  </section>
                ))
                .reverse()}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default RecentlyView;
