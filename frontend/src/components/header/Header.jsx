import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

import MenuIcon from "./icons/bar1.svg";
import CartIcon from "./icons/cart1.svg";
import CloseIcon from "./icons/close.svg";
import Logo from "./icons/LOGO2.png";

function Header() {
    const { userAPI } = useContext(GlobalState) || {};
    const [isLogged, setIsLogged] = userAPI?.isLogged || [false, () => {}];
    const [isAdmin, setIsAdmin] = userAPI?.isAdmin || [false, () => {}];
    const [cart] = userAPI?.cart || [[]];
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

    const handleLogout = async () => {
        await axios.get(`${BASE_URL}/user/logout`);
        localStorage.clear();
        setIsAdmin(false);
        setIsLogged(false);
    };

    const adminLinks = (
        <>
            <li className="text-md font-semibold ">
                <Link to="/create_product">Create Product</Link>
            </li>
            <li className="text-md font-semibold ">
                <Link to="/category">Categories</Link>
            </li>
        </>
    );

    const userLinks = (
        <>
            <li className="text-md font-semibold ">
                <Link to="/history">History</Link>
            </li>
            <li className="text-white text-md font-semibold bg-red-600 rounded-2xl px-2 py-1 hover:bg-red-500 transition-colors duration-300">
                <Link to="/" onClick={handleLogout}>
                    Logout
                </Link>
            </li>
        </>
    );

    return (
        <header className="h-[75px] flex justify-between items-center px-4 shadow-lg relative">
            <div
                className="cursor-pointer z-10 md:hidden"
                onClick={toggleMenu}
                role="button"
                tabIndex="0"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleMenu();
                }}
            >
                {menuOpen ? (
                    <img src={CloseIcon} alt="close menu" className="w-[30px]" />
                ) : (
                    <img src={MenuIcon} alt="open menu" className="w-[30px]" />
                )}
            </div>

            <div className="flex items-center">
                <h1>
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="logo"
                            className="h-[70px] w-[100px] ml-5 transition-transform duration-300 hover:scale-110"
                        />
                    </Link>
                </h1>
            </div>

            <ul
                className={`${
                    menuOpen ? "flex" : "hidden"
                } md:flex flex-col md:flex-row md:items-center gap-4 absolute md:static top-[80px] left-0 w-[80%] md:w-auto bg-gray-800 md:bg-transparent p-5 md:p-0 shadow-lg md:shadow-none`}
            >
                <li>
                    <Link
                        to="/"
                        className="text-red-700 md:text-gray-800 text-md font-semibold tracking-wider transition-colors duration-300 hover:text-pink-500"
                    >
                        {isAdmin ? "Products" : "Shop"}
                    </Link>
                </li>
                {isAdmin && adminLinks}
                {isLogged ? (
                    userLinks
                ) : (
                    <li>
                        <Link
                            to="/login"
                            className="text-red-600 text-lg font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-pink-500"
                        >
                            Login & Register
                        </Link>
                    </li>
                )}
            </ul>

            {!isAdmin && (
                <div className="relative mr-8">
                    <span className="absolute top-[-7px] right-[-5px] bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {cart.length}
                    </span>
                    <Link to="/cart">
                        <img src={CartIcon} alt="cart" className="w-[40px]" />
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
