import React, { useState, useEffect } from 'react';
import { PlusIcon, ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Community = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await api.get('/community/discussions');
      setDiscussions(response.data);
    } catch (error) {
      console.error('Failed to fetch discussions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community</h1>
        <button
          onClick={() => setShowNewPost(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Discussion
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
            All Discussions
          </button>
          <button className="py-2 px-1 text-gray-500 hover:text-gray-700">
            Questions
          </button>
          <button className="py-2 px-1 text-gray-500 hover:text-gray-700">
            Projects
          </button>
        </nav>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {discussions.length === 0 ? (
          <div className="text-center py-12">
            <ChatBubbleLeftIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No discussions yet. Start the conversation!</p>
          </div>
        ) : (
          discussions.map((discussion) => (
            <DiscussionCard key={discussion._id} discussion={discussion} />
          ))
        )}
      </div>

      {/* Mock discussions for demo */}
      <div className="space-y-4 mt-6">
        <DiscussionCard discussion={{
          _id: '1',
          title: 'How to implement backpropagation from scratch?',
          content: 'I\'m trying to understand the math behind backpropagation...',
          author: { profile: { firstName: 'John', lastName: 'Doe' } },
          createdAt: new Date().toISOString(),
          likes: ['1', '2'],
          replies: [{ content: 'Great question!' }],
          views: 45
        }} />
        
        <DiscussionCard discussion={{
          _id: '2',
          title: 'Best practices for data preprocessing',
          content: 'What are the most important steps in data preprocessing?',
          author: { profile: { firstName: 'Jane', lastName: 'Smith' } },
          createdAt: new Date().toISOString(),
          likes: ['1'],
          replies: [],
          views: 23
        }} />
      </div>
    </div>
  );
};

const DiscussionCard = ({ discussion }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {discussion.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {discussion.content}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>
            by {discussion.author?.profile?.firstName} {discussion.author?.profile?.lastName}
          </span>
          <span>•</span>
          <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{discussion.views || 0} views</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <HeartIcon className="h-4 w-4 mr-1" />
          {discussion.likes?.length || 0}
        </div>
        <div className="flex items-center">
          <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
          {discussion.replies?.length || 0}
        </div>
      </div>
    </div>
  </div>
);

export default Community;