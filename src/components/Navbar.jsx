import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="fixed top-0 w-full bg-black/30 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer"
      >
        <span className="text-white">DS</span>{" "}
        <span className="text-purple-400">Visualizer</span> 🚀
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-300">{user.displayName}</span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-linear-to-r from-red-200 to-pink-200 rounded-xl text-sm font-semibold shadow-md hover:scale-105 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-linear-to-r from-purple-500 to-indigo-500 rounded-xl text-sm font-semibold"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
