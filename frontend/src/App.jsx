import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SkillAssessment from './pages/SkillAssessment';
import Mentorship from './pages/Mentorship';
import CourseCatalog from './pages/CourseCatalog';
import CompetencyFramework from './pages/CompetencyFramework';
import Profile from './pages/Profile';
import ExpertDirectory from './pages/ExpertDirectory';
import PeerEvaluation from './pages/PeerEvaluation';
import UserManagement from './pages/UserManagement';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />

            {/* Private Routes */}
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/expert-directory" 
              element={
                <PrivateRoute>
                  <Layout>
                    <ExpertDirectory />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/360-evaluations" 
              element={
                <PrivateRoute>
                  <Layout>
                    <PeerEvaluation />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/assessment" 
              element={
                <PrivateRoute>
                  <Layout>
                    <SkillAssessment />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/mentorship" 
              element={
                <PrivateRoute>
                  <Layout>
                    <Mentorship />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/training" 
              element={
                <PrivateRoute>
                  <Layout>
                    <CourseCatalog />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/courses" 
              element={
                <PrivateRoute>
                  <Layout>
                    <CourseCatalog />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/frameworks" 
              element={
                <PrivateRoute>
                  <Layout>
                    <CompetencyFramework />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/competencies" 
              element={
                <PrivateRoute>
                  <Layout>
                    <CompetencyFramework />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <PrivateRoute>
                  <Layout>
                    <UserManagement />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </PrivateRoute>
              } 
            />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}
