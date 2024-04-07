import React from "react";
import { Link } from "react-router-dom";
export const categories = [
  { name: "Mobiles", arr: [] },
  { name: "Electronics", arr: ["Laptop", "Headphone", "Powerbank"] },
  { name: "TVs & Appliances", arr: [] },
  { name: "Men", arr: ["Tshirt", "Jeans", "Shoes"] },
  { name: "Women", arr: ["Kurta", "Saree"] },
  { name: "Baby & Kids", arr: [] },
  { name: "Home & Furniture", arr: [] },
  { name: "Sports, Books & More", arr: [] },
  { name: "Flights", arr: [] },
  { name: "Offer Zone", arr: [] },
  { name: "Grocery", arr: [] },
];
const CategoryNav = () => {
  return (
    <nav className="category_nav">
      {categories.map((c, i) => (
        <section className="dropdown" key={i}>
          <p className="dropbtn">{c.name}</p>
          <div className="dropdown-content">
            {c.arr &&
              c.arr.map((category, i) => (
                <Link to={`/products?category=${category}`} key={i}>
                  {category}
                </Link>
              ))}
          </div>
        </section>
      ))}
    </nav>
  );
};

export default CategoryNav;
