import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

/* ── Pages (app shell) ── */
import DashboardPage from "../pages/DashboardPage";
import KnowledgeSharingPage from "../pages/KnowledgeSharingPage";
import MentorshipPage from "../pages/MentorshipPage";
import LearningProgressPage from "../pages/LearningProgressPage";
import AssessmentPage from "../pages/AssessmentPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import ReportsPage from "../pages/ReportsPage";
import NotificationsPage from "../pages/NotificationsPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

/* ── Pages (standalone) ── */
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
    /* ── Authenticated routes (wrapped in AppLayout) ── */
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: "knowledge-sharing", element: <KnowledgeSharingPage /> },
            { path: "mentorship", element: <MentorshipPage /> },
            { path: "learning-progress", element: <LearningProgressPage /> },
            { path: "assessment", element: <AssessmentPage /> },
            { path: "analytics", element: <AnalyticsPage /> },
            { path: "reports", element: <ReportsPage /> },
            { path: "notifications", element: <NotificationsPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },

    /* ── Public routes (no app shell) ── */
    { path: "/login", element: <LoginPage /> },
]);

export default router;
