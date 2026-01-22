import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  SparklesIcon,
  PlayIcon,
  CheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import logo from '../assets/images/logo.jpeg';
import DemoVideo from '../components/DemoVideo';

const Landing = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Master AI with
              <span className="text-gradient block mt-2">Smart Learning</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your AI journey with personalized courses, intelligent mentoring, 
              and hands-on projects tailored to your skill level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/register"
                className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Start Learning Free
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center"
              >
                <PlayIcon className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-yellow-200 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose aiLern?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of AI education with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: SparklesIcon,
                title: 'AI-Powered Learning',
                description: 'Personalized paths powered by advanced AI algorithms',
                color: 'bg-blue-500'
              },
              {
                icon: AcademicCapIcon,
                title: 'Expert Content',
                description: 'Curated courses from industry experts and practitioners',
                color: 'bg-green-500'
              },
              {
                icon: ChartBarIcon,
                title: 'Progress Tracking',
                description: 'Detailed analytics and gamification to stay motivated',
                color: 'bg-purple-500'
              },
              {
                icon: UserGroupIcon,
                title: 'Community Learning',
                description: 'Connect with peers in our vibrant learning community',
                color: 'bg-orange-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Everything you need to master AI
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                From beginner to expert, our platform adapts to your learning style and pace.
              </p>
              
              <div className="space-y-6">
                {[
                  'Personalized learning paths based on your skill level',
                  'Interactive coding exercises and real-world projects',
                  'AI mentor for instant help and code reviews',
                  'Multi-language support for global accessibility',
                  'Gamification with points, badges, and leaderboards',
                  'Community forums and peer collaboration'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-200">
                      <CheckIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-8 m-8 shadow-xl transform -rotate-3">
                  <div className="text-center">
                    <SparklesIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered</h3>
                    <p className="text-gray-600">Smart Learning Platform</p>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-semibold shadow-lg animate-bounce">
                🏆 #1 AI Course
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-400 text-green-900 px-4 py-2 rounded-full font-semibold shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                ⚡ Fast Learning
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to start your AI journey?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join thousands of learners who are already mastering AI with our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="group bg-white text-blue-600 px-10 py-4 text-xl font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Get Started Free
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-10 py-4 text-xl font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={logo} 
              alt="aiLern Logo" 
              className="w-12 h-12 rounded-lg object-cover mr-3"
            />
            <span className="text-2xl font-bold">aiLern</span>
          </div>
          <p className="text-gray-400">
            © 2024 aiLern - AI-Powered Learning Platform. All rights reserved.
          </p>
        </div>
      </div>

      {/* Demo Video Modal */}
      <DemoVideo 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />
    </div>
  );
};

export default Landing;