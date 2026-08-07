import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SkillProfile from "./pages/SkillProfile";
import Competencies from "./pages/Competencies";
import GapAnalysis from "./pages/GapAnalysis";
import Learning from "./pages/Learning";
import Assessments from "./pages/Assessments";
import Knowledge from "./pages/Knowledge";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/skills" element={<Protected><SkillProfile /></Protected>} />
      <Route path="/competencies" element={<Protected><Competencies /></Protected>} />
      <Route path="/gaps" element={<Protected><GapAnalysis /></Protected>} />
      <Route path="/learning" element={<Protected><Learning /></Protected>} />
      <Route path="/assessments" element={<Protected><Assessments /></Protected>} />
      <Route path="/knowledge" element={<Protected><Knowledge /></Protected>} />
      <Route path="/analytics" element={<Protected><Analytics /></Protected>} />
      <Route path="/notifications" element={<Protected><Notifications /></Protected>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
