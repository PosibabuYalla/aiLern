import React from 'react';

const TestProfile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Test Page</h1>
        
        {/* Test Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
              Profile
            </button>
            <button className="py-2 px-1 text-gray-500">
              Achievements
            </button>
            <button className="py-2 px-1 text-gray-500">
              Analytics
            </button>
            <button className="py-2 px-1 text-gray-500">
              Settings
            </button>
          </nav>
        </div>

        {/* Test Content */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold">Test Data:</h3>
            <p>Level: 3</p>
            <p>Points: 1250</p>
            <p>Badges: 4</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold">Analytics:</h3>
            <p>Python: 75%</p>
            <p>JavaScript: 60%</p>
            <p>Study Hours: 24</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold">Settings:</h3>
            <p>Difficulty: Intermediate</p>
            <p>Languages: Python, JavaScript</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProfile;