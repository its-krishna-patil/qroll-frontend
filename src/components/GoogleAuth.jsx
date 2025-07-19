import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email } = decoded;

      const res = await axios.post("https://qroll-backend-production.up.railway.app/api/google-login", {
        name,
        email,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/room/301");
      }
    } catch (err) {
      console.error("Google login error:", err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google Login Failed")}
        useOneTap
        auto_select
      />
    </div>
  );
};

export default GoogleAuth;
