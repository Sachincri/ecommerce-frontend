import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserDetails, updateUserRole } from "../../Redux/action/admin";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { user, error, loading, message } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUserRole(userId, formData));
  };

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/users");
    }
  }, [dispatch, error, userId, user, navigate, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updateUser">
            <h2>Update Profile</h2>

            <form onSubmit={updateUserSubmitHandler}>
              <div>
                <input
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              {/* <!-- input container column --> */}
              <div>
                {" "}
                <input
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <select
                  label="Role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value={"user"}>User</option>
                  <option value={"admin"}>Admin</option>
                </select>
              </div>

              <div>
              <button type="submit">Update</button>
              <Link to="/admin/userslist">Cancel</Link>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateUser;
