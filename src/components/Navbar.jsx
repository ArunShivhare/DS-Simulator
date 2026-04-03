import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-black/40 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center transition-all">
      {/* 1. Logo Section */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative">
          <img
            width={45}
            src="/logo.png"
            alt="Logo"
            className="group-hover:rotate-12 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full -z-10"></div>
        </div>
        <div className="hidden sm:block">
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            DS
          </span>
          <span className="text-xl font-black tracking-tighter text-purple-500 uppercase ml-1">
            Visualizer
          </span>
        </div>
      </div>

      {/* 2. Right Side: Auth & Profile */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Glass Profile Badge */}
            <div
              onClick={() => navigate("/progress")}
              className="flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 hover:border-purple-500/30 transition-all group"
            >
              <div className="text-2xl text-purple-400 group-hover:scale-110 transition-transform">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="pfp"
                    className="w-7 h-7 rounded-full border border-purple-500/50"
                  />
                ) : (
                  <FaUserCircle />
                )}
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-xs font-bold text-gray-200 truncate max-w-[100px]">
                  {user.displayName || "User"}
                </span>
              </div>
            </div>

            {user.email === "simplesabanda07@gmail.com" && (
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest px-3 py-3 animate-pulse bg-white/5 border border-white/10 rounded-2xl cursor-pointer">
                <button onClick={() => navigate("/admin")}
                  className="cursor-pointer" >Architect</button>
              </span>
            )}

            {/* Logout Button: Refined Ghost Style */}
            <button
              onClick={handleLogout}
              className="px-1 py-3 text-[7px] md:px-4 md:py-2 md:text-[10px] font-black uppercase tracking-widest text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/10 transition-all active:scale-95 shadow-lg shadow-red-950/20"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20 active:scale-95"
          >
            Access Terminal
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
