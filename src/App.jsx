import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import Room from "./pages/Room";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* 👈 default to Google login */}
        <Route path="/login" element={<Login />} /> {/* 👈 optional direct route */}
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
