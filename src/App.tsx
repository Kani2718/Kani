import React, { useState } from 'react';
import { CampusProvider, useCampus, NavigationPage } from './context/CampusContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { DemoController } from './components/layout/DemoController';
import { ToastContainer } from './components/layout/ToastContainer';

// Public Pages
import { LandingPage } from './components/public/LandingPage';
import { AboutPage } from './components/public/AboutPage';
import { FeaturesPage } from './components/public/FeaturesPage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { PublicSustainabilityPage } from './components/public/PublicSustainabilityPage';
import { ContactPage } from './components/public/ContactPage';

// Auth Pages
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { LogoutConfirmModal } from './components/auth/LogoutConfirmModal';

// Dashboard Pages
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { ClassroomManagement } from './components/dashboard/ClassroomManagement';
import { LabManagement } from './components/dashboard/LabManagement';
import { OccupancyMonitoring } from './components/dashboard/OccupancyMonitoring';
import { EnergyMonitoring } from './components/dashboard/EnergyMonitoring';
import { WaterMonitoring } from './components/dashboard/WaterMonitoring';
import { AIPredictions } from './components/dashboard/AIPredictions';
import { AIRecommendations } from './components/dashboard/AIRecommendations';
import { AlertsPage } from './components/dashboard/AlertsPage';
import { SustainabilityDashboard } from './components/dashboard/SustainabilityDashboard';
import { AnalyticsReports } from './components/dashboard/AnalyticsReports';
import { SettingsPage } from './components/dashboard/SettingsPage';
import { UserProfilePage } from './components/dashboard/UserProfilePage';

const AppContent: React.FC = () => {
  const { currentPage, user, navigateTo } = useCampus();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isPublicPage = [
    'landing',
    'about',
    'features',
    'how-it-works',
    'public-sustainability',
    'contact',
    'login',
    'register',
    'forgot-password',
  ].includes(currentPage);

  const isAuthPage = ['login', 'register', 'forgot-password'].includes(currentPage);

  // Protected route guard: redirect unauthenticated access to login
  React.useEffect(() => {
    if (!isPublicPage && !user) {
      navigateTo(currentPage);
    }
  }, [isPublicPage, user, currentPage, navigateTo]);

  const renderCurrentView = () => {
    switch (currentPage) {
      // Public Views
      case 'landing':
        return <LandingPage />;
      case 'about':
        return <AboutPage />;
      case 'features':
        return <FeaturesPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'public-sustainability':
        return <PublicSustainabilityPage />;
      case 'contact':
        return <ContactPage />;

      // Auth Views
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'forgot-password':
        return <ForgotPasswordPage />;

      // Dashboard Views
      case 'dashboard':
        return <AdminDashboard />;
      case 'classrooms':
        return <ClassroomManagement />;
      case 'labs':
        return <LabManagement />;
      case 'occupancy':
        return <OccupancyMonitoring />;
      case 'energy':
        return <EnergyMonitoring />;
      case 'water':
        return <WaterMonitoring />;
      case 'predictions':
        return <AIPredictions />;
      case 'recommendations':
        return <AIRecommendations />;
      case 'alerts':
        return <AlertsPage />;
      case 'sustainability':
        return <SustainabilityDashboard />;
      case 'analytics':
        return <AnalyticsReports />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <UserProfilePage />;

      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c15] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Main Top Navigation */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Content Layout */}
      {isPublicPage ? (
        <main className="flex-1">
          {renderCurrentView()}
          {!isAuthPage && <Footer />}
        </main>
      ) : (
        <div className="flex-1 flex">
          {/* Dashboard Left Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main Dashboard Application View */}
          <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
            <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24">
              {renderCurrentView()}
            </div>
          </main>
        </div>
      )}

      {/* Floating Interactive Hackathon Demo Controller Dock */}
      <DemoController />

      {/* Logout Confirmation Dialog Modal */}
      <LogoutConfirmModal />
    </div>
  );
};

export function App() {
  return (
    <CampusProvider>
      <AppContent />
    </CampusProvider>
  );
}

export default App;
