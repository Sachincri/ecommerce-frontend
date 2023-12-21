import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/action/userAction";
import { Avatar } from "@mui/material";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";

const SignUp = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  const [view, setView] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", image);

    dispatch(register(myForm));
    console.log(myForm);
  };

  return (
    <section className="user">

          <form onSubmit={submitHandler}>
            <motion.h1
              initial={{ y: "-150vh" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              SignUp
            </motion.h1>

            <motion.input
              placeholder="Enter Your Name"
              type="text"
              name="name"
              id="name"
              initial={{ y: "-150vh" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6 }}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <motion.input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              id="email"
              initial={{ x: "-150vh" }}
              animate={{ x: 0 }}
              transition={{ delay: 1 }}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.input
              placeholder="Enter Your Password"
              type={view ? "text" : "password"}
              name="password"
              initial={{ x: "150vh" }}
              animate={{ x: 0 }}
              transition={{ delay: 1.5 }}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {view ? (
              <VscEye onClick={() => setView(false)} />
            ) : (
              <RiEyeCloseLine onClick={() => setView(true)} />
            )}

            <div>
              <Avatar src={imagePrev} />
              <input
                accept="image/*"
                required
                id="chooseAvatar"
                type={"file"}
                onChange={changeImageHandler}
              />
            </div>
            <motion.input
              className="btn"
              type="submit"
              value="SignUP"
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              transition={{ delay: 2 }}
            />
          </form>

          <Link to="/login">Already a user? login</Link>
    </section>
  );
};

export default SignUp;
