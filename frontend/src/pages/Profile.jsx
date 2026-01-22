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
              <h3 className="text-lg font-semibold">Your Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(user?.gamification?.badges || ['first-course', 'python-master']).map((badge, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <TrophyIcon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <p className="font-medium capitalize">{badge.replace('-', ' ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Learning Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Study Streak</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {user?.gamification?.streak || 0} days
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Total Points</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {user?.gamification?.points || 0}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;