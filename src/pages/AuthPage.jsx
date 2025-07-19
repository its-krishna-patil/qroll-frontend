import { motion } from "framer-motion";
import GoogleAuth from "../components/GoogleAuth";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white relative overflow-hidden">
      {/* Rotating glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      <motion.div
        className="relative z-10 w-[90%] max-w-md p-8 bg-white/5 backdrop-blur-xl rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          🎓 Login with Google to Continue
        </h1>
        <GoogleAuth />
      </motion.div>
    </div>
  );
};

export default AuthPage;
