import GoogleAuth from "../components/GoogleAuth";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 to-black text-white">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login with Google</h1>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Login;
