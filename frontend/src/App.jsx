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
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import Community from './pages/Community';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
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
                  {/* Public Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/diagnostic" element={
                    <ProtectedRoute>
                      <DiagnosticTest />
                    </ProtectedRoute>
                  } />
                  <Route path="/courses" element={
                    <ProtectedRoute>
                      <Courses />
                    </ProtectedRoute>
                  } />
                  <Route path="/course/:id" element={
                    <ProtectedRoute>
                      <CoursePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/lesson/:id" element={
                    <ProtectedRoute>
                      <LessonPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/community" element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
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