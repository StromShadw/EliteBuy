import React, { useContext, useEffect } from "react";
import "./Filter.css";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

function Filters() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [categories] = state.categoriesAPI.categories || [];
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  const [page, setPage] = state.productsAPI.page;
  const [result, setResult] = state.productsAPI.result;

  // Fetch products whenever category, sort, or search changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/products?limit=${page * 9}`;
  
        if (category) url += `&${category}`;
        if (sort) url += `&sort=${sort}`;
        if (search) url += `&search=${search}`;
        const response = await axios.get(url);
  
        setProducts(response.data.products);
        setResult(response.data.result || 0); // Handle result count if provided
      } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
      }
    };
  
    fetchProducts();
  }, [category, sort, search, page]);
  

  // Handle category selection change
  const handleCategory = (e) => {
    setCategory(e.target.value); // Update category state based on selection
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters:</span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories?.length > 0 ? (
            categories.map((category) => (
              <option value={"category=" + category._id} key={category._id}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Loading Categories...
            </option>
          )}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Enter the name for search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row">
        <span>Sort:</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Sales</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
