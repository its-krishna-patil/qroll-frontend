import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const GoogleAuth = () => {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
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
