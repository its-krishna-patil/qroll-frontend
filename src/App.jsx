import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin"; // ✅ add this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} /> {/* ✅ fix */}
      </Routes>
    </Router>
  );
}

export default App;
