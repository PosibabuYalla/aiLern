import React, { useState, useEffect } from 'react';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

const DemoVideo = ({ isOpen, onClose }) => {
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    {
      title: "Welcome to aiLern",
      description: "Your AI-powered learning companion for mastering technology",
      duration: 4000,
      background: "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700",
      visual: (
        <div className="text-center">
          <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <SparklesIcon className="h-20 w-20 text-white" />
          </div>
        </div>
      )
    },
    {
      title: "Learn Multiple Languages",
      description: "Master Python, JavaScript, Java, C++, and more with AI guidance",
      duration: 5000,
      background: "bg-gradient-to-br from-green-500 via-teal-500 to-blue-600",
      visual: (
        <div className="grid grid-cols-4 gap-8 mb-12 max-w-3xl mx-auto">
          <div className="bg-yellow-500 p-8 rounded-xl transform hover:scale-110 transition-transform animate-fade-in">
            <div className="text-5xl font-bold text-black">PY</div>
            <div className="text-lg text-black mt-2">Python</div>
          </div>
          <div className="bg-yellow-400 p-8 rounded-xl transform hover:scale-110 transition-transform animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-5xl font-bold text-black">JS</div>
            <div className="text-lg text-black mt-2">JavaScript</div>
          </div>
          <div className="bg-red-600 p-8 rounded-xl transform hover:scale-110 transition-transform animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="text-4xl font-bold text-white">JAVA</div>
            <div className="text-lg text-white mt-2">Java</div>
          </div>
          <div className="bg-blue-600 p-8 rounded-xl transform hover:scale-110 transition-transform animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div className="text-5xl font-bold text-white">C++</div>
            <div className="text-lg text-white mt-2">C Plus</div>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Coding",
      description: "Practice with real-world projects and get instant AI feedback",
      duration: 5000,
      background: "bg-gradient-to-br from-purple-600 via-pink-600 to-red-600",
      visual: (
        <div className="bg-gray-900 bg-opacity-80 rounded-lg p-10 mb-8 text-left max-w-3xl mx-auto">
          <div className="flex space-x-2 mb-6">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-3 font-mono text-xl">
            <div className="text-blue-300 animate-typing">def learn_ai():</div>
            <div className="text-white ml-8 animate-typing" style={{animationDelay: '0.8s'}}>return "Smart Learning!"</div>
            <div className="text-green-400 animate-typing" style={{animationDelay: '1.6s'}}># AI helps you code better</div>
          </div>
        </div>
      )
    },
    {
      title: "Track Your Progress",
      description: "Monitor your growth with detailed analytics and achievements",
      duration: 4000,
      background: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
      visual: (
        <div className="text-center">
          <div className="flex items-end justify-center space-x-6 mb-12">
            <div className="bg-white bg-opacity-60 rounded-t w-16 animate-grow-bar" style={{height: '80px'}}></div>
            <div className="bg-white bg-opacity-60 rounded-t w-16 animate-grow-bar" style={{height: '120px', animationDelay: '0.3s'}}></div>
            <div className="bg-white bg-opacity-60 rounded-t w-16 animate-grow-bar" style={{height: '160px', animationDelay: '0.6s'}}></div>
            <div className="bg-white bg-opacity-60 rounded-t w-16 animate-grow-bar" style={{height: '200px', animationDelay: '0.9s'}}></div>
          </div>
          <div className="flex justify-center space-x-16">
            <div className="text-center">
              <div className="text-6xl font-bold">85%</div>
              <div className="text-xl opacity-80">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold">12</div>
              <div className="text-xl opacity-80">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold">🏆</div>
              <div className="text-xl opacity-80">Achievements</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Join Our Community",
      description: "Connect with 50,000+ learners and grow together",
      duration: 4000,
      background: "bg-gradient-to-br from-teal-500 via-green-500 to-emerald-600",
      visual: (
        <div className="text-center">
          <div className="flex justify-center items-center mb-12 space-x-8">
            <div className="w-24 h-24 bg-white bg-opacity-30 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl">👨💻</span>
            </div>
            <div className="w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center animate-pulse" style={{animationDelay: '0.2s'}}>
              <span className="text-3xl">👩💻</span>
            </div>
            <div className="w-24 h-24 bg-white bg-opacity-30 rounded-full flex items-center justify-center animate-pulse" style={{animationDelay: '0.4s'}}>
              <span className="text-4xl">🧑💻</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold">50K+</div>
              <div className="text-lg">Learners</div>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold">1000+</div>
              <div className="text-lg">Projects</div>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-lg">Support</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(prev => prev + 1);
      } else {
        setCurrentScene(0); // Loop back to start
      }
    }, scenes[currentScene].duration);

    return () => clearTimeout(timer);
  }, [isOpen, currentScene, scenes]);

  const handleClose = () => {
    setCurrentScene(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-7xl max-h-screen">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
        >
          <XMarkIcon className="h-8 w-8 text-white" />
        </button>

        {/* Video Scene */}
        <div className={`w-full h-full ${scenes[currentScene].background} flex flex-col items-center justify-center text-white transition-all duration-1000`}>
          <div className="text-center p-16 max-w-7xl">
            {/* Visual Element */}
            <div className="mb-16 transform scale-125">
              {scenes[currentScene].visual}
            </div>
            
            <h1 className="text-6xl md:text-9xl font-bold mb-12 animate-fade-in">
              {scenes[currentScene].title}
            </h1>
            <p className="text-3xl md:text-4xl opacity-90 animate-slide-up max-w-5xl mx-auto leading-relaxed">
              {scenes[currentScene].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoVideo;