import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SkillInventory from "./pages/SkillInventory";
import GapAnalysis from "./pages/GapAnalysis";
import Training from "./pages/Training";
import Assessment from "./pages/Assessment";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";

// Optional 404 Page


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================
            Authentication Routes
        ========================== */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ==========================
            Dashboard
        ========================== */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ==========================
            Employee Modules
        ========================== */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/skills" element={<SkillInventory />} />
        <Route path="/gap-analysis" element={<GapAnalysis />} />
        <Route path="/training" element={<Training />} />
        <Route path="/assessment" element={<Assessment />} />

        {/* ==========================
            Analytics & Reports
        ========================== */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />

        {/* ==========================
            Notifications
        ========================== */}
        <Route path="/notifications" element={<Notifications />} />

        {/* ==========================
            Admin
        ========================== */}
        <Route path="/admin" element={<Admin />} />

        {/* ==========================
            404 Page
        ========================== */}
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;