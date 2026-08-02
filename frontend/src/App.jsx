import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AppProvider } from "./context/AppContext";

import AuthFlow from "./pages/AuthFlow";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import GapAnalysis from "./pages/GapAnalysis";
import Assessment from "./pages/Assessment";
import SkillInventory from "./pages/SkillInventory";
import LearningProgress from "./pages/LearningProgress";
import KnowledgeSharing from "./pages/KnowledgeSharing";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import AdminConsole from "./pages/AdminConsole";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthFlow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gapanalysis" element={<GapAnalysis />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/skillinventory" element={<SkillInventory />} />
          <Route path="/learningprogress" element={<LearningProgress />} />
          <Route path="/mentors" element={<KnowledgeSharing />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/admin" element={<AdminConsole />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}