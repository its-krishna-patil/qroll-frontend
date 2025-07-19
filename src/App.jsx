import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage"; // Google Login unified auth
import StudentDashboard from "./pages/StudentDashboard";
import Room from "./pages/Room";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Unified Google Login Page */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected Routes (assume JWT or context handles access) */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
