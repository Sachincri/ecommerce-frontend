import React, { useEffect } from "react";
import Slider from "react-slick";
import Header from "../layout/Header";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import banner1 from "../../assets/banner1.webp";
import banner2 from "../../assets/banner2.webp";
import HomeF from "../../assets/Home.jpg";
import Toys from "../../assets/Toys.webp";
import RecentlyView from "./RecentlyView";
import "slick-carousel/slick/slick-theme.css";
import Mobiles from "../../assets/Mobile.webp";
import Fashion from "../../assets/Fashions.webp";
import Electronics from "../../assets/Leptop.webp";
import { useDispatch, useSelector } from "react-redux";
import RandomProductsSlider from "./RandomProductsSlider";
import ProductSlider, { NextBtn, PreviousBtn } from "./ProductSlider";
import { getAllProducts,getRecentlyViewed,} from "../../Redux/action/product";

const Home = () => {
  const dispatch = useDispatch();
  const { error, products, loading, recentlyViewed } = useSelector(
    (state) => state.product
  );

  const mobiles = [
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/e/a/g/-original-imags37h4prxjazz.jpeg?q=70",
      title: "Redmi 12",
      subTitle: "Shop Now!",
      category: "Mobiles",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/h/h/d/-original-imags487gaqqhcea.jpeg?q=70",
      title: "realme c53",
      subTitle: "Shop Now!",
      category: "Mobiles",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/t/5/5/-original-imagt4qzhsrnpyhb.jpeg?q=70",
      title: "realme c51",
      subTitle: "Shop Now!",
      category: "Mobiles",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/l/2/y/-original-imaggswcffkgcupp.jpeg?q=70",
      title: "Google pixel 7",
      subTitle: "Shop Now!",
      category: "Mobiles",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/z/b/d/-original-imagpgx48f4szdvf.jpeg?q=70",
      title: "Google pixel 7a",
      subTitle: "Shop Now!",
      category: "Mobiles",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/z/1/c/-original-imagt5uhcnfy66wa.jpeg?q=70",
      title: "motorola G54",
      subTitle: "Shop Now!",
      category: "Mobiles",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/z/1/c/-original-imagt5uhcnfy66wa.jpeg?q=70",
      title: "motorola G54",
      subTitle: "Shop Now!",
      category: "Mobiles",
    },
  ];

  const fashion = [
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/shoe/y/4/v/-original-imagsn6qybenjtts.jpeg?q=70",
      title: "rebooks rhx",
      subTitle: "Shop Now!",
      category: "Camera",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/ethnic-set/y/v/6/s-abwsd2378-mn-anubhutee-original-imagtufqchduy3dz.jpeg?q=70",
      title: "kurta",
      subTitle: "Shop Now!",
      category: "kurta,suit",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/ethnic-set/1/j/m/xl-426k5065i-412tk365i-skylee-original-imagt3mzwvkjuxgc.jpeg?q=70",
      title: "kurta",
      subTitle: "Shop Now!",
      category: "Suit",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/sari/i/y/8/free-krgr043-bhagyashree-peach-karagiri-unstitched-original-imagqxf2zfnhejrg.jpeg?q=70",
      title: "saree",
      subTitle: "Shop Now!",
      category: "Saree",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/l30hmkw0/kids-dress/z/w/i/4-5-years-dezine-pink-black-flower-gown-kidotsav-original-image878zaaggwn7.jpeg?q=70",
      title: "girl dress",
      subTitle: "Shop Now!",
      category: "frock",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/sari/i/y/8/free-krgr043-bhagyashree-peach-karagiri-unstitched-original-imagqxf2zfnhejrg.jpeg?q=70",
      title: "saree",
      subTitle: "Shop Now!",
      category: "Saree",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/l30hmkw0/kids-dress/z/w/i/4-5-years-dezine-pink-black-flower-gown-kidotsav-original-image878zaaggwn7.jpeg?q=70",
      title: "girl dress",
      subTitle: "Shop Now!",
      category: "frock",
    },
  ];

  const electronics = [
    {
      img: "https://rukminim2.flixcart.com/image/416/416/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      title: "Top Mirrorless Cameras",
      subTitle: "Shop Now!",
      category: "Camera",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/headphone/0/v/m/nord-buds-2-oneplus-original-imagnwf7sgjetqwg.jpeg?q=70",
      title: "airbuds",
      subTitle: "Shop Now!",
      category: "headphone",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/l1pc3gw0/smartwatch/z/n/6/-original-imagd7d7hxrcguhv.jpeg?q=70",
      title: "smart watch",
      subTitle: "Shop Now!",
      category: "Electronics",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/cases-covers/back-cover/j/9/s/ip-ig-dry-flower-squif-original-imagsgj5qdxczfcc.jpeg?q=70",
      title: "iphone back cover",
      subTitle: "Shop Now!",
      category: "cover",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/physical-game/h/k/s/no-standard-edition-ps5-spiderman-2-standard-edn-ps5-game-ps5-original-imagqgm5jd99ayhz.jpeg?q=70",
      title: "marvel spide-man game ",
      subTitle: "Shop Now!",
      category: "Games",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/power-bank/x/0/a/-original-imagw4pwhfgbj9mg.jpeg?q=70",
      title: "boAt Energyshroom powerBank",
      subTitle: "Shop Now!",
      category: "Powerbank",
    },
    {
      img: "https://rukminim2.flixcart.com/image/200/200/xif0q/power-bank/x/0/a/-original-imagw4pwhfgbj9mg.jpeg?q=70",
      title: "boAt Energyshroom powerBank",
      subTitle: "Shop Now!",
      category: "Powerbank",
    },
  ];
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 600,
        settings: { arrows: false, dots: true },
      },
      {
        breakpoint: 480,
        settings: { arrows: false, dots: true },
      },
    ],
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(getAllProducts());
    dispatch(getRecentlyViewed());
    window.scrollTo(0, 0);
  }, [dispatch, error]);

  const banners = [
    { img: banner1, path: "Monitor" },
    { img: banner2, path: "Monitor" },
  ];
  const categories = [
    {
      name: "Grocery",
      icon: "https://rukminim1.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100",
    },
    {
      name: "Mobiles",
      icon: Mobiles,
    },
    {
      name: "Fashion",
      icon: Fashion,
      array: ["Tshirt", "Jeans", "Shoes", "Kurta", "Saree"],
    },
    {
      name: "Electronics",
      icon: Electronics,
      array: ["Laptop", "Headphone", "Powerbank"],
    },
    {
      name: "Home & Furniture",
      icon: HomeF,
    },
    {
      name: "Appliances",
      icon: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100",
    },

    {
      name: "Travel",
      icon: "https://rukminim1.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100",
    },

    {
      name: "Beauty,Toys & more",
      icon: Toys,
      array: [],
    },
  ];
  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <main className="home">
          <nav className="catnav">
            {categories.map((c, i) => (
              <section className="dropdown" key={i}>
                <img src={c.icon} alt="" />
                <p className="dropbtn">{c.name}</p>
                <div className="dropdown-content">
                  {c.array &&
                    c.array.map((category, i) => (
                      <Link to={`/products?category=${category}`} key={i}>
                        {category}
                      </Link>
                    ))}
                </div>
              </section>
            ))}
          </nav>
          <section className="banner">
            <div>
              <Slider className="c" {...settings}>
                {banners.map((el, i) => (
                  <Link to={`/products?category=${el.path}`} key={i}>
                    <img src={el.img} alt="banner" />
                  </Link>
                ))}
              </Slider>
            </div>
          </section>
          <section className="ProductSlider">
            <div>
              <ProductSlider
                title={"Best of mobiles"}
                productsArray={mobiles}
              />
            </div>
            <div>
              <ProductSlider
                title={"Best of Fashion"}
                productsArray={fashion}
              />
            </div>

            <div>
              <RandomProductsSlider
                title={"Recomended for You"}
                productsArray={products}
              />
            </div>
            <div>
              <ProductSlider
                title={"Best of Electronics"}
                productsArray={electronics}
              />
            </div>
            <div>
              {recentlyViewed && (
                <RecentlyView recentlyViewed={recentlyViewed} />
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Home;
