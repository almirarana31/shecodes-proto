import React, { useState } from 'react';
import { User, BookOpen, Users, Calendar, Award, Search, Menu, X, Clock, Target, TrendingUp } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile] = useState({
    name: "Sarah Chen",
    role: "Single Mom • Software Engineer",
    location: "Jakarta, Indonesia",
    currentCourse: "Machine Learning Fundamentals",
    completedCourses: 3,
    studyHours: 127,
    goals: ["Complete Master's Degree", "Advance to Senior Developer Role"]
  });

  const menuItems = [
    { id: 'dashboard', label: 'Learning Dashboard', icon: BookOpen },
    { id: 'courses', label: 'Courses & Programs', icon: Award },
    { id: 'mentorship', label: 'Academic Mentorship', icon: Users },
    { id: 'schedule', label: 'Study Schedule', icon: Calendar }
  ];

  const learningPrograms = [
    { 
      title: "Machine Learning Fundamentals", 
      level: "Intermediate",
      duration: "8 weeks", 
      schedule: "Flexible self-paced", 
      progress: 65,
      nextDeadline: "Assignment 3 - Dec 1",
      enrolled: 234,
      certificateType: "Professional Certificate"
    },
    { 
      title: "Data Structures & Algorithms", 
      level: "Advanced",
      duration: "12 weeks", 
      schedule: "Weekend focused", 
      progress: 0,
      nextDeadline: "Enrollment closes Nov 30",
      enrolled: 187,
      certificateType: "University Credit"
    },
    { 
      title: "Women in Tech Leadership", 
      level: "Beginner",
      duration: "6 weeks", 
      schedule: "Evening sessions", 
      progress: 100,
      nextDeadline: "Completed ✓",
      enrolled: 156,
      certificateType: "Certificate of Completion"
    }
  ];

  const mentors = [
    { 
      name: "Dr. Lisa Amanda", 
      field: "Computer Science PhD", 
      specialty: "Machine Learning & Working Mothers", 
      rating: 4.9, 
      sessions: 127,
      availability: "Available this week",
      focus: "Academic guidance & thesis support"
    },
    { 
      name: "Prof. Maya Sari", 
      field: "Software Engineering", 
      specialty: "Career Transition & Education", 
      rating: 4.8, 
      sessions: 89,
      availability: "Next session: Nov 28",
      focus: "Curriculum planning & skill development"
    }
  ];

  const upcomingLearning = [
    { title: "ML Study Group Session", date: "Tomorrow 7PM", type: "Online", participants: 12 },
    { title: "Algorithms Workshop", date: "Sat 2PM", type: "Virtual Lab", participants: 25 },
    { title: "Thesis Review with Dr. Lisa", date: "Sun 10AM", type: "1-on-1 Mentoring", participants: 1 }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {userProfile.name}!</h2>
        <p className="opacity-90">Continue your learning journey in {userProfile.currentCourse}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {userProfile.goals.map((goal, index) => (
            <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {goal}
            </span>
          ))}
        </div>
      </div>

      {/* Learning Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Course Progress</p>
              <p className="text-2xl font-bold text-blue-600">65%</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Courses</p>
              <p className="text-2xl font-bold text-green-600">{userProfile.completedCourses}</p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Study Hours This Month</p>
              <p className="text-2xl font-bold text-purple-600">{userProfile.studyHours}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Streak</p>
              <p className="text-2xl font-bold text-orange-600">12 days</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Current Course Progress */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Current Learning Progress</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-blue-50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-blue-900">{userProfile.currentCourse}</h4>
                <p className="text-sm text-blue-700">Next: Assignment 3 - Neural Networks</p>
              </div>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">In Progress</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
              <div className="bg-blue-600 h-3 rounded-full" style={{width: '65%'}}></div>
            </div>
            <div className="flex justify-between text-sm text-blue-700">
              <span>65% Complete</span>
              <span>Due: Dec 1, 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Learning Activities */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Upcoming Learning Activities</h3>
        <div className="space-y-3">
          {upcomingLearning.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{activity.title}</h4>
                <p className="text-sm text-gray-600">{activity.date} • {activity.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{activity.participants} participants</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Learning Programs</h3>
            <p className="text-gray-600">Flexible STEM education designed for working mothers</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">All Levels</button>
            <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Beginner</button>
            <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Advanced</button>
          </div>
        </div>
        
        <div className="space-y-4">
          {learningPrograms.map((program, index) => (
            <div key={index} className="border rounded-lg p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">{program.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      program.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      program.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {program.level}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <span>📚 {program.duration}</span>
                    <span>⏰ {program.schedule}</span>
                    <span>🎓 {program.certificateType}</span>
                    <span>👥 {program.enrolled} enrolled</span>
                  </div>
                  {program.progress > 0 && program.progress < 100 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{program.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: `${program.progress}%`}}></div>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-700 font-medium">{program.nextDeadline}</p>
                </div>
                <div className="space-y-2 ml-4">
                  {program.progress === 0 ? (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">
                      Enroll Now
                    </button>
                  ) : program.progress === 100 ? (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm w-full" disabled>
                      Completed ✓
                    </button>
                  ) : (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">
                      Continue
                    </button>
                  )}
                  <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 w-full">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMentorship = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Academic Mentorship</h3>
        <p className="text-gray-600 mb-6">Connect with experienced professionals for educational guidance and career development in STEM fields.</p>
        
        <div className="space-y-4">
          {mentors.map((mentor, index) => (
            <div key={index} className="border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{mentor.name}</h4>
                  <p className="text-gray-600 mb-2">{mentor.field}</p>
                  <p className="text-sm text-blue-600 mb-2">{mentor.focus}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span>⭐ {mentor.rating} rating</span>
                    <span>📚 {mentor.sessions} mentoring sessions</span>
                  </div>
                  <p className="text-sm font-medium text-green-600">{mentor.availability}</p>
                </div>
                <div className="space-y-2 ml-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">
                    Request Session
                  </button>
                  <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 w-full">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Study Schedule & Planning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">This Week's Study Plan</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm">ML Assignment Review</span>
                <span className="text-xs text-gray-600">2 hours</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">Python Practice Problems</span>
                <span className="text-xs text-gray-600">1.5 hours</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm">Mentoring Session Prep</span>
                <span className="text-xs text-gray-600">30 mins</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">Learning Goals</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" checked />
                <span className="text-sm line-through text-gray-500">Complete Neural Networks module</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Submit Assignment 3</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Review for upcoming quiz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentTab = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'courses': return renderCourses();
      case 'mentorship': return renderMentorship();
      case 'schedule': return renderSchedule();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">STEM Sisters Education</h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block w-64 bg-white shadow-sm min-h-screen`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600 hidden lg:block">STEM Sisters</h1>
            <p className="text-sm text-gray-600 mt-1 hidden lg:block">Quality Education for Women in STEM</p>
          </div>
          
          <nav className="px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-left transition-colors ${
                    activeTab === item.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Profile in Sidebar */}
          <div className="p-4 mt-8 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">{userProfile.name}</p>
                <p className="text-xs text-gray-600">{userProfile.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderCurrentTab()}
        </div>
      </div>
    </div>
  );
};

export default App;