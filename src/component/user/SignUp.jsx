import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/action/user";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
import Header from "../layout/Header";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);

    dispatch(register(myForm));
  };

  return (
    <>
      <Header />
      <main className="user">
        <div>
          <h1>Looks like you're new here!</h1>
          <p>Sign up with your mobile number to get started</p>
        </div>
        <div>
          <form onSubmit={submitHandler}>
            <div>
              <input
                placeholder="Enter Your Name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                placeholder="Enter Your Email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>

              <input
                id="password"
                type={view ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
                value={password}
                required
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {view ? (
                <VscEye onClick={() => setView(false)} />
              ) : (
                <RiEyeCloseLine onClick={() => setView(true)} />
              )}
            </div>
            <div>
              <input className="btn" type="submit" value="CONTINUE" />
            </div>
          </form>

          <Link to="/login">Already a user? login</Link>
        </div>
      </main>
    </>
  );
};

export default SignUp;
