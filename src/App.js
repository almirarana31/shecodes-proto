import React, { useState } from 'react';
import { User, BookOpen, Heart, Users, Calendar, MessageCircle, MapPin, DollarSign, Baby, Briefcase, Award, Bell, Search, Menu, X } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile] = useState({
    name: "Sarah Chen",
    role: "Single Mom • Software Engineer",
    location: "Jakarta, Indonesia",
    children: 1,
    stemField: "Computer Science",
    goals: ["Complete Master's Degree", "Find Flexible Remote Work", "Build Support Network"]
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'learning', label: 'Flexible Learning', icon: BookOpen },
    { id: 'wellness', label: 'Wellness Hub', icon: Heart },
    { id: 'community', label: 'Community', icon: MessageCircle },
    { id: 'childcare', label: 'Childcare Support', icon: Baby },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'resources', label: 'Resources', icon: Award }
  ];

  const upcomingEvents = [
    { title: "AI for Healthcare Workshop", date: "Tomorrow 7PM", type: "Online", childcare: true },
    { title: "Single Moms in Tech Meetup", date: "Sat 2PM", type: "Hybrid", childcare: true },
    { title: "Mentoring Session with Dr. Lisa", date: "Sun 10AM", type: "Video Call", childcare: false }
  ];

  const mentors = [
    { name: "Dr. Lisa Amanda", field: "Data Science", specialty: "Working Mom", rating: 4.9, sessions: 127 },
    { name: "Prof. Maya Sari", field: "Bioengineering", specialty: "Single Parent", rating: 4.8, sessions: 89 },
    { name: "Indira Putri", field: "Software Engineering", specialty: "Career Transition", rating: 4.7, sessions: 156 }
  ];

  const learningPrograms = [
    { title: "Machine Learning Fundamentals", duration: "8 weeks", schedule: "Flexible", childcare: "Available", enrolled: 234 },
    { title: "Data Visualization with Python", duration: "6 weeks", schedule: "Weekend Focus", childcare: "Available", enrolled: 187 },
    { title: "Leadership in Tech", duration: "4 weeks", schedule: "Evening Sessions", childcare: "Available", enrolled: 156 }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {userProfile.name}!</h2>
        <p className="opacity-90">You have 3 upcoming events and 2 new mentor matches</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {userProfile.goals.map((goal, index) => (
            <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {goal}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Progress</p>
              <p className="text-2xl font-bold text-purple-600">68%</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mentor Sessions</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div>
            <p className="text-sm text-gray-600">Community Points</p>
            <p className="text-2xl font-bold text-blue-600">1,247</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.date} • {event.type}</p>
              </div>
              <div className="flex items-center gap-2">
                {event.childcare && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Childcare Available
                  </span>
                )}
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700">
                  Join
                </button>
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
        <h3 className="text-lg font-semibold mb-4">Find Your Perfect Mentor</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Working Moms</button>
          <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Single Parents</button>
          <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Career Transition</button>
          <button className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Leadership</button>
        </div>
        
        <div className="space-y-4">
          {mentors.map((mentor, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{mentor.name}</h4>
                  <p className="text-gray-600">{mentor.field} • {mentor.specialty}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>⭐ {mentor.rating}</span>
                    <span>{mentor.sessions} sessions completed</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 w-full">
                    Connect
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

  const renderLearning = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Flexible Learning Programs</h3>
        <p className="text-gray-600 mb-6">Designed specifically for working mothers with childcare support and flexible schedules</p>
        
        <div className="space-y-4">
          {learningPrograms.map((program, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{program.title}</h4>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <span>📚 {program.duration}</span>
                    <span>⏰ {program.schedule}</span>
                    <span className="text-green-600">👶 {program.childcare}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{program.enrolled} women enrolled</p>
                </div>
                <div className="space-y-2">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 w-full">
                    Enroll Now
                  </button>
                  <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 w-full">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWellness = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Mental Health & Wellness</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900">24/7 Counseling Chat</h4>
            <p className="text-sm text-blue-700 mt-1">Anonymous support whenever you need it</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Start Chat</button>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900">Stress Management Tools</h4>
            <p className="text-sm text-green-700 mt-1">Breathing exercises, meditation guides</p>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">Practice Now</button>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900">Working Mom Support Groups</h4>
            <p className="text-sm text-purple-700 mt-1">Connect with others facing similar challenges</p>
            <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">Join Group</button>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-medium text-pink-900">Health Education</h4>
            <p className="text-sm text-pink-700 mt-1">Reproductive health, nutrition, self-care</p>
            <button className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg text-sm">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChildcare = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Childcare Support Network</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-900">Emergency Childcare Fund</h4>
            <p className="text-sm text-yellow-700 mt-1">Apply for emergency childcare assistance for interviews, classes, or work</p>
            <button className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm">Apply Now</button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900">Childcare Exchange</h4>
            <p className="text-sm text-blue-700 mt-1">Trade childcare hours with other parents in your area</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Find Partners</button>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-medium text-green-900">Event Childcare</h4>
            <p className="text-sm text-green-700 mt-1">Free childcare provided during workshops and events</p>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">View Events</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentTab = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'mentorship': return renderMentorship();
      case 'learning': return renderLearning();
      case 'wellness': return renderWellness();
      case 'childcare': return renderChildcare();
      case 'community': return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Community Forums</h3>
          <p className="text-gray-600">Connect with other women in STEM, share experiences, and get support.</p>
        </div>
      );
      case 'opportunities': return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Job Opportunities</h3>
          <p className="text-gray-600">Flexible, family-friendly STEM positions and internships.</p>
        </div>
      );
      case 'resources': return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Resources & Tools</h3>
          <p className="text-gray-600">Educational materials, financial aid information, and practical tools.</p>
        </div>
      );
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-purple-600">STEM Sisters</h1>
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
            <h1 className="text-2xl font-bold text-purple-600 hidden lg:block">STEM Sisters</h1>
            <p className="text-sm text-gray-600 mt-1 hidden lg:block">Empowering Women in STEM</p>
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
                      ? 'bg-purple-100 text-purple-700' 
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
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
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