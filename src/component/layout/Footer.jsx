import React from "react";
import img from "../../assets/logo.png";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div>
        <img src={img} alt="img" />

        <h2>Sachin</h2>
        <p>Motivation is temporary, but discipline last forever.</p>
      </div>

      <aside>
        <h2>Social Media</h2>

        <article>
          <a href="/" target={"blank"}>
            <AiFillYoutube />
          </a>
          <a href="/" target={"blank"}>
            <AiFillInstagram />
          </a>
          <a href="/" target={"blank"}>
            <AiFillGithub />
          </a>
        </article>
      </aside>
    </footer>
  );
};

export default Footer;
