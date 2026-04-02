import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden font-sans">
        <Navbar user={user} />
        {/* 1. Immersive Background Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>

        {/* 2. Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col-reverse md:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Next-Gen Learning Hub
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
              Master Data <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
                Structures
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed font-light">
              Stop memorizing code. Understand how data flows internally with
              <span className="text-white font-medium">
                {" "}
                interactive simulations
              </span>{" "}
              and
              <span className="text-white font-medium">
                {" "}
                visual mastery paths
              </span>
              .
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start pt-4">
              <button
                onClick={() => navigate(user ? "/dashboard" : "/login")}
                className="px-8 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Start Learning
              </button>

              <button
                onClick={() => navigate("/explore")}
                className="px-8 py-4 border-2 border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all active:scale-95"
              >
                Explore Features
              </button>
            </div>

            {/* Mini Stats Footer */}
            <div className="flex items-center gap-8 pt-8 opacity-40 justify-center md:justify-start">
              <div>
                <p className="text-2xl font-black">20+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">
                  Animations
                </p>
              </div>
              <div className="h-8 w-px bg-gray-800"></div>
              <div>
                <p className="text-2xl font-black">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">
                  Interactive
                </p>
              </div>
            </div>
          </div>

          {/* Right Illustration with Floating Effect */}
          <div className="flex-1 flex justify-center relative animate-float">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full scale-75"></div>

            <img
              src="https://illustrations.popsy.co/gray/work-from-home.svg"
              // src="logo.png"
              alt="hero"
              className="relative z-10 w-[85%] md:w-full drop-shadow-2xl"
            />

            {/* Floating Badge Detail */}
            <div className="absolute top-10 right-0 md:-right-4 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">
                    Verified Content
                  </p>
                  <p className="text-xs font-bold text-white">
                    Algorithmically Correct
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global CSS for Animations */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `,
          }}
        />
      </div>
    </>
  );
};

export default Home;
