import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Visualizer from "../pages/Visualizer";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={<Login user={user}/>} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/visualizer/:type"
        element={
          <ProtectedRoute user={user}>
            <Visualizer />
          </ProtectedRoute>
        }
      />

      <Route path="/explore" element={<Explore user={user} />} />
    </Routes>
  );
};

export default AppRoutes;
