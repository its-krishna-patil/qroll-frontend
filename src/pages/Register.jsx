import { useState } from "react";
import API from '../api';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/register", form);
      toast.success("✅ Registered successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(`❌ Registration failed: ${err.response?.data?.msg || "Server error"}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden">
      {/* Rotating glow background */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />

      {/* Register form container */}
      <motion.div
        className="relative z-10 backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-6">🎓 Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <input
            name="password"
            type="password"
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
            className={`${inputStyle} bg-white/10 text-white`}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-pink-500 hover:bg-pink-600 text-black font-bold py-2 px-4 rounded-lg transition"
          >
            🚀 Register
          </motion.button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-pink-400 hover:underline">Login here</a>
        </p>
      </motion.div>
    </div>
  );
};

// Tailwind class string for inputs
const inputStyle =
  "w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white";

export default Register;
