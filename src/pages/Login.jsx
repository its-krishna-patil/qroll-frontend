import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>Student Login</h2>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ marginBottom: "1rem" }}
        />
        <button type="submit">Login</button>
      </form>

      <p>{status}</p>

      <p>
        Don’t have an account? <a href="/register" style={{ color: "blue" }}>Register</a>
      </p>
      <p>
        Are you an admin? <a href="/admin-login" style={{ color: "blue" }}>Login here</a>
      </p>
    </div>
  );
};

export default Login;