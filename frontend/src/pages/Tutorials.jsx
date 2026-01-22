import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { 
  PlayIcon, 
  PlusIcon, 
  ClockIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Tutorials = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState({
    topic: '',
    description: '',
    difficulty: 'beginner',
    duration: '15'
  });
  const [customTutorials, setCustomTutorials] = useState(user?.customTutorials || []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    
    if (!requestForm.topic.trim()) {
      showToast('Please enter a topic', 'error');
      return;
    }

    // Generate mock video tutorial
    const newTutorial = {
      id: Date.now().toString(),
      title: `${requestForm.topic} Tutorial`,
      description: requestForm.description || `Learn ${requestForm.topic} from basics to advanced concepts`,
      difficulty: requestForm.difficulty,
      duration: parseInt(requestForm.duration),
      videoId: 'dQw4w9WgXcQ', // Mock video ID
      status: 'generated',
      requestedAt: new Date(),
      topic: requestForm.topic
    };

    const updatedTutorials = [...customTutorials, newTutorial];
    setCustomTutorials(updatedTutorials);
    
    // Update user profile
    updateUser({ customTutorials: updatedTutorials });
    
    // Add to recent activity
    const newActivity = {
      id: Date.now(),
      title: `Generated tutorial: ${requestForm.topic}`,
      timestamp: new Date(),
      type: 'request'
    };
    
    const currentActivity = user?.recentActivity || [];
    const updatedActivity = [newActivity, ...currentActivity].slice(0, 5);
    updateUser({ recentActivity: updatedActivity });

    setRequestForm({ topic: '', description: '', difficulty: 'beginner', duration: '15' });
    setShowRequestForm(false);
    showToast('Tutorial generated successfully! 🎉', 'success');
  };

  const sampleTutorials = [
    {
      id: 'sample1',
      title: 'React Hooks Deep Dive',
      description: 'Master React hooks with practical examples',
      difficulty: 'intermediate',
      duration: 25,
      videoId: 'O6P86uwfdR0',
      status: 'available'
    },
    {
      id: 'sample2', 
      title: 'Python Data Structures',
      description: 'Complete guide to Python lists, dictionaries, and sets',
      difficulty: 'beginner',
      duration: 20,
      videoId: 'R-HLU9Fl5ug',
      status: 'available'
    },
    {
      id: 'sample3',
      title: 'Machine Learning Algorithms',
      description: 'Understanding classification and regression algorithms',
      difficulty: 'advanced',
      duration: 35,
      videoId: '7eh4d6sabA0',
      status: 'available'
    }
  ];

  const allTutorials = [...sampleTutorials, ...customTutorials];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Generate Your Own Tutorial
              </h1>
              <p className="text-xl text-gray-600">
                Request personalized video tutorials on any topic you want to learn
              </p>
            </div>
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Generate Tutorial
            </button>
          </div>
        </div>

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTutorials.map(tutorial => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>

        {allTutorials.length === 0 && (
          <div className="text-center py-12">
            <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No tutorials yet</h3>
            <p className="text-gray-600 mb-6">Generate your first custom tutorial to get started</p>
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Generate Tutorial
            </button>
          </div>
        )}

        {/* Request Form Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">Generate Custom Tutorial</h3>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleRequestSubmit} className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic *
                  </label>
                  <input
                    type="text"
                    value={requestForm.topic}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="e.g., Advanced React Patterns, Docker Containers, Neural Networks"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={requestForm.description}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what specific aspects you'd like to learn..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={requestForm.difficulty}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Duration (minutes)
                    </label>
                    <select
                      value={requestForm.duration}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="20">20 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Generate Tutorial
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TutorialCard = ({ tutorial }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleWatchTutorial = () => {
    window.open(`https://www.youtube.com/watch?v=${tutorial.videoId}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
        <PlayIcon className="h-16 w-16 text-white opacity-80" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
            {tutorial.difficulty}
          </span>
        </div>
        {tutorial.status === 'generated' && (
          <div className="absolute top-4 left-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Custom
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {tutorial.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {tutorial.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            {tutorial.duration} min
          </div>
          {tutorial.requestedAt && (
            <span className="text-xs">
              Requested {new Date(tutorial.requestedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        
        <button
          onClick={handleWatchTutorial}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <PlayIcon className="h-4 w-4 mr-2" />
          Watch Tutorial
        </button>
      </div>
    </div>
  );
};

export default Tutorials;