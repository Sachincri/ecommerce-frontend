import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { logout } from "../../Redux/action/userAction";
// import { updateProfilePicture } from "../../Redux/action/profile";

const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);
  const { loading, message, error } = useSelector((state) => state.user);
  // const changeImageSubmitHandler = (e, image) => {
  //   e.preventDefault();
  //   const myForm = new FormData();
  //   myForm.append("file", image);
  //   dispatch(updateProfilePicture(myForm));
  //   dispatch(loadUser());
  // };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  const logoutHandler = () => {
    dispatch(logout());
  }; 
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="profile">
          <section>
            <div>
              <img src={user && user.avatar.url} alt={user && user.name} />
            </div>
            <button>
              <MdModeEdit />
            </button>
          </section>
          <section>
            <p>{user?.name}</p>
            {<p>{shippingInfo && shippingInfo.phoneNo}</p>}
            <p>{user && user.email}</p>

            {
              <p>
                {shippingInfo &&
                  `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`}
              </p>
            }

            <Link to="/myorder">
              <RiShoppingBag2Fill />
              Orders
            </Link>
            {user && user.role === "admin" && (
              <Link to="/admin/dashboard">
                <MdDashboard /> Dashboard
              </Link>
            )}
            <button onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </button>
          </section>
        </main>
      )}
    </>
  );
};

export default Profile;
