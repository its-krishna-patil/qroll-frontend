import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = () => {
    setForm({ ...form, role: form.role === "student" ? "admin" : "student" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://qroll-production.up.railway.app/api/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess(true);
      toast.success("✅ Login successful");
      setTimeout(() => {
        navigate(form.role === "admin" ? "/admin-dashboard" : "/room/301");
      }, 1500);
    } catch (err) {
      toast.error("❌ Login failed: Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden">
      {/* Rotating glow animation */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-3xl opacity-30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />

      {/* Confetti on success */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white absolute"
                initial={{ top: "50%", left: "50%" }}
                animate={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ duration: 1.2, delay: i * 0.02 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login card */}
      <motion.div
        className="relative z-10 backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-white"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-4">🔐 Login to Your Account</h2>

        {/* Role toggle */}
        <div className="flex justify-center mb-6 text-sm">
          <span className="mr-2 text-gray-300">Login as:</span>
          <button
            type="button"
            onClick={handleRoleToggle}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            {form.role === "student" ? "Student" : "Admin"}
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className={inputStyle}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className={inputStyle}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110 text-white font-bold py-2 px-4 rounded-lg"
          >
            {loading ? "Logging in..." : "🚀 Login"}
          </motion.button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-300">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-400 hover:underline">Register here</a>
        </p>
      </motion.div>
    </div>
  );
};

const inputStyle =
  "w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-300";

export default Login;
