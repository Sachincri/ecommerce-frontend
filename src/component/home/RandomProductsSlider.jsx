import React from "react";
import Slider from "react-slick";
import { settings } from "./ProductSlider";
import ProductCard from "../product/ProductCard";


const RandomProductsSlider = ({ title, productsArray }) => {

  const getRandomProducts = (prodsArray, n) => {
    const shuffledArray = prodsArray.slice();
    shuffledArray.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, n);
  };
  
  return (
    <section className="RandomProductsSlider">
      <div>
        <h2>{title}</h2>
      </div>

      <div>
        <Slider {...settings}>
          {productsArray &&
            getRandomProducts(productsArray, 10)?.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default RandomProductsSlider;
