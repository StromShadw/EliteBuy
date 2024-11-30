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
  const [error, setError] = useState("");
  const registerSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Registering User: ", user);
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
      <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={onChangeInput}
          value={user.name}
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={onChangeInput}
          value={user.email}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="button">
          <button type="submit">Register</button>
        </div>

        <h1>Already have a Account?<Link to="/login">Login Now</Link></h1>
      </form>
    </div>
  );
}

export default Register;
