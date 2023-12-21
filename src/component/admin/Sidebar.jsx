import React, { useState } from "react";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
  RiCloseFill,
} from "react-icons/ri";
import { BiMenuAltLeft } from "react-icons/bi";
import { TfiWrite } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { GiClothes } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const nav = [
    {
      path: "/admin/dashboard",
      icon: <RiDashboardFill />,
      title: "Dashboard",
    },
    {
      path: "/admin/newproduct",
      icon: <TfiWrite />,
      title: "CreateProduct",
    },
    {
      path: "/admin/productlist",
      icon: <GiClothes />,
      title: "Products",
    },
    {
      path: "/admin/userslist",
      icon: <FiUsers />,
      title: "Users",
    },
    {
      path: "/admin/orderslist",
      icon: <RiShoppingBag3Fill />,
      title: "Orders",
    },
  ];
  return (
    <>
      <main className={`side-navbar ${isOpen ? "open" : ""}`}>
        <section>
          {" "}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RiCloseFill /> : <BiMenuAltLeft />}
          </button>
          <header>
            <img src={user.avatar.url} alt="img" />
            <p>{user.name}</p>
          </header>
          {nav?.map((item, i) => (
            <div key={i}>
              <Link to={item.path}>
                <p>
                  {item.icon} {item.title}
                </p>
              </Link>
            </div>
          ))}
          <div></div>
        </section>
      </main>
    </>
  );
};

export default Sidebar;
