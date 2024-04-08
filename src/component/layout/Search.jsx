import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    }
  };
  return (
    <div className="search">
      <form onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product & brands"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" value="Search">
          <BiSearchAlt />
        </button>
      </form>
    </div>
  );
};

export default Search;
