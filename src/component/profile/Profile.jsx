import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import Logo from "../../assets/logo.png";
import { MdModeEdit } from "react-icons/md";
import { loadUser, logout } from "../../Redux/action/user";
import { updateProfile } from "../../Redux/action/profile";
import Header from "../layout/Header";
import { IoMdHeart } from "react-icons/io";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const { loading, message, error } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    window.scrollTo(0, 0);
  }, [dispatch, error, message]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <main className="profile">
          <section>
            <div>
              <img src={Logo} alt={user && user.name} />
              <div>
                <span>Hello,</span>
                <div>
                  <p>{user?.name}</p> <p>customer</p>
                </div>
              </div>
            </div>
            <div>
              <Link to="/myorder">
                <BsBoxFill />
                MY ORDERS{" "}
                <GrFormNext
                  className="arrow"
                  style={{ color: "gray", marginLeft: "35%" }}
                />
              </Link>
              <Link to="/wishList">
                <IoMdHeart />
                WishList{" "}
                <GrFormNext
                  className="arrow"
                  style={{ color: "gray", marginLeft: "8.5rem" }}
                />
              </Link>
              <Link>
                <FaUserAlt /> ACCOUNT SETTINGS
              </Link>
              {user && user.role === "admin" && (
                <Link to="/admin/dashboard">
                  <MdDashboard /> DASHBOARD
                </Link>
              )}
            </div>
            <button onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </button>
          </section>
          <section>
            <div>
              <h3>Personal infomation</h3>
              <div>
                <p>{user?.name}</p>
                <p>customer</p>
              </div>
            </div>
            <div>
              <h3>Email Address</h3>
              <div>
                <p>{user && user.email}</p>
              </div>
            </div>
            <div>
              <h3>Mobile Number</h3>
              <div>
                <p>{user && user.mobileNumber}</p>
              </div>
            </div>
          </section>
          <button onClick={logoutHandler}>
            <FaSignOutAlt /> Logout
          </button>
        </main>
      )}
    </>
  );
};

export default Profile;
