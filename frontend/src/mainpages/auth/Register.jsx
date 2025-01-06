import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

  const [error, setError] = useState("");
  const registerSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Registering User: ", user);
      await axios.post(`${BASE_URL}/user/register`, { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.mes);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100">
      <form onSubmit={registerSubmit} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={onChangeInput}
          value={user.name}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={onChangeInput}
          value={user.email}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <div className="flex justify-center">
          <button type="submit" className="w-full p-3 bg-teal-500 text-white rounded hover:bg-teal-600">
            Register
          </button>
        </div>
        <h1 className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-teal-500 underline">Login Now</Link>
        </h1>
      </form>
    </div>
  );
}

export default Register;
