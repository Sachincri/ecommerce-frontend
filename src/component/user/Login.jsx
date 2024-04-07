import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/action/user";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
import Header from "../layout/Header";
const Login = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("adminadmin");
  const [view, setView] = useState(false);
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <main className="user">
        <div>
          <h1>Login</h1>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
        </div>
        <div>
          <form onSubmit={loginSubmit}>
            <div>
              <input
                placeholder="Enter Your Email/Mobile number"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Enter Password"
                type={view ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {view ? (
                <VscEye onClick={() => setView(false)} />
              ) : (
                <RiEyeCloseLine onClick={() => setView(true)} />
              )}
            </div>

            <div>
              <input className="btn" type="submit" value="Login" />
            </div>
          </form>
          <Link to="/forgetpassword">ForgetPassword</Link>
          <Link to="/signup">New to Flipkart? Create an account</Link>
        </div>
      </main>
    </>
  );
};

export default Login;
