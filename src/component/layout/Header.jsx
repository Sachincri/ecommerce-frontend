import React from "react";
import logo from "../../assets/logo.png";
import { HiHome } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";

const Header = ({ isAuthenticated = false }) => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <nav className="nav">
      <div>
        <img src={logo} alt="sachin" />
      </div>
      <span>
        <Search />
      </span>
      <div>
        <Link to="/">
          <HiHome />
        </Link>
        <Link to="/cart">
         Cart
          <IoMdCart /> 
          {cartItems.length > 0 ? <p> {cartItems.length}</p> : ""}
        </Link>
        <Link to={isAuthenticated ? "/me" : "/login"}>
          {isAuthenticated ? <FaUserAlt /> : <RiLoginCircleFill />}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
