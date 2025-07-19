import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
      toast.success("🎉 Login successful!");
      setTimeout(() => navigate("/room/301"), 1200);
    } catch {
      toast.error("❌ Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <ToastContainer />
      <div className="relative w-full max-w-sm rounded-xl bg-[#1e293b] px-6 py-8 shadow-lg overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500 via-blue-500 to-green-400 opacity-20 animate-spin-slow blur-lg z-0" />

        <div className="relative z-10">
          <h2 className="text-white text-center text-2xl font-semibold mb-6 tracking-wide">
            🔊 LOGIN ❤️
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="bg-[#0f172a] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="bg-[#0f172a] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-2 rounded-md transition duration-300"
            >
              Sign in
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-300 space-y-1">
            <p>
              Don’t have an account?{" "}
              <a href="/register" className="text-pink-400 hover:underline">Register</a>
            </p>
            <p>
              Are you an admin?{" "}
              <a href="/admin-login" className="text-blue-400 hover:underline">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
