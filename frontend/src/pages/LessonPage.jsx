import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const LessonPage = () => {
  const { id } = useParams();
  const [showAIChat, setShowAIChat] = useState(false);
  const [question, setQuestion] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Lesson: Introduction to Machine Learning</h1>
            
            {/* Video Player */}
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-6">
              <PlayIcon className="h-16 w-16 text-white" />
            </div>

            {/* Lesson Content */}
            <div className="prose dark:prose-invert max-w-none">
              <p>Welcome to this comprehensive lesson on Machine Learning fundamentals...</p>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Try it yourself</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400">
              <div># Python code editor</div>
              <div>import numpy as np</div>
              <div>print("Hello, AI World!")</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Assistant */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Assistant</h3>
              <button
                onClick={() => setShowAIChat(!showAIChat)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <ChatBubbleLeftIcon className="h-5 w-5" />
              </button>
            </div>
            
            {showAIChat && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm">Hi! I'm your AI tutor. Ask me anything about this lesson!</p>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 input-field text-sm"
                  />
                  <button className="btn-primary px-3 py-2 text-sm">Ask</button>
                </div>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Lesson Progress</span>
                <span>75%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;