import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const CoursePage = () => {
  const { id } = useParams();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetchCourse();
    // Check if course is already completed
    const completedCourses = user?.completedCourses || [];
    setIsCompleted(completedCourses.includes(id));
  }, [id, user]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseComplete = () => {
    if (isCompleted) return;
    
    const completedCourses = user?.completedCourses || [];
    const newCompletedCourses = [...completedCourses, id];
    const coursesCompleted = (user?.coursesCompleted || 0) + 1;
    const totalTimeSpent = (user?.totalTimeSpent || 0) + (course?.estimatedDuration || 0);
    
    // Award points based on course difficulty
    const pointsMap = {
      'beginner': 50,
      'intermediate': 100,
      'advanced': 150,
      'expert': 200
    };
    const coursePoints = pointsMap[course?.difficulty] || 50;
    const currentPoints = user?.gamification?.points || 0;
    const newPoints = currentPoints + coursePoints;
    
    // Add to recent activity
    const newActivity = {
      id: Date.now(),
      title: `Completed course: ${course.title}`,
      timestamp: new Date(),
      type: 'completion'
    };
    
    const currentActivity = user?.recentActivity || [];
    const updatedActivity = [newActivity, ...currentActivity].slice(0, 5);
    
    updateUser({
      completedCourses: newCompletedCourses,
      coursesCompleted,
      totalTimeSpent,
      recentActivity: updatedActivity,
      gamification: {
        ...user?.gamification,
        points: newPoints
      }
    });
    
    setIsCompleted(true);
    showToast(`Course completed! +${coursePoints} points earned! 🎉`, 'success');
  };

  if (loading) return <LoadingSpinner />;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {course.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {course.description}
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {course.estimatedDuration} min
            </div>
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              {course.difficulty}
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              {(() => {
                const pointsMap = {
                  'beginner': 50,
                  'intermediate': 100,
                  'advanced': 150,
                  'expert': 200
                };
                return pointsMap[course.difficulty] || 50;
              })()} points
            </div>
          </div>
        </div>

        {course.content?.videoUrl && (
          <div className="mb-8">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={course.content.videoUrl}
                title={course.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <p>{course.content?.textContent || 'Course content coming soon...'}</p>
        </div>

        <div className="mt-8">
          <button 
            onClick={handleCourseComplete}
            disabled={isCompleted}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isCompleted 
                ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCompleted ? '✓ Course Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;