import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({
    course: "",
    roomId: "",
    startTime: "",
    endTime: "",
    isActive: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Access denied. Please login.");
      navigate("/admin-login");
    } else {
      fetchSessions();
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("adminUser"));

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("https://qroll-production.up.railway.app/api/admin/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data);
    } catch {
      alert("Failed to load sessions");
    }
  };

  const viewAttendance = async (sessionId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`https://qroll-production.up.railway.app/api/admin/attendance/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedSession(sessionId);
      setAttendance(res.data);
    } catch {
      alert("Failed to load attendance");
    }
  };

  const downloadCSV = (sessionId) => {
    window.open(`https://qroll-production.up.railway.app/api/attendance/report/${sessionId}`, "_blank");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("https://qroll-production.up.railway.app/api/add-session", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Class session created");
      fetchSessions();
    } catch {
      alert("❌ Failed to create session");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Admin Dashboard</h2>
      <h3>Welcome, {user?.name || "Admin"}</h3>

      <form onSubmit={handleCreateSession} style={{ marginBottom: "2rem" }}>
        <h3>Create New Class</h3>
        <input name="course" placeholder="Course" onChange={handleChange} required />
        <input name="roomId" placeholder="Room" onChange={handleChange} required />
        <input name="startTime" type="datetime-local" onChange={handleChange} required />
        <input name="endTime" type="datetime-local" onChange={handleChange} required />
        <button type="submit">Create Class</button>
      </form>

      <h3>📚 Existing Sessions</h3>
      <ul>
        {sessions.map((s) => (
          <li key={s._id}>
            <strong>{s.course}</strong> - Room {s.roomId}
            <button onClick={() => viewAttendance(s._id)} style={{ marginLeft: "1rem" }}>View</button>
            <button onClick={() => downloadCSV(s._id)} style={{ marginLeft: "0.5rem" }}>CSV</button>
          </li>
        ))}
      </ul>

      {attendance.length > 0 && (
        <>
          <h3>🧑‍🎓 Attendance</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={i}>
                  <td>{a.studentId?.name || "N/A"}</td>
                  <td>{a.studentId?.email || "N/A"}</td>
                  <td>{new Date(a.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Admin;
