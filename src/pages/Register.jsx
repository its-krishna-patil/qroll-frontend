import { useState } from "react";
import axios from "axios";
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
      await axios.post("https://qroll-production.up.railway.app/api/register", form);
      toast.success("✅ Registered successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(`❌ Registration failed: ${err.response?.data?.msg || "Server error"}`);
    }
  };

  return (
    <motion.div
      className="register-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: "2rem",
        background: "#1e1e2f",
        borderRadius: "10px",
        color: "#f9fafb",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <ToastContainer />
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>🎓 Register as Student or Admin</h2>

      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
          autoFocus
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ ...inputStyle, backgroundColor: "#2a2a3d" }}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={buttonStyle}
        >
          🚀 Register
        </motion.button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account? <a href="/login" style={{ color: "#4ade80" }}>Login here</a>
      </p>
    </motion.div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "1rem",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #444",
  backgroundColor: "#2a2a3d",
  color: "white",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4ade80",
  border: "none",
  color: "#111",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.3s ease",
};

export default Register;
