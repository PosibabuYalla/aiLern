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
    // Initialize with demo user if no users exist
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (storedUsers.length === 0) {
      const demoUser = {
        id: 'demo-user',
        email: 'student@deepu.ai',
        password: 'password123',
        profile: {
          firstName: 'Demo',
          lastName: 'Student',
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
      localStorage.setItem('registeredUsers', JSON.stringify([demoUser]));
    }
    
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
    
    // Check stored users for valid credentials
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const validUser = storedUsers.find(user => 
      user.email === email && user.password === password
    );
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (validUser) {
          const userProfile = {
            id: validUser.id,
            email: validUser.email,
            profile: validUser.profile,
            skillLevel: validUser.skillLevel || 'beginner',
            coursesCompleted: validUser.coursesCompleted || 0,
            totalTimeSpent: validUser.totalTimeSpent || 0,
            completedVideos: validUser.completedVideos || [],
            gamification: validUser.gamification || {
              points: 0,
              level: 1,
              badges: [],
              streak: 0
            }
          };
          
          setUser(userProfile);
          localStorage.setItem('user', JSON.stringify(userProfile));
          setLoading(false);
          resolve({ success: true });
        } else {
          setLoading(false);
          resolve({ success: false, message: 'Invalid email or password' });
        }
      }, 1000);
    });
  };

  const register = async (userData) => {
    setLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const existingUser = storedUsers.find(user => user.email === userData.email);
        
        if (existingUser) {
          setLoading(false);
          resolve({ success: false, message: 'User already exists with this email' });
          return;
        }
        
        const newUser = {
          id: Date.now().toString(),
          email: userData.email,
          password: userData.password,
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
        
        // Store user in registered users list
        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        // Set as current user
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedCredentials');
    setUser(null);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Also update the user in registeredUsers list
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = storedUsers.map(storedUser => 
      storedUser.id === user.id ? { ...storedUser, ...userData } : storedUser
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
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