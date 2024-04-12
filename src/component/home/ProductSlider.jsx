import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "../../Styles/home.scss"
export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <GrFormPrevious />
    </div>
  );
};

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <GrFormNext />
    </div>
  );
};

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
  swipe: false,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: "unslick",
    },
    {
      breakpoint: 480,
      settings: "unslick",
    },
  ],
};

function ProductSlider({ productsArray, title }) {
  return (
    <section className="slider">
      <div>
        <h2>{title}</h2>
      </div>

      <div>
        <Slider {...settings}>
          {productsArray?.map((item, i) => (
            <div key={i}>
              <Link to={`/products?category=${item.category}`}>
                <img src={item.img} alt="sachin" />
                <p>{item.title}</p>
                <span>{item.subTitle}</span>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default ProductSlider;
