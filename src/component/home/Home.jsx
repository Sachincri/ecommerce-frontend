import React, { useEffect } from "react";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.webp";
import img3 from "../../assets/img4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { getAllProducts } from "../../Redux/action/productAction";
export const getRandomProducts = (prodsArray, n) => {
  const shuffledArray = prodsArray.slice();
  shuffledArray.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, n);
};
const Home = () => {
  const { error, products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const mobiles = products.filter((product) => product.category === "Mobiles");
  const footwares = products.filter((product) => product.category === "Shoes");
  const fashion = products.filter((product) => product.category === "Fashion");
  const electronics = [
    {
      img: "https://rukminim2.flixcart.com/image/416/416/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      title: "Top Mirrorless Cameras",
      subTitle: "Shop Now!",
      category:"Camera"
    },
    {
      img: "https://rukminim2.flixcart.com/image/416/416/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      title: "Top Mirrorless Cameras",
      subTitle: "Shop Now!",
      category:"Camera"
    },
    {
      img: "https://rukminim2.flixcart.com/image/416/416/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      title: "Top Mirrorless Cameras",
      subTitle: "Shop Now!",
      category:"Camera"
    },
    {
      img: "https://rukminim2.flixcart.com/image/416/416/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      title: "Top Mirrorless Cameras",
      subTitle: "Shop Now!",
      category:"Camera"
    },
    {
      img: "https://rukminim2.flixcart.com/image/416/416/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      title: "Top Mirrorless Cameras",
      subTitle: "Shop Now!",
      category:"Camera"
    },
    {
      img: "https://rukminim2.flixcart.com/image/416/416/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      title: "Top Mirrorless Cameras",
      subTitle: "Shop Now!",
      category:"Camera"
    },
  ];
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(getAllProducts());
  }, [dispatch, error]);

  const banners = [
    // { img: img1, price:  10000 },
    { img: img2, price: [0, 1000] },
    // { img: img3, price: [5000, 20000] },
  ];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="home">
          <section className="banner">
            <div>
              <Carousel
                autoPlay
                infiniteLoop
                interval={1000}
                showStatus={false}
                showThumbs={false}
                showArrows={true}
              >
                {banners.map((el, i) => (
                  <Link to={`/products/${el.price}`} key={i}>
                    <img src={el.img} alt="banner" />
                  </Link>
                ))}
              </Carousel>
            </div>
          </section>
          <section>
            <div>
              <h1>Best of mobiles</h1>
              <div>
                {mobiles.map((item, i) => (
                  <Link to={`/products?category=${item.category}`} key={i}>
                    <div>
                      {" "}
                      <img src={item.images[0]?.url} alt="sachin" />
                    </div>
                    <p>{item.name}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h1>Best of Fashion</h1>
              <div>
                {fashion.map((item, i) => (
                  <Link to={`/products?category=${item.category}`} key={i}>
                    <div>
                      {" "}
                      <img src={item.images[0].url} alt="sachin" />
                    </div>
                    <p>{item.name}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h1>Best of footwares</h1>
              <div>
                {footwares.map((item, i) => (
                  <Link to={`/products?category=${item.category}`} key={i}>
                    <div>
                      {" "}
                      <img src={item.images[0].url} alt="sachin" />
                    </div>
                    <p>{item.name}</p>
                  </Link>
                ))}
              </div>
            </div>{" "}
            <section>
              <h1>Best for you</h1>
              <div>
                {products &&
                  getRandomProducts(products, 10).map((product) => (
                    <Link
                      key={product._id}
                      to={`/products?category=${product.category}`}
                    >
                      <div>
                        <img src={product.images[0].url} alt="img" />
                      </div>

                      <p>
                        {product.name.length > 50
                          ? `${product.name.substring(0, 40)}...`
                          : product.name}
                      </p>
                      <span>{product.price}</span>
                      <span>{product.ratings}</span>
                    </Link>
                  ))}
              </div>
            </section>
            <div>
              <h1>Best of Electronics</h1>
              <div>
                {electronics?.map((item, i) => (
                  <Link to={`/products?category=${item.category}`} key={i}>
                    <div>
                      {" "}
                      <img src={item.img} alt="sachin" />
                    </div>
                    <p>{item.title}</p>
                    <span>{item.subTitle}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Home;
