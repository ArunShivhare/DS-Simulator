import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Visualizer from "../pages/Visualizer";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import ArrayPage from "../pages/Array";
import StackPage from "../pages/Stack";

const AppRoutes = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={<Login user={user} />} />
      <Route path="/learn/array" element={<ArrayPage />} />
      <Route path="/learn/stack" element={<StackPage />} />

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
