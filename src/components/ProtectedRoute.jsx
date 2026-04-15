import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 WAIT UNTIL FIREBASE CHECKS USER
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
        {/* 1. Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

        {/* 2. Loading Core */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Pulsing Logo Container */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
            <img
              width={100}
              src="/logo.png"
              alt="Logo"
              className="relative z-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-bounce-slow"
            />
          </div>

          {/* Modern Progress Indicator */}
          <div className="flex flex-col items-center space-y-4">
            {/* Outer Spinner */}
            <div className="w-12 h-12 border-4 border-white/5 border-t-purple-500 rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.2)]"></div>

            {/* Text Group */}
            <div className="text-center">
              <h2 className="text-xl font-black uppercase tracking-[0.3em] text-white italic">
                Initializing <span className="text-purple-500">System</span>
              </h2>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.5em] mt-2 animate-pulse">
                Optimizing Visualization Engine
              </p>
            </div>
          </div>
        </div>

        {/* 3. Terminal Footer Decor */}
        <div className="absolute bottom-10 w-full flex justify-center opacity-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gray-700"></div>
            <span className="text-[8px] font-mono text-gray-500 tracking-tighter">
              DATA_STRUCTURES_HUB_V2.0
            </span>
            <div className="h-px w-12 bg-gray-700"></div>
          </div>
        </div>

        {/* Global Styles for the bounce-slow animation */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
  `,
          }}
        />
      </div>
    );
  }

  // 🔒 IF NOT LOGGED IN → REDIRECT
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
