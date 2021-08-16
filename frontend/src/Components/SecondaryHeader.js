import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/secondaryHeader.scss";

const SecondaryHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const HandleSearchCahnge = (e) => {
    setSearchTerm(e.target.value);
  };
  const HandleSearchSubmit = (e) => {
    e.preventDefault();
    //TODO : Add search functionality
  };
  return (
    <header className="secondary-header">
      <form className="search-bar">
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={HandleSearchCahnge}
          aria-label="Search for recipe"
        ></input>
        <button className="search-button" aria-label="Submit search">
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9.92087 2.73446C5.83022 2.73446 2.51409 6.05059 2.51409 10.1412C2.51409 14.2319 5.83022 17.548 9.92087 17.548C14.0115 17.548 17.3277 14.2319 17.3277 10.1412C17.3277 6.05059 14.0115 2.73446 9.92087 2.73446ZM0.045166 10.1412C0.045166 4.68704 4.46667 0.265533 9.92087 0.265533C15.3751 0.265533 19.7966 4.68704 19.7966 10.1412C19.7966 12.4234 19.0225 14.5248 17.7225 16.1971L24.3729 22.8474C24.855 23.3295 24.855 24.1111 24.3729 24.5932C23.8908 25.0753 23.1092 25.0753 22.6271 24.5932L15.9767 17.9429C14.3044 19.2428 12.203 20.0169 9.92087 20.0169C4.46667 20.0169 0.045166 15.5954 0.045166 10.1412Z"
              fill="black"
            />
          </svg>
        </button>
      </form>
      <nav className="category-nav">
        <Link className="navitem">Fullcourse</Link>
        <Link className="navitem">Appeteizer</Link>
        <Link className="navitem">Main Course</Link>
        <Link className="navitem">ِDessert</Link>
        <Link className="navitem">Drinks</Link>
      </nav>
    </header>
  );
};

export default SecondaryHeader;
