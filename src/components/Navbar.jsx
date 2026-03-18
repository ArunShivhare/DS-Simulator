import { useNavigate, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const linkStyle = (path) =>
    `cursor-pointer transition ${
      location.pathname === path
        ? "text-purple-400"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          <span className="text-white">DS</span>{" "}
          <span className="text-purple-400">Visualizer</span> 🚀
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          <span onClick={() => navigate("/")} className={linkStyle("/")}>
            Home
          </span>
          <span onClick={() => navigate("/explore")} className={linkStyle("/explore")}>
            Explore
          </span>
          <span onClick={() => navigate("/dashboard")} className={linkStyle("/dashboard")}>
            Dashboard
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* GitHub Icon
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white text-xl"
          >
            <FaGithub />
          </a> */}

          {/* CTA Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-linear-to-r from-purple-500 to-indigo-500 rounded-xl text-sm font-semibold hover:scale-105 transition"
          >
            Start
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;