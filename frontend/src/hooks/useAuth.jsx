import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Check for remembered credentials and auto-login
      const savedCredentials = localStorage.getItem('rememberedCredentials');
      if (savedCredentials) {
        const { email, password } = JSON.parse(savedCredentials);
        login(email, password);
      }
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Mock login - accept any email/password
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email,
        profile: {
          firstName: email.split('@')[0],
          lastName: 'User',
          language: 'en'
        },
        skillLevel: 'beginner',
        coursesCompleted: 0,
        totalTimeSpent: 0,
        completedVideos: [],
        gamification: {
          points: 0,
          level: 1,
          badges: [],
          streak: 0
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoading(false);
    }, 1000);
    
    return { success: true };
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Mock registration
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email: userData.email,
        profile: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          language: userData.language || 'en'
        },
        skillLevel: 'beginner',
        coursesCompleted: 0,
        totalTimeSpent: 0,
        completedVideos: [],
        gamification: {
          points: 0,
          level: 1,
          badges: [],
          streak: 0
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoading(false);
    }, 1000);
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};