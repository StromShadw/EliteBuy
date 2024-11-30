import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const res = await axios.get("/user/refresh_token");
            setToken(res.data.accesstoken);
        } catch (err) {
            console.error("Failed to refresh token", err);
        }
    };

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(token),
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
