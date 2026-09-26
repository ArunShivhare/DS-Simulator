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
    <div className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="px-5 sm:px-8 lg:px-10 py-3.5 flex justify-between items-center">

        {/* Logo Section */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <img
              width={42}
              src="/logo.png"
              alt="Logo"
              className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>

          <div className="hidden sm:block leading-none">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              DSA
            </span>
            <span className="text-xl font-bold tracking-tight text-indigo-600">
              Verse
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Profile */}
              <div
                onClick={() => navigate("/progress")}
                className="
                  flex items-center gap-2.5
                  px-2.5 py-1.5
                  rounded-xl
                  cursor-pointer
                  border border-transparent
                  hover:border-slate-200
                  hover:bg-slate-50
                  transition-all duration-200
                  group
                "
              >
                <div className="flex items-center justify-center">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="pfp"
                      className="
                        w-8 h-8
                        rounded-full
                        object-cover
                        ring-2 ring-white
                        shadow-sm
                        transition-transform duration-200
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-[11px] font-medium text-slate-400">
                    Welcome back
                  </span>

                  <span className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">
                    {user.displayName || "User"}
                  </span>
                </div>
              </div>

              {/* Architect */}
              {user.email === "simplesabanda07@gmail.com" && (
                <span
                  className="
                    px-3 py-2
                    text-[10px]
                    font-semibold
                    text-indigo-600
                    border border-indigo-100
                    bg-indigo-50
                    rounded-lg
                    cursor-pointer
                    transition-all duration-200
                    hover:bg-indigo-100
                    hover:border-indigo-200
                  "
                >
                  <button
                    onClick={() => navigate("/admin")}
                    className="cursor-pointer"
                  >
                    Architect
                  </button>
                </span>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="
                  px-2.5 py-2
                  sm:px-3.5
                  text-[10px] sm:text-[11px]
                  font-semibold
                  text-slate-500
                  border border-slate-200
                  rounded-lg
                  hover:text-red-500
                  hover:border-red-200
                  hover:bg-red-50
                  transition-all duration-200
                  active:scale-95
                "
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="
                px-5 py-2.5
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                rounded-lg
                text-xs
                font-semibold
                transition-all duration-200
                active:scale-[0.98]
                shadow-sm
                hover:shadow-md
              "
            >
              Access Terminal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;