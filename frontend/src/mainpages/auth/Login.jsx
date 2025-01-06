import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './Login.css';

function Login() {
    const [user, setUser] = useState({ username: '', password: '' });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/user/login`, { ...user });
            localStorage.setItem('firstLogin', true);
            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.mes);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100">
            <form onSubmit={loginSubmit} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                    onChange={onChangeInput}
                    value={user.password}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                />
                <div className="flex justify-center">
                    <button type="submit" className="w-full p-3 bg-teal-500 text-white rounded hover:bg-teal-600">
                        Login
                    </button>
                </div>
                <h1 className="text-center mt-4">
                    Not have an account? <Link to="/register" className="text-teal-500 underline">Register Now</Link>
                </h1>
            </form>
        </div>
    );
}

export default Login;