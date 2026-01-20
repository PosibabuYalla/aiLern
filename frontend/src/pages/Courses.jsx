import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PlayIcon,
  ClockIcon,
  StarIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Tutorial videos data
  const allVideos = {
    'programming': [
      { id: 'js1', title: 'JavaScript Fundamentals', videoId: 'PkZNo7MFNFg', duration: '3:26:42', description: 'Complete JavaScript tutorial for beginners', category: 'programming' },
      { id: 'py1', title: 'Python Full Course', videoId: 'rfscVS0vtbw', duration: '4:26:52', description: 'Learn Python programming from scratch', category: 'programming' },
      { id: 'java1', title: 'Java Programming', videoId: 'eIrMbAQSU34', duration: '12:18:11', description: 'Complete Java development course', category: 'programming' },
      { id: 'cpp1', title: 'C++ Programming', videoId: '8jLOx1hD3_o', duration: '31:11:51', description: 'Advanced C++ programming concepts', category: 'programming' },
      { id: 'cs1', title: 'C# Tutorial', videoId: 'GhQdlIFylQ8', duration: '4:31:26', description: 'C# programming for .NET development', category: 'programming' }
    ],
    'web-development': [
      { id: 'react1', title: 'React.js Complete Guide', videoId: 'Ke90Tje7VS0', duration: '11:55:27', description: 'Build modern web apps with React', category: 'web-development' },
      { id: 'node1', title: 'Node.js Backend', videoId: 'TlB_eWDSMt4', duration: '8:16:48', description: 'Server-side development with Node.js', category: 'web-development' },
      { id: 'html1', title: 'HTML & CSS Course', videoId: 'mU6anWqZJcc', duration: '11:00:27', description: 'Complete HTML and CSS tutorial', category: 'web-development' },
      { id: 'vue1', title: 'Vue.js Framework', videoId: 'FXpIoQ_rT_c', duration: '3:40:27', description: 'Progressive JavaScript framework', category: 'web-development' },
      { id: 'angular1', title: 'Angular Complete', videoId: 'k5E2AVpwsko', duration: '12:00:00', description: 'Full Angular development course', category: 'web-development' }
    ],
    'mobile-development': [
      { id: 'rn1', title: 'React Native Course', videoId: '0-S5a0eXPoc', duration: '6:06:50', description: 'Cross-platform mobile development', category: 'mobile-development' },
      { id: 'flutter1', title: 'Flutter Development', videoId: 'VPvVD8t02U8', duration: '37:27:00', description: 'Build apps with Flutter and Dart', category: 'mobile-development' },
      { id: 'ios1', title: 'iOS Swift Tutorial', videoId: '09TeUXjzpKs', duration: '10:30:15', description: 'Native iOS app development', category: 'mobile-development' },
      { id: 'android1', title: 'Android Kotlin', videoId: 'F9UC9DY-vIU', duration: '9:55:00', description: 'Android development with Kotlin', category: 'mobile-development' }
    ],
    'data-science': [
      { id: 'pyds1', title: 'Python Data Science', videoId: 'LHBE6Q9XlzI', duration: '12:00:00', description: 'Data analysis with Python', category: 'data-science' },
      { id: 'sql1', title: 'SQL Complete Course', videoId: 'HXV3zeQKqGY', duration: '4:20:00', description: 'Database management with SQL', category: 'data-science' },
      { id: 'r1', title: 'R Programming', videoId: '_V8eKsto3Ug', duration: '5:30:00', description: 'Statistical computing with R', category: 'data-science' },
      { id: 'tableau1', title: 'Tableau Tutorial', videoId: 'TPMlZxRRaBQ', duration: '3:45:00', description: 'Data visualization with Tableau', category: 'data-science' }
    ],
    'ai-ml': [
      { id: 'ml1', title: 'Machine Learning', videoId: '7eh4d6sabA0', duration: '11:00:00', description: 'ML algorithms with Python', category: 'ai-ml' },
      { id: 'dl1', title: 'Deep Learning TensorFlow', videoId: 'tPYj3fFJGjk', duration: '7:00:00', description: 'Neural networks and deep learning', category: 'ai-ml' },
      { id: 'nlp1', title: 'Natural Language Processing', videoId: 'fNxaJsNG3-s', duration: '5:30:00', description: 'Text processing and NLP', category: 'ai-ml' },
      { id: 'cv1', title: 'Computer Vision OpenCV', videoId: 'oXlwWbU8l2o', duration: '8:45:00', description: 'Image processing and computer vision', category: 'ai-ml' }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Courses', icon: ComputerDesktopIcon },
    { id: 'programming', name: 'Programming', icon: CodeBracketIcon },
    { id: 'web-development', name: 'Web Development', icon: ComputerDesktopIcon },
    { id: 'mobile-development', name: 'Mobile Development', icon: CpuChipIcon },
    { id: 'data-science', name: 'Data Science', icon: CpuChipIcon },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: CpuChipIcon }
  ];

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced', 'expert'];

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedDifficulty]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty);

      const response = await api.get(`/courses?${params.toString()}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter videos based on search and category
  const getFilteredVideos = () => {
    let videosToShow = [];
    
    if (selectedCategory === 'all') {
      videosToShow = Object.values(allVideos).flat();
    } else {
      videosToShow = allVideos[selectedCategory] || [];
    }
    
    if (searchTerm) {
      videosToShow = videosToShow.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return videosToShow;
  };

  const filteredVideos = getFilteredVideos();
  const totalResults = filteredCourses.length + filteredVideos.length;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Courses
          </h1>
          <p className="text-xl text-gray-600">
            Master programming languages and development skills with our comprehensive courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Tutorial Videos Section */}
        {filteredVideos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {searchTerm ? `Tutorial Videos for "${searchTerm}"` : 'Tutorial Videos by Category'}
            </h2>
            
            {searchTerm ? (
              // Show only matching videos when searching
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map(video => (
                  <VideoCard 
                    key={video.id}
                    title={video.title} 
                    videoId={video.videoId} 
                    duration={video.duration}
                    description={video.description}
                    category={video.category}
                  />
                ))}
              </div>
            ) : (
              // Show all categories when not searching
              <>
                {(selectedCategory === 'all' || selectedCategory === 'programming') && (
                  <VideoSection 
                    title="Programming Languages" 
                    icon={CodeBracketIcon} 
                    color="text-blue-600"
                    videos={allVideos.programming}
                  />
                )}
                
                {(selectedCategory === 'all' || selectedCategory === 'web-development') && (
                  <VideoSection 
                    title="Web Development" 
                    icon={ComputerDesktopIcon} 
                    color="text-green-600"
                    videos={allVideos['web-development']}
                  />
                )}
                
                {(selectedCategory === 'all' || selectedCategory === 'mobile-development') && (
                  <VideoSection 
                    title="Mobile Development" 
                    icon={CpuChipIcon} 
                    color="text-purple-600"
                    videos={allVideos['mobile-development']}
                  />
                )}
                
                {(selectedCategory === 'all' || selectedCategory === 'data-science') && (
                  <VideoSection 
                    title="Data Science" 
                    icon={CpuChipIcon} 
                    color="text-orange-600"
                    videos={allVideos['data-science']}
                  />
                )}
                
                {(selectedCategory === 'all' || selectedCategory === 'ai-ml') && (
                  <VideoSection 
                    title="AI & Machine Learning" 
                    icon={CpuChipIcon} 
                    color="text-red-600"
                    videos={allVideos['ai-ml']}
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold text-blue-600">{totalResults}</span> results for "{searchTerm}" 
              ({filteredCourses.length} courses, {filteredVideos.length} videos)
            </p>
          </div>
        )}

        {/* Courses Grid */}
        {filteredCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchTerm ? `Courses for "${searchTerm}"` : 'Available Courses'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        )}

        {searchTerm && totalResults === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <CodeBracketIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search term or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

const VideoSection = ({ title, icon: Icon, color, videos }) => {
  return (
    <div className="mb-10">
      <h3 className={`text-2xl font-semibold text-gray-800 mb-6 flex items-center`}>
        <Icon className={`h-6 w-6 mr-2 ${color}`} />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <VideoCard 
            key={video.id}
            title={video.title} 
            videoId={video.videoId} 
            duration={video.duration}
            description={video.description}
            category={video.category}
          />
        ))}
      </div>
    </div>
  );
};

const VideoCard = ({ title, videoId, duration, description, category }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-video bg-gray-900 rounded-t-xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        {category && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
            {category.replace('-', ' ')}
          </span>
        )}
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'programming': return CodeBracketIcon;
      case 'web-development': return ComputerDesktopIcon;
      case 'mobile-development': return CpuChipIcon;
      case 'data-science': return CpuChipIcon;
      case 'ai-ml': return CpuChipIcon;
      default: return ComputerDesktopIcon;
    }
  };

  const CategoryIcon = getCategoryIcon(course.category);

  return (
    <Link to={`/course/${course._id}`} className="group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <CategoryIcon className="h-16 w-16 text-white opacity-80" />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {course.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {course.estimatedDuration} min
            </div>
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
              4.8
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 capitalize">
              {course.category?.replace('-', ' ')}
            </span>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
              <PlayIcon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-200" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Courses;