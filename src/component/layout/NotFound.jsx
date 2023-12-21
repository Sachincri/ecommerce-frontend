import React from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notfound">
      <main>
        <div>
          <MdError />
          <h1>404</h1>
        </div>
        <p>Page not found, click below to go to home page.</p>
        <button><Link to="/">Go to Home</Link></button>
      </main>
    </section>
  );
};

export default NotFound;