import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/action/userAction";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="user">
        <div className="myform">
          <form onSubmit={loginSubmit}>
            <motion.h1
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Login
            </motion.h1>

            <motion.input
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{ delay: 1 }}
              placeholder="Enter Your Email"
              type="email"
              name="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.input
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.5 }}
              placeholder="Enter Your Password"
              type={view ? "text" : "password"}
              name="password"
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {view ? (
              <VscEye onClick={() => setView(false)} />
            ) : (
              <RiEyeCloseLine onClick={() => setView(true)} />
            )}
            <Link to="/forgetpassword">ForgetPassword</Link>
            <motion.input
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{ delay: 2 }}
              className="btn"
              type="submit"
              value="Login"
            />
          </form>
          <Link to="/signup">
            <p>Don't have account? SignUp</p>
          </Link>
        </div>
    </section>
  );
};

export default Login;
