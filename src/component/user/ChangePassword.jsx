import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../Redux/action/profile";
import Loader from "../layout/Loader";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  const { loading, message, error } = useSelector((state) => state.profile);

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

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={submitHandler}>
          <h1>Change Password</h1>

          <div spacing={"8"}>
            <input
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              type={"password"}
            />

            <input
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              type={"password"}
            />

            <button isLoading={loading}>Change</button>
          </div>
        </form>
      )}
      ;
    </main>
  );
};

export default ChangePassword;
