import axios from "axios";
import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import "./Categories.css";

function Categories() {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `${BASE_URL}/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      } else {
        const res = await axios.post(
          `${BASE_URL}/api/category`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      }
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit"> {onEdit ? " Update" : "Save"} </button>
      </form>
      <div className="col">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Edit
                </button>
                <button onClick={() => deleteCategory(category._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
}

export default Categories;
