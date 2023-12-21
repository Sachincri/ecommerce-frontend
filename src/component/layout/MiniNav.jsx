import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../admin/Product/CreateNewProduct";
const MiniNav = () => {
  return (
    <div className="mininav">
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={"/products"}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniNav;
