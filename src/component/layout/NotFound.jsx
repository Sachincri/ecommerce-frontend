import React from "react";
import { Link } from "react-router-dom";
import Notfound from "../../assets/noproducts.png";
const NotFound = () => {
  return (
    <div className="notfound">
      <img src={Notfound} alt="" />
      <p>
        Unfortunately the page you are looking for has been moved or deleted
      </p>
      <div>
        <Link to={"/"}>GO TO HOMEPAGE</Link>
      </div>
    </div>
  );
};

export default NotFound;
