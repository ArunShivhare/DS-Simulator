import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Visualizer from "../pages/Visualizer";
import Explore from "../pages/Explore";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visualizer/:type" element={<Visualizer />} />
      </Routes>
  );
};

export default AppRoutes;