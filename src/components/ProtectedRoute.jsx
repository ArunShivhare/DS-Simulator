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
      <div className="h-screen flex items-center justify-center text-black text-2xl font-bold">
        Loading...
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