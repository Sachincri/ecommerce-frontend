import React from "react";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
  RiHome4Line,
} from "react-icons/ri";
import { BiDoughnutChart } from "react-icons/bi";
import { TfiWrite } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { GiClothes } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DrawerComponent from "../layout/Drower";
import { IoBarChartOutline } from "react-icons/io5";
import { MdPieChart } from "react-icons/md";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  const nav = [
    {
      path: "/",
      icon: <RiHome4Line />,
      name: "Home",
    },
    {
      path: "/admin/dashboard",
      icon: <RiDashboardFill />,
      name: "Dashboard",
    },
    {
      path: "/admin/newproduct",
      icon: <TfiWrite />,
      name: "CreateProduct",
    },
    {
      path: "/admin/productlist",
      icon: <GiClothes />,
      name: "Products",
    },
    {
      path: "/admin/userslist",
      icon: <FiUsers />,
      name: "Users",
    },
    {
      path: "/admin/orderslist",
      icon: <RiShoppingBag3Fill />,
      name: "Orders",
    },
  ];
  return (
    <>
      <main className={"side-navbar"}>
        <span>
          <DrawerComponent listArray={nav} />
        </span>
        <section>
          <header>
            {" "}
            <p>{user.name}</p>
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logo_lite-cbb357.png"
              alt="img"
            />
          </header>
          {nav?.map((item, i) => (
            <div key={i}>
              <Link to={item.path}>
                <p>{item.icon}</p> <p>{item.name}</p>
              </Link>
            </div>
          ))}
          <div>
            <h4>ALL CHARTS</h4>
            <div>
              <Link to={"/linechart"}>
                <p>
                  <IoBarChartOutline />
                </p>
                <p>Income Chart</p>
              </Link>
              <Link to={"/doughnutchart"}>
                <p>
                  <BiDoughnutChart />
                </p>
                <p> Products Chart</p>
              </Link>
              <Link>
                <p>
                  <MdPieChart />
                </p>
                <p>Orders Charts</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Sidebar;
