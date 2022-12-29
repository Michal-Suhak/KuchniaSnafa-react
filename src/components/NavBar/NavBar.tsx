import React from "react";
import "./styles.css";

const NavBar = () => {
  return (
    <div className="navbarWrapper">
      <h1>Kuchnia Snafa</h1>
      <img
        src="public/profile_icon.png"
        alt="profile"
        width="50px"
        height="50px"
      />
      <img
        src="public/cart_icon.png"
        alt="shoppingCart"
        width="50px"
        height="50px"
      />
    </div>
  );
};

export default NavBar;
