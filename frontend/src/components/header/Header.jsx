import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

import MenuIcon from "./icons/bar1.svg";
import CartIcon from "./icons/cart1.svg";
import CloseIcon from "./icons/close.svg";
import Logo from "./icons/LOGO2.png"

import "./Header.css";

function Header() {
  const { userAPI } = useContext(GlobalState);
  const [isLogged, setIsLogged] = userAPI.isLogged;
  const [isAdmin, setIsAdmin] = userAPI.isAdmin;
  const [cart] = userAPI.cart;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };

  const adminLinks = (
    <>
      <li>
        <Link to="/create_product">Create Product</Link>
      </li>
      <li>
        <Link to="/category">Categories</Link>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </>
  );

  return (
    <header>
      <div
        className="menu"
        onClick={toggleMenu}
        role="button"
        tabIndex="0"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleMenu();
        }}
      >
        {menuOpen ? (
          <img src={CloseIcon} alt="close menu" width="30" />
        ) : (
          <img src={MenuIcon} alt="open menu" width="30" />
        )}
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? <img src={Logo}></img> : <img src={Logo}></img>}</Link>
        </h1>
      </div>

      <ul className={menuOpen ? "show" : ""}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminLinks}
        {isLogged ? (
          userLinks
        ) : (
          <li>
            <Link to="/login">Login & Register</Link>
          </li>
        )}
      </ul>

      {!isAdmin && (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={CartIcon} alt="cart" width="40" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
