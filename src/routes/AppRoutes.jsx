import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Visualizer from "../pages/Visualizer";
import Explore from "../pages/Explore";
import Login from "../pages/Login";

const AppRoutes = ({user}) => {
  return (
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/explore" element={<Explore user={user}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visualizer/:type" element={<Visualizer />} />
      </Routes>
  );
};

export default AppRoutes;