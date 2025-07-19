import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/api/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        if (form.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/room/301");
        }
      }, 1000);
    } catch (err) {
      toast.error(`❌ Login failed: ${err.response?.data?.msg || "Server error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white relative overflow-hidden">
      <ToastContainer />

      {/* Rotating glow effect */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />

      {/* Login card */}
      <motion.div
        className="relative z-10 backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">🔐 Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="role"
            value={form.role}
            onChange={handleChange}
            className={`${inputStyle} bg-white/10`}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </motion.select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${
              loading
                ? "bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </div>
            ) : (
              "🚀 Login"
            )}
          </motion.button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-300">
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
  "w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-300";

export default Login;
