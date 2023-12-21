import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { FiUsers } from "react-icons/fi";
import { GiClothes } from "react-icons/gi";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProducts,
  getAllOrders,
  getAllUsers,
} from "../../../Redux/action/admin";
import Loader from "../../layout/Loader";
import LineChart from "./Chart";
import DoughnutChart from "./DoughnutChart";
import PieChart from "./PieChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, users, productsCount, loading } = useSelector(
    (state) => state.admin
  );

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.itemsPrice;
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <main className="dashboard">
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
        <section> 
          <section>
            <h2>Dashboard</h2>
            <div>
              <div>
                {" "}
                <MdOutlineAccountBalanceWallet />
                <Link to="/linechart">
                  <p>Total Amount</p>
                  <span>₹{totalAmount}</span>
                </Link>
              </div>

              <div>
                <GiClothes />
                <Link to="/admin/productlist">
                  <p>Products</p>
                  <span>{productsCount}</span>
                </Link>
              </div>
              <div>
                <BsBoxSeam />
                <Link to="/admin/orderslist">
                  <p>Orders</p>
                  <span>{orders && orders.length}</span>
                </Link>
              </div>
              <div>
                <FiUsers />
                <Link to="/admin/userslist">
                  <p> Users</p>
                  <span>{users && users.length}</span>
                </Link>
              </div>
            </div>
          </section>
          <section>
            <div>
              <div>
                <DoughnutChart />
              </div>
              <div>
                <PieChart />
              </div>
            </div>
            <div>
            <div>
              <LineChart />
            </div>
            </div>
          </section>
        </section>
        </>
      )}
    </main>
  );
};
export default Dashboard;
