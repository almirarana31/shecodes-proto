import React, { useState, useEffect, useRef } from 'react';
 import { User, BookOpen, Users, Calendar, Award, Search, Menu, X, Clock, Target, TrendingUp, Star, Globe, CheckCircle, PlayCircle, DollarSign, Download, Share, Wifi, WifiOff, MoreVertical, ArrowLeft, ChevronRight, RefreshCw, Check, Coffee, Home } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineContent, setOfflineContent] = useState({
    downloaded: ['dashboard', 'paths'],
    downloading: null,
    availableOffline: true
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth < 768
  });
  const [tabAnimation, setTabAnimation] = useState('animate-fadeIn');
  const [isDownloading, setIsDownloading] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({});
  const menuRef = useRef(null);
  
  // Check and update online status and handle screen resize
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
      
      // Animate elements when they are in view
      document.querySelectorAll('.reveal').forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 768
      });
      
      // Close menu automatically on resize to larger screen
      if (width >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    // Attach event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Handle clicks outside of menu to close it
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Trigger initial animations when component mounts
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  const [financialMetrics] = useState({
    // Basic fees
    monthlyFee: 50000,
    certificationFee: 300000,
    annualValue: 900000,
    currency: "Rp",
    
    // Additional business metrics
    avgSalaryIncrease: 3500000, // Average monthly salary increase after program
    jobPlacementRate: 78, // Percentage of graduates placed in jobs
    returnOnInvestment: 320, // ROI percentage
    traditionalCourseCost: 1850000, // Cost of traditional courses annually
    timeToJobPlacement: 4.5, // Average months to job placement
    scholarshipValue: 2500000, // Value of available scholarships
    
    // Payment options
    installmentPlans: [
      { name: "Bulanan", fee: 50000, totalPayments: 12 },
      { name: "3 Bulan", fee: 140000, totalPayments: 4, discount: 6.7 },
      { name: "Tahunan", fee: 540000, totalPayments: 1, discount: 10 }
    ]
  });
  
  // Utility function for formatting currency
  const formatCurrency = (amount) => {
    return `${financialMetrics.currency} ${amount.toLocaleString()}`;
  };
  
  // Calculate annual total cost
  const calculateAnnualCost = () => {
    return financialMetrics.monthlyFee * 12 + financialMetrics.certificationFee;
  };
  
  // Function to simulate downloading content for offline use
  const handleDownloadContent = (contentId, contentName) => {
    if (offlineContent.downloaded.includes(contentId)) {
      // Already downloaded
      return;
    }
    
    setOfflineContent(prev => ({
      ...prev,
      downloading: contentId
    }));
    
    setIsDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      setOfflineContent(prev => ({
        ...prev,
        downloading: null,
        downloaded: [...prev.downloaded, contentId]
      }));
      
      setIsDownloading(false);
      
      // Show toast notification
      showToastNotification(`${contentName} berhasil diunduh untuk akses offline`);
    }, 2000);
  };
  
  // Toast notification system
  const [toast, setToast] = useState({
    visible: false,
    message: '',
  });
  
  const showToastNotification = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };
  
  // Animation for tab switching
  const switchTab = (tabId) => {
    setTabAnimation('animate-slideIn');
    setActiveTab(tabId);
    setIsMenuOpen(false);
    
    // Reset animation class after animation completes
    setTimeout(() => {
      setTabAnimation('animate-fadeIn');
    }, 500);
    
    // Scroll to top when switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const [userProfile] = useState({
    name: "Sari Dewi",
    role: "Ibu Rumah Tangga • Calon Data Analyst",
    location: "Jakarta, Indonesia",
    currentPath: "Data Science Career Path",
    completedCerts: 2,
    studyHours: 89,
    careerGoal: "Data Analyst di perusahaan teknologi"
  });
  const menuItems = [
    { id: 'dashboard', label: 'Dasbor Pembelajaran', icon: BookOpen },
    { id: 'paths', label: 'Jalur Karir', icon: Target },
    { id: 'certifications', label: 'Sertifikasi', icon: Award },
    { id: 'mentorship', label: 'Mentoring', icon: Users },
    { id: 'progress', label: 'Progress Karir', icon: TrendingUp },
    { id: 'financial', label: 'Finansial', icon: DollarSign }
  ];

  const careerPaths = [
    {
      title: "Data Science Career Path",
      description: "Menjadi Data Scientist dalam 6-12 bulan",
      duration: "8-12 bulan",
      level: "Pemula hingga Mahir", 
      progress: 35,
      totalCerts: 6,
      completedCerts: 2,
      nextCourse: "Google Data Analytics Certificate",
      providers: ["Google", "IBM", "Coursera"],
      avgSalary: "Rp 8-15 juta/bulan",
      jobDemand: "Sangat Tinggi"
    },
    {
      title: "UI/UX Design Career Path", 
      description: "Menjadi UI/UX Designer profesional",
      duration: "4-6 bulan",
      level: "Pemula hingga Menengah",
      progress: 0,
      totalCerts: 4,
      completedCerts: 0,
      nextCourse: "Google UX Design Certificate",
      providers: ["Google", "Adobe", "Figma"],
      avgSalary: "Rp 6-12 juta/bulan", 
      jobDemand: "Tinggi"
    },
    {
      title: "IT Support Specialist Path",
      description: "Menjadi IT Support dalam 3-6 bulan",
      duration: "3-6 bulan",
      level: "Pemula",
      progress: 0,
      totalCerts: 3,
      completedCerts: 0,
      nextCourse: "Google IT Support Certificate",
      providers: ["Google", "Microsoft", "CompTIA"],
      avgSalary: "Rp 4-8 juta/bulan",
      jobDemand: "Tinggi"
    }
  ];

  const certifications = [
    {
      title: "Google Data Analytics Certificate",
      provider: "Google Career Certificates",
      platform: "Coursera",
      duration: "3-6 bulan",
      level: "Pemula",
      status: "In Progress",
      progress: 65,
      credlyBadge: true,
      linkedinVerified: true,
      jobRelevance: "Data Analyst, Business Analyst",
      price: "Rp 650,000/bulan"
    },
    {
      title: "Microsoft Azure Fundamentals",
      provider: "Microsoft",
      platform: "Microsoft Learn",
      duration: "1-2 bulan", 
      level: "Pemula",
      status: "Available",
      progress: 0,
      credlyBadge: true,
      linkedinVerified: true,
      jobRelevance: "Cloud Analyst, Data Engineer",
      price: "Gratis"
    },
    {
      title: "IBM Data Science Professional Certificate",
      provider: "IBM",
      platform: "Coursera",
      duration: "6-10 bulan",
      level: "Menengah",
      status: "Completed",
      progress: 100,
      credlyBadge: true,
      linkedinVerified: true,
      jobRelevance: "Data Scientist, ML Engineer",
      price: "Rp 650,000/bulan"
    }
  ];

  const mentors = [
    {
      name: "Dr. Kartika Sari",
      title: "Senior Data Scientist di Tokopedia",
      experience: "8 tahun",
      specialty: "Career transition • Working mothers",
      languages: ["Bahasa Indonesia", "English"],
      rating: 4.9,
      totalMentees: 127,
      availability: "Tersedia minggu ini",
      focus: "Transisi karir ke Data Science"
    },
    {
      name: "Maya Purnama",
      title: "UX Design Lead di Gojek",
      experience: "6 tahun", 
      specialty: "Design thinking • Single mothers",
      languages: ["Bahasa Indonesia"],
      rating: 4.8,
      totalMentees: 89,
      availability: "Sesi berikutnya: 30 Nov",
      focus: "Membangun portofolio UX"
    }
  ];
  const upcomingActivities = [
    { title: "Webinar: Transisi Karir ke Tech", date: "Besok 19:00", type: "Online", participants: 45 },
    { title: "Study Group Data Analytics", date: "Sabtu 14:00", type: "Virtual", participants: 12 },
    { title: "1-on-1 Mentoring with Dr. Kartika", date: "Minggu 10:00", type: "Video Call", participants: 1 }
  ];
    const renderDashboard = () => (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Connectivity Status Banner */}
      {!isOnline && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-4 animate-pulse flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-2">
            <WifiOff className="w-5 h-5 text-amber-700" />
            <span className="text-sm font-medium text-amber-900">Mode Offline Aktif</span>
          </div>
          <button className="text-blue-700 text-sm flex items-center gap-1 hover:underline touch-friendly">
            <RefreshCw className="w-4 h-4" /> Cek Koneksi
          </button>
        </div>
      )}
      
      {/* Welcome Section with Personalized Animation */}
      <div className="bg-blue-700 bg-opacity-90 rounded-xl p-4 sm:p-6 text-white border-l-4 border-orange-300 transform transition-all duration-300 hover:scale-[1.01] reveal mobile-no-hover shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div className="animate-slideIn">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 font-serif">Selamat datang kembali, {userProfile.name}!</h2>
            <p className="opacity-90 text-sm sm:text-base">Lanjutkan perjalanan pembelajaran Anda menuju {userProfile.careerGoal}</p>
            <div className="mt-3 sm:mt-4 bg-white bg-opacity-20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-block">
              <span className="text-xs sm:text-sm font-medium">{userProfile.currentPath}</span>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 mt-3 sm:mt-0">
            {offlineContent.availableOffline && (
              <span className="flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full animate-fadeIn animate-delay-200">
                <Download className="w-3 h-3 mr-1" /> Tersedia Offline
              </span>
            )}
            <button 
              onClick={() => handleDownloadContent('dashboard', 'Dasbor Pembelajaran')}
              className="flex items-center text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded-full transition-all"
              disabled={offlineContent.downloaded.includes('dashboard')}
            >
              {offlineContent.downloaded.includes('dashboard') ? (
                <>
                  <Check className="w-3 h-3 mr-1" /> Tersimpan
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 mr-1" /> Simpan
                </>
              )}
            </button>
          </div>
        </div>
      </div>      {/* Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 reveal">
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-orange-100 transform transition-all duration-200 hover:shadow-md animate-slideIn animate-delay-100 mobile-no-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Sertifikat Selesai</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-800">{userProfile.completedCerts}</p>
            </div>
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 opacity-80" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-orange-100 transform transition-all duration-200 hover:shadow-md animate-slideIn animate-delay-200 mobile-no-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Jam Belajar</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-800">{userProfile.studyHours}</p>
            </div>
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 opacity-80" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-orange-100 transform transition-all duration-200 hover:shadow-md animate-slideIn animate-delay-300 mobile-no-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Progress</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-800">35%</p>
            </div>
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 opacity-80" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-orange-100 transform transition-all duration-200 hover:shadow-md animate-slideIn animate-delay-300 mobile-no-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Streak</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-800">7 hari</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 opacity-80" />
          </div>
        </div>
      </div>
            
      {/* Current Learning Progress */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 transform transition-all duration-300 hover:shadow-md reveal mobile-no-hover">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h3 className="text-lg font-semibold text-amber-800 font-serif">Progress Pembelajaran</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleDownloadContent('certification-gda', 'Google Data Analytics')}
              className="text-xs flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-all"
            >
              <Download className="w-3.5 h-3.5" /> 
              {offlineContent.downloaded.includes('certification-gda') ? 'Tersimpan' : 'Simpan Offline'}
            </button>
            <button className="text-xs flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-all">
              <Share className="w-3.5 h-3.5" /> Bagikan
            </button>
          </div>
        </div>
        <div className="bg-orange-50 border border-gray-200 rounded-lg p-3 sm:p-4 transform transition-all duration-200 hover:border-orange-200 mobile-no-hover">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h4 className="font-semibold text-blue-900 text-base sm:text-lg">Google Data Analytics Certificate</h4>
              <p className="text-xs sm:text-sm text-gray-600">Berikutnya: Course 4 - Process Data from Dirty to Clean</p>
            </div>
            <span className="bg-orange-500 bg-opacity-80 text-white px-3 py-1 rounded-full text-xs sm:text-sm self-start">Sedang Berlangsung</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 mb-2">
            <div className="bg-blue-700 h-full rounded-full transition-all duration-1000" style={{width: '65%'}}></div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-gray-600 gap-1">
            <span>65% Selesai • Course 3 dari 8</span>
            <span>Target selesai: Jan 2025</span>
          </div>
          <div className="mt-3 flex justify-center">
            <button className="bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors border-l-2 border-orange-300 flex items-center gap-2 touch-friendly w-full sm:w-auto justify-center sm:justify-start">
              <PlayCircle className="w-4 h-4" /> Lanjutkan Belajar
            </button>
          </div>
        </div>
          {/* Recommended Next Content */}
        <div className="mt-4 animate-slideIn animate-delay-300">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Rekomendasi Konten</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-blue-50 border border-blue-100 p-2.5 sm:p-3 rounded-lg flex items-center gap-2 sm:gap-3 transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md mobile-no-hover">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-xs sm:text-sm truncate">SQL for Data Analysis</h5>
                <p className="text-xs text-gray-600">25 menit • Interactive coding</p>
              </div>
              <button 
                onClick={() => handleDownloadContent('sql-content', 'SQL for Data Analysis')}
                className="ml-auto bg-white text-blue-700 p-1.5 rounded-full hover:bg-blue-50 transition-colors touch-friendly"
              >
                {offlineContent.downloaded.includes('sql-content') ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-2.5 sm:p-3 rounded-lg flex items-center gap-2 sm:gap-3 transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md mobile-no-hover">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-xs sm:text-sm truncate">Data Cleaning Techniques</h5>
                <p className="text-xs text-gray-600">40 menit • Video & Quiz</p>
              </div>
              <button 
                onClick={() => handleDownloadContent('data-cleaning', 'Data Cleaning Techniques')}
                className="ml-auto bg-white text-blue-700 p-1.5 rounded-full hover:bg-blue-50 transition-colors touch-friendly"
              >
                {offlineContent.downloaded.includes('data-cleaning') ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access to Popular Certificates */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 reveal">
        <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-amber-800 font-serif">Sertifikasi Populer</h3>
        <div className="overflow-x-auto scrollbar-hide pb-2 -mx-3 px-3">
          <div className="flex gap-3 sm:gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="w-52 sm:w-64 flex-shrink-0 border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] mobile-no-hover"
                style={{scrollSnapAlign: 'start'}}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="bg-blue-700 bg-opacity-10 p-1.5 sm:p-2 rounded">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
                  </div>
                  {cert.status === 'Available' && (
                    <span className="text-xs bg-green-100 text-green-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                      100% Online
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-blue-900 mb-1 line-clamp-2 h-[2.8rem] text-sm">{cert.title}</h4>
                <p className="text-xs text-gray-500 mb-2 sm:mb-3">{cert.provider} • {cert.duration}</p>
                {cert.status === 'In Progress' && (
                  <div className="mb-2 sm:mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-0.5 sm:mb-1">
                      <div className="bg-blue-700 h-full rounded-full" style={{width: `${cert.progress}%`}}></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>{cert.progress}% selesai</span>
                    </div>
                  </div>
                )}
                <button className={`w-full text-center py-1.5 sm:py-2 rounded text-xs sm:text-sm touch-friendly ${
                  cert.status === 'Completed' 
                    ? 'bg-green-100 text-green-700'
                    : cert.status === 'In Progress'
                      ? 'bg-blue-700 text-white hover:bg-blue-600'
                      : 'border border-blue-700 text-blue-700 hover:bg-blue-50'
                }`}>
                  {cert.status === 'Completed' ? 'Selesai ✓' : cert.status === 'In Progress' ? 'Lanjutkan' : 'Mulai'}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile scroll indicator */}
        <div className="flex justify-center items-center gap-1 mt-3 sm:hidden">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-700"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        </div>
      </div>      {/* Upcoming Activities */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 reveal">
        <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-amber-800 font-serif">Kegiatan Mendatang</h3>
        <div className="space-y-2 sm:space-y-3">
          {upcomingActivities.map((activity, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-orange-50 rounded-lg hover:shadow-sm transition-all duration-300 hover:translate-x-1 mobile-no-hover"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="mb-2 sm:mb-0">
                <h4 className="font-medium text-amber-900 text-sm sm:text-base">{activity.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{activity.date} • {activity.type}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-normal sm:gap-3">
                <span className="text-xs sm:text-sm text-gray-500">{activity.participants} peserta</span>
                <button className="bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 border-l-2 border-orange-300 transition-colors touch-friendly">
                  Bergabung
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Spotlight */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 reveal">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg font-semibold text-amber-800 font-serif">Spotlight Mentor</h3>
          <button className="text-blue-700 text-xs sm:text-sm hover:underline flex items-center touch-friendly">
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 sm:p-4 transition-all hover:shadow-md mobile-no-hover">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white mx-auto sm:mx-0">
              <User className="w-8 h-8 text-blue-700" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="font-medium text-blue-900">{mentors[0].name}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{mentors[0].title}</p>
              <p className="text-xs sm:text-sm text-orange-500 mb-2 sm:mb-3">{mentors[0].focus}</p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                  {mentors[0].rating}
                </span>
                <span className="text-gray-500">{mentors[0].totalMentees} mentee</span>
                <span className="text-green-600">{mentors[0].availability}</span>
              </div>
            </div>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors border-l-2 border-orange-300 w-full sm:w-auto touch-friendly">
              Jadwalkan
            </button>
          </div>
        </div>
      </div>
      
      {/* Offline Learning Banner */}
      <div className="bg-blue-700 bg-opacity-5 rounded-lg p-4 sm:p-5 border border-blue-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 reveal transform transition-all duration-300 hover:scale-[1.01] hover:shadow-md mobile-no-hover">
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Akses Pembelajaran Tanpa Internet</h4>
          <p className="text-xs sm:text-sm text-gray-600">Unduh konten untuk tetap belajar saat offline</p>
        </div>
        <button 
          onClick={() => {
            // Handle offline download logic here
            showToastNotification('Mendownload seluruh materi pembelajaran...');
            setIsDownloading(true);
            
            setTimeout(() => {
              setOfflineContent(prev => ({
                ...prev,
                downloaded: [
                  ...new Set([...prev.downloaded, 'dashboard', 'paths', 'certifications'])
                ]
              }));
              setIsDownloading(false);
              showToastNotification('Materi berhasil diunduh untuk akses offline');
            }, 3000);
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors flex items-center justify-center sm:justify-start gap-2 border-l-2 border-orange-300 touch-friendly"
        >
          <Download className="w-4 h-4" /> Unduh Semua Materi
        </button>
      </div>
    </div>
  );

  const renderPaths = () => (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Path Page Header with Offline Support */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 animate-fadeIn">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-800 font-serif">Jalur Karir Terintegrasi</h2>
          <p className="text-sm text-gray-600">Sertifikasi internasional dari Google, Microsoft, IBM, dan lainnya dalam satu platform</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleDownloadContent('paths', 'Jalur Karir')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm touch-friendly transition-colors ${
              offlineContent.downloaded.includes('paths')
                ? 'bg-green-50 text-green-700'
                : 'bg-blue-700 text-white hover:bg-blue-600'
            }`}
          >
            {offlineContent.downloaded.includes('paths') ? (
              <>
                <Check className="w-4 h-4" /> Tersedia Offline
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Simpan Offline
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 mb-4 reveal animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-sm font-medium text-blue-800">Filter Jalur Karir</h3>
          <div className="flex flex-wrap gap-2">
            <button className="bg-blue-700 text-white px-3 py-1.5 rounded-full text-xs hover:bg-blue-600 transition-colors touch-friendly">
              Semua Jalur
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-gray-200 transition-colors touch-friendly">
              Pemula
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-gray-200 transition-colors touch-friendly">
              Menengah
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-gray-200 transition-colors touch-friendly">
              Paling Diminati
            </button>
          </div>
        </div>
      </div>
      
      {/* Career Paths List */}
      <div className="space-y-4 sm:space-y-6 reveal">
        {careerPaths.map((path, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 transition-all duration-300 hover:shadow-md mobile-no-hover transform hover:translate-y-[-2px]"
            style={{animationDelay: `${index * 150}ms`}}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* Path Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-700 rounded-lg text-white flex items-center justify-center flex-shrink-0 border-2 border-blue-100 hidden sm:flex">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg sm:text-xl text-blue-900 mb-1.5 sm:mb-2 font-serif">{path.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                  
                    {/* Path Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Durasi:</span>
                        <p className="font-medium text-amber-900">{path.duration}</p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Level:</span>
                        <p className="font-medium text-amber-900">{path.level}</p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Gaji Rata-rata:</span>
                        <p className="font-medium text-green-600">{path.avgSalary}</p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Demand:</span>
                        <p className="font-medium text-orange-400">{path.jobDemand}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs sm:text-sm text-gray-600">Penyedia:</span>
                      {path.providers.map((provider, i) => (
                        <span key={i} className="bg-orange-50 text-amber-900 px-2 py-1 rounded text-xs font-medium">
                          {provider}
                        </span>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    {path.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                          <span>Progress: {path.completedCerts}/{path.totalCerts} sertifikat</span>
                          <span>{path.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div className="bg-blue-700 h-full rounded-full animate-pulse-slow" style={{width: `${path.progress}%`}}></div>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs sm:text-sm font-medium text-blue-900">Berikutnya: {path.nextCourse}</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:items-center lg:items-stretch">
                {path.progress > 0 ? (
                  <button className="bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm hover:opacity-90 border-l-2 border-orange-300 touch-friendly flex justify-center items-center gap-2">
                    <PlayCircle className="w-4 h-4" /> Lanjutkan
                  </button>
                ) : (
                  <button className="bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm hover:opacity-90 border-l-2 border-orange-300 touch-friendly flex justify-center items-center gap-2">
                    <PlayCircle className="w-4 h-4" /> Mulai Jalur
                  </button>
                )}
                <button className="border border-blue-800 text-blue-800 px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm hover:bg-orange-50 touch-friendly flex justify-center items-center gap-2">
                  <Globe className="w-4 h-4" /> Detail Lengkap
                </button>
                <button 
                  onClick={() => handleDownloadContent(`path-${index}`, path.title)}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm touch-friendly transition-colors ${
                    offlineContent.downloaded.includes(`path-${index}`)
                      ? 'bg-green-50 text-green-600 border border-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {offlineContent.downloaded.includes(`path-${index}`) ? (
                    <>
                      <Check className="w-4 h-4" /> Tersedia Offline
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Unduh
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Looking for something else banner */}
      <div className="bg-blue-700 bg-opacity-5 rounded-lg p-4 sm:p-5 border border-blue-100 mt-8 reveal transform transition-all duration-300 hover:scale-[1.01] hover:shadow-md mobile-no-hover">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Mencari jalur karir spesifik?</h4>
            <p className="text-xs sm:text-sm text-gray-600">Hubungi mentor kami untuk jalur karir yang disesuaikan dengan kebutuhan Anda</p>
          </div>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors border-l-2 border-orange-300 touch-friendly self-start sm:self-auto whitespace-nowrap">
            Konsultasi Gratis
          </button>
        </div>
      </div>
    </div>
  );
  const renderCertifications = () => (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Certification Page Header with Offline Support */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 animate-fadeIn">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-800 font-serif">Sertifikasi Internasional</h2>
          <p className="text-sm text-gray-600">Sertifikat yang diakui industri dari platform terpercaya dunia</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleDownloadContent('certifications', 'Sertifikasi')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm touch-friendly transition-colors ${
              offlineContent.downloaded.includes('certifications')
                ? 'bg-green-50 text-green-700'
                : 'bg-blue-700 text-white hover:bg-blue-600'
            }`}
          >
            {offlineContent.downloaded.includes('certifications') ? (
              <>
                <Check className="w-4 h-4" /> Tersedia Offline
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Simpan Offline
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 mb-4 reveal animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-sm font-medium text-blue-800">Filter Sertifikasi</h3>
          <div className="flex flex-wrap gap-2">
            <button className="bg-blue-700 text-white px-3 py-1.5 rounded-full text-xs hover:bg-blue-600 transition-colors touch-friendly">
              Semua
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-gray-200 transition-colors touch-friendly">
              In Progress
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-gray-200 transition-colors touch-friendly">
              Tersedia
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-gray-200 transition-colors touch-friendly">
              Selesai
            </button>
          </div>
        </div>
      </div>
      
      {/* Certifications List */}
      <div className="space-y-4 sm:space-y-6 reveal">
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 transition-all duration-300 hover:shadow-md mobile-no-hover transform hover:translate-y-[-2px]"
            style={{animationDelay: `${index * 150}ms`}}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* Certification Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-700 rounded-lg text-white flex items-center justify-center flex-shrink-0 border-2 border-blue-100 hidden sm:flex">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="bg-blue-700 bg-opacity-10 p-1.5 rounded flex-shrink-0 sm:hidden">
                        <Award className="w-4 h-4 text-blue-700" />
                      </div>
                      <h4 className="font-semibold text-lg sm:text-xl text-blue-900 font-serif">{cert.title}</h4>
                      {cert.status === 'Completed' && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
                      {cert.status === 'In Progress' && <PlayCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{cert.provider} • {cert.platform}</p>
                  
                    {/* Certification Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Penyedia:</span>
                        <p className="font-medium text-amber-900">{cert.provider}</p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Platform:</span>
                        <p className="font-medium text-amber-900">{cert.platform}</p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Durasi:</span>
                        <p className="font-medium text-amber-900">{cert.duration}</p>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-500">Harga:</span>
                        <p className="font-medium text-green-600">{cert.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {cert.credlyBadge && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          Credly Badge
                        </span>
                      )}
                      {cert.linkedinVerified && (
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                          LinkedIn Verified
                        </span>
                      )}
                      <span className="bg-amber-50 text-amber-900 px-2 py-1 rounded-full text-xs">
                        Untuk: {cert.jobRelevance}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {cert.progress > 0 && cert.progress < 100 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                          <span>Progress</span>
                          <span>{cert.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div className="bg-blue-700 h-full rounded-full animate-pulse-slow" style={{width: `${cert.progress}%`}}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:items-center lg:items-stretch">
                {cert.status === 'Available' ? (
                  <button className="bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm hover:opacity-90 touch-friendly border-l-2 border-orange-300 transition-colors">
                    Mulai Sekarang
                  </button>
                ) : cert.status === 'In Progress' ? (
                  <button className="bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm hover:opacity-90 touch-friendly border-l-2 border-orange-300 transition-colors">
                    Lanjutkan
                  </button>
                ) : (
                  <button className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm touch-friendly transition-colors" disabled>
                    Selesai ✓
                  </button>
                )}
                
                <button className="border border-blue-700 text-blue-700 px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-50 touch-friendly transition-colors">
                  Info Detail
                </button>
                
                <button 
                  onClick={() => handleDownloadContent(`cert-${index}`, cert.title)}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm touch-friendly transition-colors ${
                    offlineContent.downloaded.includes(`cert-${index}`)
                      ? 'bg-green-50 text-green-600 border border-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {offlineContent.downloaded.includes(`cert-${index}`) ? (
                    <>
                      <Check className="w-4 h-4" /> Tersedia Offline
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Unduh
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Looking for something else banner */}
      <div className="bg-blue-700 bg-opacity-5 rounded-lg p-4 sm:p-5 border border-blue-100 mt-8 reveal">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-2">
            <Search className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Tidak menemukan sertifikasi yang dicari?</h4>
              <p className="text-xs sm:text-sm text-gray-600">Kami memiliki lebih dari 250 sertifikasi dari berbagai industri</p>
            </div>
          </div>
          <button className="bg-white text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 self-start touch-friendly">
            <Search className="w-4 h-4" /> Cari Sertifikasi
          </button>
        </div>
      </div>
      
      {/* Offline Learning Banner */}
      <div className="bg-blue-700 bg-opacity-5 rounded-lg p-4 sm:p-5 border border-blue-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 reveal transform transition-all duration-300 hover:scale-[1.01] hover:shadow-md mobile-no-hover mt-6">
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Akses Sertifikasi Tanpa Internet</h4>
          <p className="text-xs sm:text-sm text-gray-600">Unduh sertifikasi untuk belajar kapanpun dan dimanapun</p>
        </div>
        <button 
          onClick={() => {
            // Handle offline download logic here
            showToastNotification('Mendownload seluruh materi sertifikasi...');
            setIsDownloading(true);
            
            setTimeout(() => {
              setOfflineContent(prev => ({
                ...prev,
                downloaded: [...new Set([...prev.downloaded, 'certifications', ...certifications.map((_, i) => `cert-${i}`)])]
              }));
              setIsDownloading(false);
              showToastNotification('Materi sertifikasi berhasil diunduh untuk akses offline');
            }, 3000);
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors flex items-center justify-center sm:justify-start gap-2 border-l-2 border-orange-300 touch-friendly"
        >
          <Download className="w-4 h-4" /> Unduh Semua Sertifikasi
        </button>
      </div>
    </div>
  );

  const renderMentorship = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
        <h3 className="text-lg font-semibold mb-2 text-amber-800 font-serif">Mentoring dari Ahli</h3>
        <p className="text-gray-600 mb-6">Bimbingan karir dari para profesional berpengalaman yang memahami tantangan wanita Indonesia</p>
        
        <div className="space-y-4">
          {mentors.map((mentor, index) => (
            <div key={index} className="border border-blue-900 border-opacity-20 rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-blue-900">{mentor.name}</h4>
                  <p className="text-gray-600 mb-2">{mentor.title}</p>
                  <p className="text-sm text-orange-400 mb-2">{mentor.focus}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Pengalaman:</span>
                      <p className="font-medium text-amber-900">{mentor.experience}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Bahasa:</span>
                      <p className="font-medium text-amber-900">{mentor.languages.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      {mentor.rating}
                    </span>
                    <span>👥 {mentor.totalMentees} mentee</span>
                  </div>
                  <p className="text-sm font-medium text-green-600">{mentor.availability}</p>
                </div>
                  <div className="space-y-2 ml-4">                  <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 w-full border-l-2 border-orange-300">
                    Minta Sesi
                  </button>                  <button className="border border-blue-800 text-blue-800 px-4 py-2 rounded-lg text-sm hover:bg-orange-50 w-full">
                    Lihat Profil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const renderProgress = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
        <h3 className="text-lg font-semibold mb-4 text-amber-800 font-serif">Pelacakan Progress Karir</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-blue-900">Target Minggu Ini</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-sm">Selesaikan Course 4 Google Data Analytics</span>
                <span className="text-xs text-gray-600">3 jam</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">Submit project portfolio</span>
                <span className="text-xs text-gray-600">2 jam</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm">Sesi mentoring dengan Dr. Kartika</span>
                <span className="text-xs text-gray-600">1 jam</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-blue-900">Milestone Karir</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Selesaikan IBM Data Science Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-orange-400" />
                <span className="text-sm">Selesaikan Google Data Analytics (65%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Mulai Microsoft Azure Fundamentals</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Bangun portfolio proyek</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Mulai melamar kerja sebagai Data Analyst</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const renderFinancial = () => (
    <div className="space-y-6 pb-20 md:pb-6 animate-fadeIn">
      {/* Financial Value Summary */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 reveal">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold text-amber-800 font-serif">Ringkasan Biaya & Nilai Investasi</h3>
          <div className="flex space-x-1">
            <button className="bg-blue-700 text-white px-3 py-1 rounded-lg text-xs border-l-2 border-orange-300 touch-friendly">
              Opsi Pembayaran
            </button>
            <button className="border border-blue-800 text-blue-800 px-3 py-1 rounded-lg text-xs hover:bg-orange-50 touch-friendly">
              Detail Paket
            </button>
          </div>
        </div>
        
        {/* Basic Fee Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 reveal">
          <div className="p-3 sm:p-4 bg-orange-50 rounded-lg animate-slideIn animate-delay-100">
            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Biaya Bulanan</p>
            <p className="text-lg sm:text-xl font-bold text-blue-800">{formatCurrency(financialMetrics.monthlyFee)}</p>
            <p className="text-xs text-gray-500 mt-1">Akses ke semua konten pembelajaran</p>
          </div>
          <div className="p-3 sm:p-4 bg-blue-50 rounded-lg animate-slideIn animate-delay-200">
            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Biaya Sertifikasi (Tahunan)</p>
            <p className="text-lg sm:text-xl font-bold text-blue-800">{formatCurrency(financialMetrics.certificationFee)}</p>
            <p className="text-xs text-gray-500 mt-1">Sertifikasi terverifikasi LinkedIn & Credly</p>
          </div>
          <div className="p-3 sm:p-4 bg-green-50 rounded-lg animate-slideIn animate-delay-300">
            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Nilai Total (Tahunan)</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency(financialMetrics.annualValue)}</p>
            <p className="text-xs text-gray-500 mt-1">Peningkatan karir & nilai investasi pendidikan</p>
          </div>
        </div>
        
        {/* Business ROI Metrics */}
        <div className="mb-6 reveal">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Metrik Investasi Karir</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 transform hover:scale-[1.02] transition-transform duration-300 mobile-no-hover">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-gray-600">ROI Investasi</p>
                <span className="text-green-600 font-bold text-base sm:text-lg">{financialMetrics.returnOnInvestment}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Pengembalian investasi pendidikan</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 transform hover:scale-[1.02] transition-transform duration-300 mobile-no-hover">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-gray-600">Peningkatan Gaji</p>
                <span className="text-green-600 font-bold text-sm">{formatCurrency(financialMetrics.avgSalaryIncrease)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Rata-rata peningkatan gaji bulanan</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 transform hover:scale-[1.02] transition-transform duration-300 mobile-no-hover">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-gray-600">Tingkat Penempatan</p>
                <span className="text-blue-700 font-bold text-base sm:text-lg">{financialMetrics.jobPlacementRate}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Lulusan yang mendapatkan pekerjaan</p>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mb-5 reveal">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Opsi Pembayaran Fleksibel</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {financialMetrics.installmentPlans.map((plan, index) => (
              <div 
                key={index} 
                className="bg-orange-50 rounded-lg p-3 border border-orange-100 flex flex-col transform hover:translate-y-[-2px] transition-all duration-200 hover:shadow-md mobile-no-hover"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-amber-800">{plan.name}</span>
                  {plan.discount > 0 && (
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                      Hemat {plan.discount}%
                    </span>
                  )}
                </div>
                <p className="text-lg font-bold text-blue-800">{formatCurrency(plan.fee)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Total: {formatCurrency(plan.fee * plan.totalPayments)} • {plan.totalPayments}x pembayaran
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Monthly Savings and Scholarship */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 reveal">
          <div className="p-3 bg-green-100 rounded-lg border border-green-200 transform hover:scale-[1.02] transition-transform duration-300 mobile-no-hover">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-green-700">Penghematan Bulanan</p>
                <p className="text-xs text-gray-600">Dibandingkan biaya kursus dan sertifikasi tradisional</p>
              </div>
              <p className="text-lg sm:text-xl font-bold text-green-700">
                {formatCurrency(Math.round((financialMetrics.annualValue - calculateAnnualCost()) / 12))}/bulan
              </p>
            </div>
          </div>
          <div className="p-3 bg-amber-100 rounded-lg border border-amber-200 transform hover:scale-[1.02] transition-transform duration-300 mobile-no-hover">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-amber-700">Nilai Beasiswa Tersedia</p>
                <p className="text-xs text-gray-600">Untuk wanita di daerah tertinggal dan prasejahtera</p>
              </div>
              <p className="text-lg sm:text-xl font-bold text-amber-700">
                {formatCurrency(financialMetrics.scholarshipValue)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Career Timeline */}
        <div className="mt-5 reveal">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Waktu Menuju Karir</h4>
          <div className="bg-white border border-blue-100 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-700 h-2.5 rounded-full animate-pulse-slow" style={{width: '75%'}}></div>
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{financialMetrics.timeToJobPlacement} bulan</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Rata-rata waktu mendapatkan pekerjaan setelah mulai belajar</p>
          </div>
        </div>
      </div>

      {/* Business Metrics Dashboard */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 reveal">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h3 className="text-lg font-semibold text-amber-800 font-serif">Business Metrics & ROI Dashboard</h3>
          <button className="text-blue-700 text-sm flex items-center hover:underline self-start">
            Analisis Lengkap <TrendingUp className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        {/* Comparison Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Salary Comparison */}
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100 transform hover:scale-[1.01] transition-transform duration-300 mobile-no-hover">
            <h4 className="text-sm font-medium text-blue-800 mb-3">Perbandingan Gaji Sebelum vs Sesudah</h4>
            <div className="flex items-end gap-2 sm:gap-3 h-32 mb-2">
              <div className="h-full flex flex-col justify-end flex-1">
                <div className="bg-blue-700 bg-opacity-20 rounded-t-md p-2 text-center h-[40%] animate-slideIn animate-delay-100">
                  <span className="text-xs text-blue-800">Rata-rata</span>
                </div>
                <p className="text-center text-xs sm:text-sm font-medium mt-2">Sebelum</p>
              </div>
              <div className="h-full flex flex-col justify-end flex-1">
                <div className="bg-blue-700 rounded-t-md p-2 text-center h-[85%] animate-slideIn animate-delay-200">
                  <span className="text-xs text-white">+ {Math.round(financialMetrics.avgSalaryIncrease/10000)}jt</span>
                </div>
                <p className="text-center text-xs sm:text-sm font-medium mt-2">Sesudah</p>
              </div>
              <div className="h-full flex flex-col justify-end flex-1">
                <div className="bg-green-500 rounded-t-md p-2 text-center h-[95%] relative animate-slideIn animate-delay-300">
                  <span className="text-xs text-white">Premium</span>
                  <div className="absolute -top-3 left-0 right-0 text-center">
                    <span className="bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full">Target</span>
                  </div>
                </div>
                <p className="text-center text-xs sm:text-sm font-medium mt-2">Potensi</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">Perbandingan gaji bulanan rata-rata sebelum & sesudah program</p>
          </div>
          
          {/* ROI Breakdown */}
          <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100 transform hover:scale-[1.01] transition-transform duration-300 mobile-no-hover">
            <h4 className="text-sm font-medium text-green-800 mb-3">Perhitungan ROI Investasi Pendidikan</h4>
            <div className="space-y-2 sm:space-y-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">Nilai sertifikasi (tahunan)</span>
                <span className="text-xs sm:text-sm font-medium text-green-700">+ {formatCurrency(financialMetrics.annualValue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">Peningkatan gaji (tahunan)</span>
                <span className="text-xs sm:text-sm font-medium text-green-700">+ {formatCurrency(financialMetrics.avgSalaryIncrease * 12)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">Biaya program (tahunan)</span>
                <span className="text-xs sm:text-sm font-medium text-red-500">- {formatCurrency(calculateAnnualCost())}</span>
              </div>
              <div className="h-px bg-gray-200 my-1"></div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">Total keuntungan (ROI)</span>
                <span className="text-sm sm:text-base font-bold text-green-600">
                  {formatCurrency(financialMetrics.annualValue + (financialMetrics.avgSalaryIncrease * 12) - calculateAnnualCost())}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">Perhitungan ini berdasarkan data dari lulusan program sebelumnya</p>
          </div>
        </div>
        
        {/* Industry Metrics */}
        <div className="mb-6 reveal">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Industri & Permintaan Pasar</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-md mobile-no-hover">
              <span className="text-xs sm:text-sm text-gray-600 mb-1">Lowongan Pekerjaan Tech</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-bold text-amber-700">12.500+</span>
                <span className="text-xs text-green-600">+15% YoY</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Di Indonesia untuk wanita dalam teknologi</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-md mobile-no-hover">
              <span className="text-xs sm:text-sm text-gray-600 mb-1">Kesenjangan Talenta</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-bold text-amber-700">43%</span>
                <span className="text-xs text-gray-500">dari perusahaan</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Kekurangan SDM untuk posisi tech</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-md mobile-no-hover">
              <span className="text-xs sm:text-sm text-gray-600 mb-1">Partner Hiring</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-bold text-amber-700">35+</span>
                <span className="text-xs text-green-600">perusahaan</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Bermitra dengan HERizon untuk rekrutmen</p>
            </div>
          </div>
        </div>
        
        {/* Career Timeline Projection */}
        <div className="bg-blue-700 bg-opacity-5 rounded-lg p-3 sm:p-4 border border-blue-100 reveal transform hover:scale-[1.01] transition-transform duration-300 mobile-no-hover">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Proyeksi Karir & Pendapatan</h4>
          <div className="relative">
            <div className="h-1 bg-gray-200 absolute top-4 left-0 right-0"></div>
            <div className="flex justify-between relative z-10">
              <div className="text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-700 mx-auto flex items-center justify-center text-white text-xs animate-fadeIn">
                  0
                </div>
                <p className="text-xs mt-1">Mulai</p>
                <p className="text-xs font-bold">{formatCurrency(0)}</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-700 mx-auto flex items-center justify-center text-white text-xs animate-fadeIn animate-delay-100">
                  6
                </div>
                <p className="text-xs mt-1">6 Bulan</p>
                <p className="text-xs font-bold">{formatCurrency(500000)}</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-700 mx-auto flex items-center justify-center text-white text-xs animate-fadeIn animate-delay-200">
                  1
                </div>
                <p className="text-xs mt-1">1 Tahun</p>
                <p className="text-xs font-bold">{formatCurrency(2500000)}</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-700 mx-auto flex items-center justify-center text-white text-xs animate-fadeIn animate-delay-300">
                  2
                </div>
                <p className="text-xs mt-1">2 Tahun</p>
                <p className="text-xs font-bold">{formatCurrency(5000000)}</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500 mx-auto flex items-center justify-center text-white text-xs animate-fadeIn animate-delay-300">
                  5+
                </div>
                <p className="text-xs mt-1">5+ Tahun</p>
                <p className="text-xs font-bold">{formatCurrency(12000000)}+</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">Proyeksi pendapatan bulanan berdasarkan rata-rata alumni HERizon</p>
        </div>
      </div>

      {/* Financial Planning Assistant */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-orange-100 reveal">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h3 className="text-lg font-semibold text-amber-800 font-serif">Asisten Perencanaan Finansial</h3>
          <button className="bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs hover:bg-blue-600 border-l-2 border-orange-300 transition-colors touch-friendly self-start">
            Konsultasi Gratis
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-5">
          <div className="bg-amber-50 p-3 sm:p-4 rounded-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-md mobile-no-hover">
            <h4 className="font-medium text-amber-800 mb-2">Opsi Pembiayaan</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-700"></span>
                <span>Cicilan 0% dengan Bank Partner</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-700"></span>
                <span>Program Bayar Setelah Kerja</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-700"></span>
                <span>Dukungan Dana Pendidikan Pemerintah</span>
              </li>
            </ul>
          </div>
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-md mobile-no-hover">
            <h4 className="font-medium text-green-800 mb-2">Program Beasiswa</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-600"></span>
                <span>Beasiswa Wanita di Teknologi (50%)</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-600"></span>
                <span>Program Ibu Kembali Bekerja (75%)</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-600"></span>
                <span>Beasiswa Daerah Tertinggal (100%)</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-md mobile-no-hover">
            <h4 className="font-medium text-blue-800 mb-2">Manfaat Pajak</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></span>
                <span>Pengurangan PPh untuk Pendidikan</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></span>
                <span>Subsidi Pelatihan dari BPJS</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></span>
                <span>Keringanan Biaya dari Prakerja</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Financial Planning Calculator */}
        <div className="border border-blue-200 rounded-lg p-3 sm:p-4 bg-blue-50 reveal">
          <h4 className="font-medium text-blue-800 mb-2 sm:mb-3">Kalkulator Perencanaan Investasi Karir</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-center">
            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">Penghasilan Saat Ini</label>
              <div className="relative">
                <input
                  type="text"
                  value="0"
                  className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg pl-8 text-sm"
                  placeholder="Penghasilan saat ini"
                />
                <span className="absolute left-2 top-1.5 sm:top-2 text-gray-500 text-sm">Rp</span>
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">Target Penghasilan</label>
              <div className="relative">
                <input
                  type="text"
                  value="8,000,000"
                  className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg pl-8 text-sm"
                  placeholder="Target penghasilan"
                />
                <span className="absolute left-2 top-1.5 sm:top-2 text-gray-500 text-sm">Rp</span>
              </div>
            </div>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 border-l-2 border-orange-300 transition-colors touch-friendly">
              Hitung Return Investasi
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Kalkulator ini membantu memproyeksikan nilai investasi pendidikan Anda</p>
        </div>
        
        {/* Financial Planning Tips */}
        <div className="mt-4 p-3 bg-amber-50 rounded-lg reveal">
          <div className="flex items-center gap-2 mb-2">
            <Coffee className="w-5 h-5 text-amber-700" />
            <h4 className="font-medium text-amber-800">Tips Pendanaan Edukasi</h4>
          </div>
          <p className="text-xs sm:text-sm text-gray-700">
            Investasi dalam pendidikan teknologi memiliki ROI rata-rata 320% dalam 2 tahun. Manfaatkan beasiswa dan program pembiayaan untuk memulai karir tech Anda tanpa beban finansial berat.
          </p>
          <button className="mt-2 text-blue-700 text-xs hover:underline flex items-center">
            Pelajari strategi pembiayaan <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
  const renderCurrentTab = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'paths': return renderPaths();
      case 'certifications': return renderCertifications();
      case 'mentorship': return renderMentorship();
      case 'progress': return renderProgress();
      case 'financial': return renderFinancial();
      default: return renderDashboard();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <button 
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none transition-colors touch-friendly"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center">
          <span className="text-blue-800 font-bold text-lg font-serif">HERizon</span>
          <span className="bg-orange-400 text-white text-xs px-1.5 py-0.5 rounded ml-1">Beta</span>
        </div>
        
        <div className="flex items-center gap-2">
          {!isOnline && <WifiOff className="w-5 h-5 text-amber-500" />}
          <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none touch-friendly">
            <User className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="h-full w-3/4 max-w-xs bg-white shadow-lg flex flex-col">
          {/* Menu Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-blue-800 font-serif">HERizon</h3>
              <p className="text-xs text-gray-500">{userProfile.role}</p>
            </div>
            <button 
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* User Profile Summary */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h4 className="font-medium">{userProfile.name}</h4>
                <p className="text-xs text-gray-500">{userProfile.location}</p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => switchTab(item.id)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {offlineContent.downloaded.includes(item.id) && (
                      <Download className="w-4 h-4 text-green-600 ml-auto" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Offline Status */}
          <div className="p-4 border-t">
            <div className={`flex items-center text-sm ${isOnline ? 'text-green-600' : 'text-amber-600'}`}>
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 mr-2" />
                  <span>Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 mr-2" />
                  <span>Offline Mode</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 -z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="w-64 h-screen sticky top-0 bg-white shadow-sm flex flex-col">
          {/* Desktop Logo */}
          <div className="p-4 border-b">
            <h2 className="font-bold text-xl text-blue-800 font-serif">HERizon</h2>
            <p className="text-xs text-gray-500">Platform Karir Wanita di Tech</p>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => switchTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                      activeTab === item.id 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {offlineContent.downloaded.includes(item.id) && (
                      <Download className="w-4 h-4 text-green-600 ml-auto" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{userProfile.name}</h4>
                <p className="text-xs text-gray-500 truncate">{userProfile.role}</p>
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className={`md:flex-1 px-4 py-6 md:ml-64 ${tabAnimation}`}>
        {/* Toast Notification */}
        {toast.visible && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-up z-50 flex items-center">
            <Check className="w-4 h-4 mr-2" />
            <span>{toast.message}</span>
          </div>
        )}
        
        {/* Loading Indicator for Downloads */}
        {isDownloading && (
          <div className="fixed bottom-6 right-6 bg-white border border-blue-100 shadow-lg rounded-lg p-3 flex items-center animate-pulse z-50">
            <div className="animate-spin mr-2">
              <RefreshCw className="w-5 h-5 text-blue-700" />
            </div>
            <span className="text-sm">Mengunduh konten...</span>
          </div>
        )}
        
        {/* Mobile Tab Bar */}
        <div className="md:hidden mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 w-max pb-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => switchTab(item.id)}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 whitespace-nowrap ${
                  activeTab === item.id 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-gray-100 text-gray-700'
                } transition-colors`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Current Tab Content */}
        <div className={tabAnimation}>
          {renderCurrentTab()}
        </div>
        
        {/* Back to Top Button */}
        {showBackToTop && (
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40 touch-friendly"
            aria-label="Back to top"
          >
            <ArrowLeft className="w-5 h-5 transform rotate-90" />
          </button>
        )}
      </main>
      
      {/* Bottom Navigation Bar (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-30">
        <div className="flex justify-around">
          <button 
            onClick={() => switchTab('dashboard')}
            className={`p-3 flex flex-col items-center flex-1 ${activeTab === 'dashboard' ? 'text-blue-700' : 'text-gray-500'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Beranda</span>
          </button>
          <button 
            onClick={() => switchTab('paths')}
            className={`p-3 flex flex-col items-center flex-1 ${activeTab === 'paths' ? 'text-blue-700' : 'text-gray-500'}`}
          >
            <Target className="w-5 h-5" />
            <span className="text-xs mt-1">Jalur</span>
          </button>
          <button 
            onClick={() => switchTab('certifications')}
            className={`p-3 flex flex-col items-center flex-1 ${activeTab === 'certifications' ? 'text-blue-700' : 'text-gray-500'}`}
          >
            <Award className="w-5 h-5" />
            <span className="text-xs mt-1">Sertifikasi</span>
          </button>
          <button 
            onClick={() => switchTab('mentorship')}
            className={`p-3 flex flex-col items-center flex-1 ${activeTab === 'mentorship' ? 'text-blue-700' : 'text-gray-500'}`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Mentor</span>
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-3 flex flex-col items-center flex-1 text-gray-500"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs mt-1">Lainnya</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;