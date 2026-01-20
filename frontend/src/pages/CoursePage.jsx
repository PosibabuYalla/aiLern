import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

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
          <button className="btn-primary">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;