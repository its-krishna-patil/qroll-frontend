import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from '../components/GoogleAuth';

const Login = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-6">
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">🚀 Login to Qroll</h1>
          <p className="mb-6 text-gray-300">Use your Google account to continue</p>
          <GoogleAuth />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;



'''import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (form.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/room/301");
      }
    } catch (err) {
      toast.error(`❌ Login failed: ${err.response?.data?.msg || "Server error"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <ToastContainer />
      <motion.div
        className="bg-white/5 p-8 rounded-2xl shadow-lg w-[90%] max-w-md backdrop-blur-md"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">🔐 Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className={`${inputStyle} bg-white/10`}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold"
          >
            🚀 Login
          </motion.button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-400 hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
};

const inputStyle =
  "w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-300";

export default Login;
'''
