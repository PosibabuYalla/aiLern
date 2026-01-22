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
          points: 1250,
          level: 3,
          badges: ['first-course', 'python-master', 'streak-7', 'code-reviewer'],
          streak: 7
        },
        progress: {
          coursesCompleted: 2,
          coursesInProgress: 1,
          lessonsCompleted: 15,
          exercisesSolved: 28,
          projectsBuilt: 3,
          codeReviews: 5,
          communityHelps: 8,
          studyHours: 24
        },
        skills: {
          python: 75,
          javascript: 60,
          react: 45,
          aiml: 30
        },
        performance: {
          averageScore: 87,
          bestStreak: 12,
          timeSaved: 18,
          communityRank: 156,
          efficiency: 92
        },
        analytics: {
          weeklyHours: [2, 3, 1, 4, 2, 5, 3]
        },
        recentActivity: [
          { type: 'lesson', action: 'Completed Python Functions', time: '2 hours ago' },
          { type: 'achievement', action: 'Earned Code Reviewer badge', time: '1 day ago' },
          { type: 'project', action: 'Built Weather App', time: '2 days ago' },
          { type: 'community', action: 'Helped 3 students', time: '3 days ago' }
        ],
        settings: {
          difficulty: 'intermediate',
          pace: 'normal',
          languages: ['Python', 'JavaScript'],
          emailNotifications: true,
          courseReminders: true,
          achievementAlerts: true,
          communityUpdates: false,
          darkMode: false,
          reducedMotion: false,
          fontSize: 'medium',
          showProfile: true,
          shareProgress: true,
          allowMessages: true,
          aiFeedback: 'balanced',
          autoSuggest: true,
          errorDetection: true
        }
      };
      localStorage.setItem('registeredUsers', JSON.stringify([demoUser]));
    }
    
    // Only restore user session if valid token exists
    const savedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');
    
    if (savedUser && authToken) {
      setUser(JSON.parse(savedUser));
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
            },
            progress: validUser.progress || {
              coursesCompleted: 0,
              coursesInProgress: 0,
              lessonsCompleted: 0,
              exercisesSolved: 0,
              projectsBuilt: 0,
              codeReviews: 0,
              communityHelps: 0,
              studyHours: 0
            },
            skills: validUser.skills || {
              python: 0,
              javascript: 0,
              react: 0,
              aiml: 0
            },
            performance: validUser.performance || {
              averageScore: 0,
              bestStreak: 0,
              timeSaved: 0,
              communityRank: null,
              efficiency: 0
            },
            analytics: validUser.analytics || {
              weeklyHours: [0, 0, 0, 0, 0, 0, 0]
            },
            recentActivity: validUser.recentActivity || [],
            settings: validUser.settings || {
              difficulty: 'intermediate',
              pace: 'normal',
              languages: ['Python', 'JavaScript'],
              emailNotifications: true,
              courseReminders: true,
              achievementAlerts: true,
              communityUpdates: false,
              darkMode: false,
              reducedMotion: false,
              fontSize: 'medium',
              showProfile: true,
              shareProgress: true,
              allowMessages: true,
              aiFeedback: 'balanced',
              autoSuggest: true,
              errorDetection: true
            }
          };
          
          setUser(userProfile);
          localStorage.setItem('user', JSON.stringify(userProfile));
          localStorage.setItem('authToken', 'valid-session-' + Date.now());
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
          },
          progress: {
            coursesCompleted: 0,
            coursesInProgress: 0,
            lessonsCompleted: 0,
            exercisesSolved: 0,
            projectsBuilt: 0,
            codeReviews: 0,
            communityHelps: 0,
            studyHours: 0
          },
          skills: {
            python: 0,
            javascript: 0,
            react: 0,
            aiml: 0
          },
          performance: {
            averageScore: 0,
            bestStreak: 0,
            timeSaved: 0,
            communityRank: null,
            efficiency: 0
          },
          analytics: {
            weeklyHours: [0, 0, 0, 0, 0, 0, 0]
          },
          recentActivity: [],
          settings: {
            difficulty: 'intermediate',
            pace: 'normal',
            languages: ['Python', 'JavaScript'],
            emailNotifications: true,
            courseReminders: true,
            achievementAlerts: true,
            communityUpdates: false,
            darkMode: false,
            reducedMotion: false,
            fontSize: 'medium',
            showProfile: true,
            shareProgress: true,
            allowMessages: true,
            aiFeedback: 'balanced',
            autoSuggest: true,
            errorDetection: true
          }
        };
        
        // Store user in registered users list
        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        // Set as current user
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('authToken', 'valid-session-' + Date.now());
        setLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
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