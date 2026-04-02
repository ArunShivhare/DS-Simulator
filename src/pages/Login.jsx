import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = ({ user }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950 text-white relative overflow-hidden font-sans">
      
      {/* 1. Immersive Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* 2. Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-gray-900/50 border border-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden group">
          
          {/* Logo/Icon Top Detail */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              <img width={80} src="/logo.png" alt="Logo" className="relative z-10 drop-shadow-lg" />
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full scale-150"></div>
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic italic">
              Welcome <span className="text-purple-500">Back</span>
            </h2>
            <div className="h-1 w-12 bg-purple-600 mt-2 rounded-full opacity-50"></div>
          </div>

          <p className="text-gray-400 mb-10 text-sm font-medium leading-relaxed">
            Initialize your session to continue your <br /> 
            <span className="text-gray-200">Data Structures Mastery Journey</span>
          </p>

          {/* Google Login Button */}
          <button
            onClick={handleLogin}
            className="group/btn relative w-full flex items-center justify-center gap-4 px-6 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5 group-hover/btn:rotate-[360deg] transition-transform duration-700"
            />
            Sign in with Google
          </button>

          {/* Security Note */}
          <div className="mt-10 flex items-center justify-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
              Secure Firebase Authentication
            </p>
          </div>
        </div>

        {/* Decorative footer hint */}
        <p className="text-center mt-8 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
          By continuing, you agree to the learning protocols
        </p>
      </div>
    </div>
  );
};

export default Login;
