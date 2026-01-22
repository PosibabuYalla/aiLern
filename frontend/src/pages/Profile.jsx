import React, { useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { 
  UserCircleIcon, 
  CogIcon, 
  TrophyIcon, 
  ChartBarIcon,
  CameraIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    email: user?.email || '',
    language: user?.profile?.language || 'en'
  });

  const [settings, setSettings] = useState({
    difficulty: user?.settings?.difficulty || 'intermediate',
    pace: user?.settings?.pace || 'normal',
    languages: user?.settings?.languages || ['Python', 'JavaScript'],
    emailNotifications: user?.settings?.emailNotifications ?? true,
    courseReminders: user?.settings?.courseReminders ?? true,
    achievementAlerts: user?.settings?.achievementAlerts ?? true,
    communityUpdates: user?.settings?.communityUpdates ?? false,
    darkMode: user?.settings?.darkMode ?? false,
    reducedMotion: user?.settings?.reducedMotion ?? false,
    fontSize: user?.settings?.fontSize || 'medium',
    showProfile: user?.settings?.showProfile ?? true,
    shareProgress: user?.settings?.shareProgress ?? true,
    allowMessages: user?.settings?.allowMessages ?? true,
    aiFeedback: user?.settings?.aiFeedback || 'balanced',
    autoSuggest: user?.settings?.autoSuggest ?? true,
    errorDetection: user?.settings?.errorDetection ?? true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user profile logic here
      updateUser({ profile: formData });
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user settings logic here
      updateUser({ settings });
      showToast('Settings saved successfully!', 'success');
    } catch (error) {
      showToast('Failed to save settings', 'error');
    }
  };

  const handleLanguageToggle = (lang) => {
    setSettings(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        updateUser({ 
          profile: { 
            ...user.profile, 
            avatar: imageUrl 
          } 
        });
        showToast('Profile picture updated!', 'success');
        setShowImageOptions(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    updateUser({ 
      profile: { 
        ...user.profile, 
        avatar: null 
      } 
    });
    showToast('Profile picture removed!', 'success');
    setShowImageOptions(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
    setShowImageOptions(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
    { id: 'achievements', label: 'Achievements', icon: TrophyIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white object-cover"
              />
              <button
                onClick={() => setShowImageOptions(!showImageOptions)}
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <CameraIcon className="h-4 w-4 text-gray-600" />
              </button>
              
              {/* Image Options Dropdown */}
              {showImageOptions && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <button
                    onClick={triggerFileInput}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Upload New
                  </button>
                  {user?.profile?.avatar && (
                    <button
                      onClick={handleDeleteImage}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h1>
              <p className="text-blue-100">
                Level {user?.gamification?.level || 1} • {user?.gamification?.points || 0} points
              </p>
            </div>
          </div>
          
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                  className="input-field"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </form>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Your Achievements</h3>
                <div className="text-sm text-gray-500">
                  {(user?.gamification?.badges || ['first-course', 'python-master']).length} badges earned
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(user?.gamification?.badges || ['first-course', 'python-master']).map((badgeId, index) => {
                  const badgeInfo = {
                    'first-course': { name: 'First Course', description: 'Completed your first course', icon: '🎓', date: '2024-01-15' },
                    'python-master': { name: 'Python Master', description: 'Completed Python fundamentals', icon: '🐍', date: '2024-01-20' },
                    'streak-7': { name: '7-Day Streak', description: 'Learned for 7 consecutive days', icon: '🔥', date: '2024-01-22' },
                    'code-reviewer': { name: 'Code Reviewer', description: 'Helped community members', icon: '👨‍💻', date: '2024-01-25' }
                  }[badgeId] || { name: badgeId.replace('-', ' '), description: 'Achievement unlocked', icon: '🏆', date: '2024-01-01' };
                  
                  return (
                    <div 
                      key={index} 
                      className="relative p-6 rounded-xl border-2 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-4xl mb-3">{badgeInfo.icon}</div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900">
                          {badgeInfo.name}
                        </h4>
                        <p className="text-sm mb-3 text-gray-700">
                          {badgeInfo.description}
                        </p>
                        <div className="text-xs text-green-600 font-medium">
                          Earned on {new Date(badgeInfo.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Progress Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mt-8">
                <h4 className="font-semibold text-lg mb-4">Achievement Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{(user?.gamification?.badges || ['first-course', 'python-master']).length}</div>
                    <div className="text-sm text-gray-600">Badges Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{user?.gamification?.points || 250}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{user?.gamification?.level || 2}</div>
                    <div className="text-sm text-gray-600">Current Level</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Learning Analytics</h3>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {user?.gamification?.streak || 0}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">Day Streak</div>
                  <div className="text-xs text-blue-600 mt-1">
                    {user?.gamification?.streak ? 'Keep it up!' : 'Start your journey!'}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {user?.gamification?.points || 0}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Total Points</div>
                  <div className="text-xs text-green-600 mt-1">
                    {user?.gamification?.points ? `+${Math.floor(user.gamification.points * 0.1)} today` : 'Earn your first points!'}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {user?.progress?.coursesCompleted || 0}
                  </div>
                  <div className="text-sm text-purple-700 font-medium">Courses Done</div>
                  <div className="text-xs text-purple-600 mt-1">
                    {user?.progress?.coursesCompleted ? `${user.progress.coursesInProgress || 1} in progress` : 'Start your first course!'}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {user?.progress?.studyHours || 0}
                  </div>
                  <div className="text-sm text-orange-700 font-medium">Study Hours</div>
                  <div className="text-xs text-orange-600 mt-1">This month</div>
                </div>
              </div>
              
              {/* Progress Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                  <h4 className="font-semibold mb-4">Weekly Activity</h4>
                  <div className="space-y-3">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      const hours = user?.analytics?.weeklyHours?.[index] || 0;
                      return (
                        <div key={day} className="flex items-center">
                          <div className="w-8 text-sm text-gray-600">{day}</div>
                          <div className="flex-1 mx-3">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: hours > 0 ? `${(hours / 3) * 100}%` : '0%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-12 text-sm text-gray-600 text-right">{hours}h</div>
                        </div>
                      );
                    })}
                  </div>
                  {!user?.analytics?.weeklyHours && (
                    <div className="text-center text-gray-500 text-sm mt-4">
                      Start learning to see your weekly activity
                    </div>
                  )}
                </div>
                
                {/* Skills Progress */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                  <h4 className="font-semibold mb-4">Skills Progress</h4>
                  <div className="space-y-4">
                    {[
                      { skill: 'Python', progress: user?.skills?.python || 0, color: 'bg-yellow-500' },
                      { skill: 'JavaScript', progress: user?.skills?.javascript || 0, color: 'bg-blue-500' },
                      { skill: 'React', progress: user?.skills?.react || 0, color: 'bg-cyan-500' },
                      { skill: 'AI/ML', progress: user?.skills?.aiml || 0, color: 'bg-purple-500' }
                    ].map((item) => (
                      <div key={item.skill}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{item.skill}</span>
                          <span className="text-gray-600">{item.progress}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full transition-all duration-700`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!user?.skills && (
                    <div className="text-center text-gray-500 text-sm mt-4">
                      Complete courses to track your skills
                    </div>
                  )}
                </div>
              </div>
              
              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learning Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                  <h4 className="font-semibold mb-4">Learning Statistics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Lessons Completed</span>
                      <span className="font-semibold">{user?.progress?.lessonsCompleted || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Exercises Solved</span>
                      <span className="font-semibold">{user?.progress?.exercisesSolved || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Projects Built</span>
                      <span className="font-semibold">{user?.progress?.projectsBuilt || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Code Reviews</span>
                      <span className="font-semibold">{user?.progress?.codeReviews || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Community Helps</span>
                      <span className="font-semibold">{user?.progress?.communityHelps || 0}</span>
                    </div>
                  </div>
                </div>
                
                {/* Performance Metrics */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                  <h4 className="font-semibold mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-semibold text-green-600">{user?.performance?.averageScore || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Best Streak</span>
                      <span className="font-semibold text-orange-600">{user?.performance?.bestStreak || 0} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time Saved by AI</span>
                      <span className="font-semibold text-blue-600">{user?.performance?.timeSaved || 0} hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rank in Community</span>
                      <span className="font-semibold text-purple-600">
                        {user?.performance?.communityRank ? `#${user.performance.communityRank}` : 'Unranked'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Learning Efficiency</span>
                      <span className="font-semibold text-teal-600">{user?.performance?.efficiency || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity or Getting Started */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                <h4 className="font-semibold mb-4">Recent Activity</h4>
                {user?.recentActivity?.length > 0 ? (
                  <div className="space-y-3">
                    {user.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'lesson' ? 'bg-blue-500' :
                          activity.type === 'achievement' ? 'bg-yellow-500' :
                          activity.type === 'project' ? 'bg-green-500' :
                          activity.type === 'community' ? 'bg-purple-500' : 'bg-orange-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.action}</div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h5 className="text-lg font-medium text-gray-600 mb-2">No Activity Yet</h5>
                    <p className="text-gray-500 text-sm mb-4">Start learning to see your progress and activity here</p>
                    <button className="btn-primary text-sm px-4 py-2">
                      Browse Courses
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Settings & Preferences</h3>
              
              {/* Learning Preferences */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-4">Learning Preferences</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                    <select 
                      className="input-field"
                      value={settings.difficulty}
                      onChange={(e) => setSettings(prev => ({ ...prev, difficulty: e.target.value }))}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Learning Pace</label>
                    <select 
                      className="input-field"
                      value={settings.pace}
                      onChange={(e) => setSettings(prev => ({ ...prev, pace: e.target.value }))}
                    >
                      <option value="slow">Slow & Steady</option>
                      <option value="normal">Normal</option>
                      <option value="fast">Fast Track</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Programming Languages</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js'].map(lang => (
                        <label key={lang} className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="rounded mr-2" 
                            checked={settings.languages.includes(lang)}
                            onChange={() => handleLanguageToggle(lang)}
                          />
                          <span className="text-sm">{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-4">Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Course Reminders</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.courseReminders}
                      onChange={(e) => setSettings(prev => ({ ...prev, courseReminders: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Achievement Alerts</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.achievementAlerts}
                      onChange={(e) => setSettings(prev => ({ ...prev, achievementAlerts: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Community Updates</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.communityUpdates}
                      onChange={(e) => setSettings(prev => ({ ...prev, communityUpdates: e.target.checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-4">Display Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.darkMode}
                      onChange={(e) => setSettings(prev => ({ ...prev, darkMode: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reduced Motion</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.reducedMotion}
                      onChange={(e) => setSettings(prev => ({ ...prev, reducedMotion: e.target.checked }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Font Size</label>
                    <select 
                      className="input-field"
                      value={settings.fontSize}
                      onChange={(e) => setSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-4">Privacy Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Show Profile to Community</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.showProfile}
                      onChange={(e) => setSettings(prev => ({ ...prev, showProfile: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Share Progress on Leaderboard</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.shareProgress}
                      onChange={(e) => setSettings(prev => ({ ...prev, shareProgress: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Allow Direct Messages</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.allowMessages}
                      onChange={(e) => setSettings(prev => ({ ...prev, allowMessages: e.target.checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* AI Settings */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-4">AI Assistant Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">AI Feedback Level</label>
                    <select 
                      className="input-field"
                      value={settings.aiFeedback}
                      onChange={(e) => setSettings(prev => ({ ...prev, aiFeedback: e.target.value }))}
                    >
                      <option value="minimal">Minimal</option>
                      <option value="balanced">Balanced</option>
                      <option value="detailed">Detailed</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auto-suggest Code Improvements</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.autoSuggest}
                      onChange={(e) => setSettings(prev => ({ ...prev, autoSuggest: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Real-time Error Detection</span>
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={settings.errorDetection}
                      onChange={(e) => setSettings(prev => ({ ...prev, errorDetection: e.target.checked }))}
                    />
                  </div>
                </div>
              </div>

              <button onClick={handleSettingsSubmit} className="btn-primary">
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;