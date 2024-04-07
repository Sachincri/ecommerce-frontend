import React from "react";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../Redux/action/profile";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const { loading, message, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
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
  }, [dispatch, error, message]);

  return (
    <main className="forgetpassword">
      <h1>ForgetPassword</h1>
      <form onSubmit={submitHandler}>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="abc@gmail.com"
          type={"email"}
        />

        <Button isLoading={loading} type="submit">
          Send
        </Button>
      </form>
    </main>
  );
};

export default ForgetPassword;
