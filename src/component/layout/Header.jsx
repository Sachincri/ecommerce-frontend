import React from "react";
import logo from "../../assets/flipkart.png";
import logo2 from "../../assets/plus_aef861.png";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";
import { BiSearchAlt } from "react-icons/bi";
import DrawerComponent from "./Drower";
import { FaUserAlt } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const array = [
    { icon: <FaUserAlt />, name: "My Account", path: "/me" },
    { icon: <BsBoxFill />, name: "My Orders", path: "/myorder" },
    { icon: <FaShoppingCart />, name: "My Cart", path: "/cart" },
    { icon: <IoMdHeart />, name: "WishList", path: "/wishlist" },
  ];

  return (
    <nav className="nav">
      <b>
        <DrawerComponent listArray={array} />
      </b>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="sachin" />
          <div>
            <p>
              Explore <span>Plus</span>
            </p>
            <img src={logo2} alt="sachin" />
          </div>
        </Link>
      </div>
      <span>
        <Search />
      </span>
      <div className="nav_2">
        <Link to={isAuthenticated ? "/me" : "/login"}>
          {isAuthenticated ? (
            <section className="dropdown">
              <p className="dropbtn">{user && user.name}</p>
              <div className="dropdown-content">
                {array &&
                  array.map((link, i) => (
                    <Link to={`${link.path}`} key={i}>
                      <p>{link.icon}</p>
                      <p>{link.name}</p>
                    </Link>
                  ))}
                {user && user.role === "admin" && (
                  <Link to="/admin/dashboard">
                    <p>
                      <MdDashboard />
                    </p>{" "}
                    <p>DASHBOARD</p>
                  </Link>
                )}
              </div>
            </section>
          ) : (
            <p>login</p>
          )}
        </Link>

        <p>Become a Seller</p>
        <p>More</p>
        <span>
          <Link to="/search">
            <BiSearchAlt />
          </Link>
        </span>
        <Link to="/cart" className="cart_i">
          <FaShoppingCart /> <b>Cart</b>
          {cartItems.length > 0 ? <span> {cartItems.length}</span> : ""}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
