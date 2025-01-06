import { useState, useEffect } from "react";
import axios from "axios";

function CategoriesAPI(token) {
    const [categories, setCategories] = useState([]);
    const [callback, setCallback] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/category`, {
                    headers: { Authorization: token }
                });
                if (response.data && Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Categories data is missing in the response.');
                }
            } catch (err) {
                console.error('API Error:', err);
            }
        };
             
        fetchCategories();
    }, [token]);
    

    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback],
    };
}

export default CategoriesAPI;
