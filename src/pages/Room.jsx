// Room.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Room = () => {
  const { roomId } = useParams();
  const [qrToken, setQrToken] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔁 Fetch QR token every 60s
  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await axios.get(
          `https://qroll-production.up.railway.app/api/qr/${roomId}`
        );
        setQrToken(res.data.qrToken);
      } catch {
        setStatus("❌ No active session");
      }
    };
    fetchQR();
    const interval = setInterval(fetchQR, 60000);
    return () => clearInterval(interval);
  }, [roomId]);

  // 📍 Get GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }),
        () => setStatus("❌ Location access denied")
      );
    }
  }, []);

  // ✅ Submit attendance
  const handleSubmit = async () => {
    if (!qrToken || !location) {
      return setStatus("❌ Missing QR or location");
    }

    const authToken = localStorage.getItem("token");

    try {
      await axios.post(
        "https://qroll-production.up.railway.app/api/attendance/submit",
        {
          token: qrToken,
          gps: location,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setStatus("✅ Attendance marked");
    } catch (err) {
      setStatus("❌ Attendance failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-blue-700">📍 Smart Attendance</h1>

      {user && (
        <div className="text-sm text-gray-700 mb-2">
          Logged in as <strong>{user.name}</strong>
          <br />
          <span className="text-xs">{user.email}</span>
        </div>
      )}

      <p className="mb-2 text-gray-600">Room: <strong>{roomId}</strong></p>
      <p className="mb-4 text-red-500">{status}</p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-200"
        >
          ✅ Submit Attendance
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Room;
