import { useState } from "react";
import API from '../api';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/register", form);
      setSuccess(true);
      toast.success("✅ Registered successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(`❌ Registration failed: ${err.response?.data?.msg || "Server error"}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden px-4">
      {/* Rotating glow effect */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />

      {/* Confetti burst on success */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full absolute"
                style={{ backgroundColor: randomColor() }}
                initial={{
                  top: "50%",
                  left: "50%",
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ duration: 1.2, delay: i * 0.03 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card container */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl text-white"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-6 tracking-wide">
          🎓 Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {['name', 'email', 'password'].map((field, index) => (
            <motion.div
              key={field}
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <input
                name={field}
                type={field === 'password' ? 'password' : field}
                placeholder={field === 'name' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </motion.div>
          ))}

          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="role"
            value={form.role}
            onChange={handleChange}
            className={`${inputStyle} bg-white/10 text-white`}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </motion.select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:brightness-110 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            🚀 Register
          </motion.button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-pink-400 hover:underline">
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

const inputStyle =
  "w-full px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-300";

const randomColor = () => {
  const colors = ["#f472b6", "#c084fc", "#60a5fa", "#34d399", "#facc15"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default Register;
