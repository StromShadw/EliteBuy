import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/refresh_token`);
            setToken(res.data.accesstoken);
            console.log(res);
        } catch (err) {
            console.error("Failed to refresh token:", err);
            localStorage.removeItem("firstLogin"); // Optional: clear invalid token
        }
    };

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token), // Updated and structured correctly
        categoriesAPI: CategoriesAPI(token),
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
