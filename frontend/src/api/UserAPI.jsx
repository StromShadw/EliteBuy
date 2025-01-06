import { useState, useEffect } from "react";
import axios from "axios";

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get(`${BASE_URL}/user/infor`, {
                        headers: { Authorization: token },
                    });

                    setIsLogged(true);
                    setIsAdmin(res.data.role === "admin");
                    setCart(res.data.cart || []);
                } catch (err) {
                    console.error("Failed to fetch user information:", err);
                }
            };
            getUser();
        }
    }, [token]);

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
    };
};

export default UserAPI;
