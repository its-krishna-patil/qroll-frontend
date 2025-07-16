import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://qroll-production.up.railway.app/api/admin-login", form);

      if (res.data.user.role !== "admin") {
        return setStatus("Access denied ❌ Not an admin");
      }

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminUser", JSON.stringify(res.data.user));
      navigate("/admin");
    } catch (err) {
      setStatus("Login failed ❌");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit">Login</button>
      </form>
      <p>{status}</p>

      <p>
        Not an admin? <a href="/login" style={{ color: "blue" }}>Student Login</a>
      </p>
      <p>
        Need an admin account? <a href="/register" style={{ color: "blue" }}>Register here</a>
      </p>
    </div>
  );
};

export default AdminLogin;
