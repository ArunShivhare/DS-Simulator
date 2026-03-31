import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Visualizer from "../pages/Visualizer";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import ArrayPage from "../pages/Array";
import StackPage from "../pages/Stack";
import QueuePage from "../pages/Queue";
import LinkedListPage from "../pages/LinkedList";
import Progress from "../pages/Progress";
import Quiz from "../pages/Quiz";
import Leaderboard from "../pages/Leaderboard";
import AdminQuiz from "../pages/AdminQuiz";

const AppRoutes = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={<Login user={user} />} />
      <Route path="/learn/array" element={<ArrayPage />} />
      <Route path="/learn/stack" element={<StackPage />} />
      <Route path="/learn/queue" element={<QueuePage />} />
      <Route path="/learn/linkedlist" element={<LinkedListPage />} />
      <Route path="/explore" element={<Explore user={user} />} />
      <Route path="/leaderboard" element={<Leaderboard />} />

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

      <Route
        path="/progress"
        element={
          <ProtectedRoute user={user}>
            <Progress />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/:type"
        element={
          <ProtectedRoute user={user}>
            <Quiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/:type/admin"
        element={
          <ProtectedRoute user={user}>
            <Quiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user}>
            <AdminQuiz />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
