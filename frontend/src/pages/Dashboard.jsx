import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  TrophyIcon, 
  FireIcon,
  PlayIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [stats] = useState({
    coursesCompleted: 3,
    totalTimeSpent: 240,
    averageScore: 85
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const [recommendedCourses] = useState([
    {
      _id: '19',
      title: 'Machine Learning Fundamentals',
      description: 'Learn the core concepts of ML',
      difficulty: 'intermediate',
      estimatedDuration: 400,
      videoId: '7eh4d6sabA0',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop'
    },
    {
      _id: '20',
      title: 'Deep Learning with Python',
      description: 'Master neural networks and deep learning',
      difficulty: 'advanced',
      estimatedDuration: 450,
      videoId: 'tPYj3fFJGjk',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    },
    {
      _id: '2',
      title: 'Python for Beginners',
      description: 'Complete introduction to Python programming',
      difficulty: 'beginner',
      estimatedDuration: 200,
      videoId: 'rfscVS0vtbw',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    }
  ]);

  const [recentActivity] = useState([
    { title: 'Completed Python Basics', timestamp: new Date(), type: 'completion' },
    { title: 'Started ML Fundamentals', timestamp: new Date(), type: 'start' },
    { title: 'Earned Python Badge', timestamp: new Date(), type: 'achievement' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-4xl font-bold mb-3">
                  Welcome back, {user?.profile?.firstName || 'Student'}! 👋
                </h1>
                <p className="text-blue-100 text-xl mb-4">
                  Continue your AI learning journey
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                    <FireIcon className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{user?.gamification?.streak || 7} day streak</span>
                  </div>
                  <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                    <TrophyIcon className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Level {user?.gamification?.level || 3}</span>
                  </div>
                  <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{user?.gamification?.points || 1250} points</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <img 
                    src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-green-900 font-bold text-sm">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpenIcon}
            title="Courses Completed"
            value={stats.coursesCompleted}
            color="from-green-500 to-green-600"
            bgColor="bg-green-50"
            textColor="text-green-600"
          />
          <StatCard
            icon={ClockIcon}
            title="Hours Learned"
            value={Math.round(stats.totalTimeSpent / 60)}
            color="from-blue-500 to-blue-600"
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard
            icon={TrophyIcon}
            title="Total Points"
            value={user?.gamification?.points || 1250}
            color="from-yellow-500 to-yellow-600"
            bgColor="bg-yellow-50"
            textColor="text-yellow-600"
          />
          <StatCard
            icon={ChartBarIcon}
            title="Skill Level"
            value={user?.skillLevel || 'Intermediate'}
            color="from-purple-500 to-purple-600"
            bgColor="bg-purple-50"
            textColor="text-purple-600"
            isText={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommended Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <StarIcon className="h-7 w-7 mr-3 text-yellow-500" />
                  Recommended for You
                </h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  <Link to="/courses" className="flex items-center">
                    View All
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </button>
              </div>
              <div className="space-y-6">
                {recommendedCourses.map((course) => (
                  <CourseCard key={course._id} course={course} onVideoClick={setSelectedVideo} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/courses">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center">
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Continue Learning
                  </button>
                </Link>
                <Link to="/diagnostic">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200">
                    Take Assessment
                  </button>
                </Link>
                <Link to="/community">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200">
                    Join Community
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {selectedVideo.difficulty}
                  </span>
                  <span>{selectedVideo.estimatedDuration} min</span>
                </div>
                <Link
                  to={`/course/${selectedVideo._id}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setSelectedVideo(null)}
                >
                  View Full Course
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color, bgColor, textColor, isText = false }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
        <p className={`text-3xl font-bold ${isText ? 'capitalize' : ''} ${textColor}`}>
          {value}
        </p>
      </div>
      <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center`}>
        <Icon className={`h-7 w-7 ${textColor}`} />
      </div>
    </div>
  </div>
);

const CourseCard = ({ course, onVideoClick }) => (
  <div className="group flex items-center p-6 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
    <img 
      src={course.thumbnail} 
      alt={course.title}
      className="w-20 h-20 rounded-xl object-cover mr-6 group-hover:scale-105 transition-transform duration-300"
    />
    <div className="flex-1">
      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
        {course.title}
      </h3>
      <p className="text-gray-600 mb-3">{course.description}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
          {course.difficulty}
        </span>
        <span>{course.estimatedDuration} min</span>
      </div>
    </div>
    <div className="ml-4 flex space-x-2">
      <button
        onClick={() => onVideoClick(course)}
        className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 group"
        title="Watch Video"
      >
        <PlayIcon className="h-6 w-6 text-red-600 group-hover:text-white transition-colors duration-200" />
      </button>
      <Link to={`/course/${course._id}`}>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
          <ArrowRightIcon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-200" />
        </div>
      </Link>
    </div>
  </div>
);

const ActivityItem = ({ activity }) => (
  <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
    <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
    <div className="flex-1">
      <p className="font-medium text-gray-900">{activity.title}</p>
      <p className="text-sm text-gray-500">
        {activity.timestamp.toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default Dashboard;