import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const [result, setResult] = useState(0);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/products?limit=${page * 9}&${category}&sort=${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
  }, [callback, page, category, sort, search]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setpage],
    result: [result, setResult],
  };
}

export default ProductsAPI;
