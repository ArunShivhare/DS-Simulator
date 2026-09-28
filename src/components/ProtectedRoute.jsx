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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 font-sans relative overflow-hidden">

      {/* Subtle background decoration */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[420px]
          h-[420px]
          rounded-full
          bg-indigo-100/40
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-0
          right-0
          w-72
          h-72
          rounded-full
          bg-violet-100/30
          blur-3xl
          pointer-events-none
        "
      />

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo */}
        <div className="relative mb-8">

          {/* Soft logo background */}
          <div
            className="
              absolute
              inset-0
              rounded-2xl
              bg-indigo-100
              blur-xl
              opacity-70
              scale-125
              animate-pulse
            "
          />

          <div
            className="
              relative
              h-20
              w-20
              rounded-2xl
              bg-white
              border
              border-slate-200
              shadow-sm
              flex
              items-center
              justify-center
            "
          >
            <img
              width={58}
              src="/logo.png"
              alt="DSAVerse Logo"
              className="object-contain"
            />
          </div>
        </div>

        {/* Loading indicator */}
        <div className="relative mb-6">

          <div
            className="
              h-10
              w-10
              rounded-full
              border-[3px]
              border-slate-200
              border-t-indigo-600
              animate-spin
            "
          />

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          </div>

        </div>

        {/* Text */}
        <div className="text-center">

          <h2
            className="
              text-lg
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            Preparing your learning space
          </h2>

          <p
            className="
              mt-2
              text-xs
              font-medium
              text-slate-400
            "
          >
            Checking your session securely...
          </p>

        </div>

        {/* Small progress indicator */}
        <div
          className="
            mt-7
            flex
            items-center
            gap-1.5
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-indigo-500
              animate-pulse
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-indigo-300
              animate-pulse
              [animation-delay:150ms]
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-indigo-200
              animate-pulse
              [animation-delay:300ms]
            "
          />
        </div>

      </div>

      {/* Footer */}
      <div
        className="
          absolute
          bottom-8
          left-0
          right-0
          flex
          justify-center
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-[9px]
            font-semibold
            tracking-[0.16em]
            uppercase
            text-slate-300
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Secure Authentication
        </div>
      </div>

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
