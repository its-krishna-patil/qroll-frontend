import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://qroll-production.up.railway.app/api/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/room/301");
    } catch {
      setStatus("❌ Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden">
      {/* Rotating light effect */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />

      {/* Login card */}
      <motion.div
        className="relative z-10 backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">🔐 Student Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-4 rounded-lg transition"
          >
            🚀 Login
          </button>
        </form>

        {status && <p className="text-red-400 mt-2 text-center">{status}</p>}

        <div className="text-center mt-4 text-sm text-gray-300">
          <p>
            Don’t have an account?{" "}
            <a href="/register" className="text-cyan-400 hover:underline">Register</a>
          </p>
          <p className="mt-1">
            Are you an admin?{" "}
            <a href="/admin-login" className="text-cyan-400 hover:underline">Login here</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
