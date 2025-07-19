import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ correct import

const GoogleAuth = () => {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential); // ✅ updated usage
    console.log("Google user:", decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
    // TODO: Navigate to dashboard or room
  };

  const handleFailure = () => {
    alert("Google login failed");
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};

export default GoogleAuth;
