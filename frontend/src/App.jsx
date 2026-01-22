import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LanguageProvider } from './hooks/useLanguage';
import { ToastProvider } from './hooks/useToast';

// Components
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import DiagnosticTest from './pages/DiagnosticTest';
import Courses from './pages/Courses';
import Tutorials from './pages/Tutorials';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import Community from './pages/Community';
import Profile from './pages/Profile';

// Auth Guard Component
const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/dashboard" replace />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <main>
                <Routes>
                  {/* Public Routes - redirect to dashboard if logged in */}
                  <Route path="/" element={
                    <PublicRoute>
                      <Landing />
                    </PublicRoute>
                  } />
                  <Route path="/login" element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } />
                  <Route path="/register" element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  } />
                  <Route path="/forgot-password" element={
                    <PublicRoute>
                      <ForgotPassword />
                    </PublicRoute>
                  } />
                  
                  {/* Protected Routes - require authentication */}
                  <Route path="/dashboard" element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  } />
                  <Route path="/diagnostic" element={
                    <AuthGuard>
                      <DiagnosticTest />
                    </AuthGuard>
                  } />
                  <Route path="/courses" element={
                    <AuthGuard>
                      <Courses />
                    </AuthGuard>
                  } />
                  <Route path="/tutorials" element={
                    <AuthGuard>
                      <Tutorials />
                    </AuthGuard>
                  } />
                  <Route path="/course/:id" element={
                    <AuthGuard>
                      <CoursePage />
                    </AuthGuard>
                  } />
                  <Route path="/lesson/:id" element={
                    <AuthGuard>
                      <LessonPage />
                    </AuthGuard>
                  } />
                  <Route path="/community" element={
                    <AuthGuard>
                      <Community />
                    </AuthGuard>
                  } />
                  <Route path="/profile" element={
                    <AuthGuard>
                      <Profile />
                    </AuthGuard>
                  } />
                  
                  {/* Catch all route - redirect to login */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;