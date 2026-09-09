import React, { useState, useEffect } from 'react';
import { useDataStore } from './data/dataStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import LeadModal from './components/LeadModal';
import CourseDetailModal from './components/CourseDetailModal';
import ErrorBoundary from './components/ErrorBoundary';
import LogoIntroAnimation from './components/LogoIntroAnimation';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TrainingPage from './pages/TrainingPage';
import ServicesPage from './pages/ServicesPage';
import ProductionPage from './pages/ProductionPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminLeads from './admin/AdminLeads';
import AdminCourses from './admin/AdminCourses';
import AdminServices from './admin/AdminServices';
import AdminPortfolio from './admin/AdminPortfolio';
import AdminProduction from './admin/AdminProduction';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminTeam from './admin/AdminTeam';
import AdminBlog from './admin/AdminBlog';
import AdminSettings from './admin/AdminSettings';
import AdminContent from './admin/AdminContent';
import AdminPartners from './admin/AdminPartners';
import AdminUsers from './admin/AdminUsers';
import { getLangText } from './utils/langHelper';

import { Sparkles, Megaphone } from 'lucide-react';

export default function App() {
  const store = useDataStore();
  const [currentLang, setCurrentLang] = useState('en');
  const [activePage, setActivePage] = useState('home');

  // Admin Auth State
  const [adminAuth, setAdminAuth] = useState(() => {
    const saved = sessionStorage.getItem('vedanta_admin_auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null, role: 'super_admin' };
  });
  const [adminTab, setAdminTab] = useState('dashboard');

  // Modals & Cinematic Intro
  const [leadModal, setLeadModal] = useState({ isOpen: false, purpose: 'general', courseId: '' });
  const [courseModal, setCourseModal] = useState({ isOpen: false, course: null });
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('vedanta_intro_seen');
  });

  const replayIntro = () => {
    setShowIntro(true);
  };

  // Handle Hash URLs (e.g. #/admin or #training)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash === 'admin') {
        setActivePage('admin');
      } else if (hash && ['home', 'about', 'training', 'services', 'production', 'portfolio', 'blog', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openLeadModal = (purpose = 'general', courseId = '') => {
    setLeadModal({ isOpen: true, purpose, courseId });
  };

  const closeLeadModal = () => {
    setLeadModal({ isOpen: false, purpose: 'general', courseId: '' });
  };

  const openCourseModal = (course) => {
    setCourseModal({ isOpen: true, course });
  };

  const closeCourseModal = () => {
    setCourseModal({ isOpen: false, course: null });
  };

  const handleLeadSubmit = (leadData) => {
    store.addLead(leadData);
  };

  const handleAdminLogin = ({ email, role }) => {
    const authData = { isAuthenticated: true, user: email, role };
    setAdminAuth(authData);
    sessionStorage.setItem('vedanta_admin_auth', JSON.stringify(authData));
    setAdminTab('dashboard');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('vedanta_admin_auth');
    setAdminAuth({ isAuthenticated: false, user: null, role: 'super_admin' });
    setActivePage('home');
  };

  // If Admin Page is Active
  if (activePage === 'admin') {
    if (!adminAuth.isAuthenticated) {
      return (
        <AdminLogin
          adminUsers={store.adminUsers}
          onLoginSuccess={handleAdminLogin}
          onBackToSite={() => setActivePage('home')}
        />
      );
    }

    return (
      <AdminLayout
        activeTab={adminTab}
        setActiveTab={setAdminTab}
        currentRole={adminAuth.role}
        setCurrentRole={(newRole) => setAdminAuth(prev => ({ ...prev, role: newRole }))}
        onLogout={handleAdminLogout}
        onBackToSite={() => setActivePage('home')}
        leadCount={store.leads?.filter(l => l.status === 'new').length}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard
            leads={store.leads}
            courses={store.courses}
            portfolioItems={store.portfolioItems}
            setActiveTab={setAdminTab}
            updateLeadStatus={store.updateLeadStatus}
          />
        )}
        {adminTab === 'leads' && (
          <AdminLeads
            leads={store.leads}
            updateLeadStatus={store.updateLeadStatus}
            deleteLead={store.deleteLead}
          />
        )}
        {adminTab === 'content' && (
          <AdminContent
            siteContent={store.siteContent}
            updateSiteContent={store.updateSiteContent}
            resetStoreToDefault={store.resetStoreToDefault}
          />
        )}
        {adminTab === 'partners' && (
          <AdminPartners
            partners={store.partners}
            addPartner={store.addPartner}
            updatePartner={store.updatePartner}
            deletePartner={store.deletePartner}
          />
        )}
        {adminTab === 'courses' && (
          <AdminCourses
            courses={store.courses}
            addCourse={store.addCourse}
            updateCourse={store.updateCourse}
            deleteCourse={store.deleteCourse}
          />
        )}
        {adminTab === 'services' && (
          <AdminServices
            services={store.services}
            updateService={store.updateService}
            addService={store.addService}
            deleteService={store.deleteService}
          />
        )}
        {adminTab === 'portfolio' && (
          <AdminPortfolio
            portfolioItems={store.portfolioItems}
            addPortfolio={store.addPortfolio}
            updatePortfolio={store.updatePortfolio}
            deletePortfolio={store.deletePortfolio}
          />
        )}
        {adminTab === 'production' && (
          <AdminProduction
            productionGallery={store.productionGallery}
            addProductionItem={store.addProductionItem}
            updateProductionItem={store.updateProductionItem}
            deleteProductionItem={store.deleteProductionItem}
          />
        )}
        {adminTab === 'testimonials' && (
          <AdminTestimonials
            testimonials={store.testimonials}
            addTestimonial={store.addTestimonial}
            deleteTestimonial={store.deleteTestimonial}
          />
        )}
        {adminTab === 'team' && (
          <AdminTeam
            teamMembers={store.teamMembers}
            addTeamMember={store.addTeamMember}
            updateTeamMember={store.updateTeamMember}
            deleteTeamMember={store.deleteTeamMember}
          />
        )}
        {adminTab === 'blog' && (
          <AdminBlog
            blogPosts={store.blogPosts}
            addBlogPost={store.addBlogPost}
            deleteBlogPost={store.deleteBlogPost}
          />
        )}
        {adminTab === 'users' && (
          <AdminUsers
            adminUsers={store.adminUsers}
            currentAdmin={adminAuth.user}
            addAdminUser={store.addAdminUser}
            updateAdminUser={store.updateAdminUser}
            deleteAdminUser={store.deleteAdminUser}
          />
        )}
        {adminTab === 'settings' && (
          <AdminSettings
            siteSettings={store.siteSettings}
            updateSettings={store.updateSettings}
            resetStoreToDefault={store.resetStoreToDefault}
          />
        )}
      </AdminLayout>
    );
  }

  // Public Website Render
  return (
    <div>
      {/* Cinematic Logo Opening Animation */}
      {showIntro && (
        <LogoIntroAnimation 
          onComplete={() => setShowIntro(false)} 
          forceShow={showIntro}
        />
      )}

      {/* Top Announcement Bar */}
      {getLangText(store.siteSettings, 'announcementText', currentLang) && (
        <div style={{ background: 'linear-gradient(90deg, #b45309 0%, #f59e0b 50%, #b45309 100%)', color: '#000', padding: '7px 20px', fontSize: '0.82rem', fontWeight: '700', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Megaphone size={14} />
          <span>{getLangText(store.siteSettings, 'announcementText', currentLang)}</span>
          <button 
            onClick={() => openLeadModal('training')}
            style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 'var(--radius-full)', padding: '2px 10px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', marginLeft: '6px' }}
          >
            {currentLang === 'ne' ? 'अहिले भर्ना हुनुहोस् →' : 'Apply Now →'}
          </button>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <Navbar
        currentLang={currentLang}
        setLang={setCurrentLang}
        activePage={activePage}
        setActivePage={setActivePage}
        openLeadModal={openLeadModal}
        replayIntro={replayIntro}
      />

      {/* Dynamic Main Page Content */}
      <ErrorBoundary>
        <main>
          {activePage === 'home' && (
            <HomePage
              currentLang={currentLang}
              siteContent={store.siteContent}
              partners={store.partners}
              courses={store.courses}
              services={store.services}
              productionGallery={store.productionGallery}
              portfolioItems={store.portfolioItems}
              testimonials={store.testimonials}
              blogPosts={store.blogPosts}
              setActivePage={setActivePage}
              openLeadModal={openLeadModal}
              openCourseModal={openCourseModal}
            />
          )}

          {activePage === 'about' && (
            <AboutPage
              currentLang={currentLang}
              siteContent={store.siteContent}
              teamMembers={store.teamMembers}
              openLeadModal={openLeadModal}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'training' && (
            <TrainingPage
              currentLang={currentLang}
              courses={store.courses}
              openCourseModal={openCourseModal}
              openLeadModal={openLeadModal}
            />
          )}

          {activePage === 'services' && (
            <ServicesPage
              currentLang={currentLang}
              services={store.services}
              openLeadModal={openLeadModal}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'production' && (
            <ProductionPage
              currentLang={currentLang}
              productionGallery={store.productionGallery}
              openLeadModal={openLeadModal}
            />
          )}

          {activePage === 'portfolio' && (
            <PortfolioPage
              currentLang={currentLang}
              portfolioItems={store.portfolioItems}
              openLeadModal={openLeadModal}
            />
          )}

          {activePage === 'blog' && (
            <BlogPage
              currentLang={currentLang}
              blogPosts={store.blogPosts}
              openLeadModal={openLeadModal}
            />
          )}

          {activePage === 'contact' && (
            <ContactPage
              currentLang={currentLang}
              siteSettings={store.siteSettings}
              onLeadSubmit={handleLeadSubmit}
            />
          )}
        </main>
      </ErrorBoundary>

      {/* Site Footer */}
      <Footer
        currentLang={currentLang}
        setActivePage={setActivePage}
        openLeadModal={openLeadModal}
        siteSettings={store.siteSettings}
        replayIntro={replayIntro}
      />

      {/* Floating WhatsApp Quick Chat */}
      <WhatsAppWidget
        whatsappNumber={store.siteSettings?.whatsappNumber}
        currentLang={currentLang}
      />

      {/* Lead Inquiry Dynamic Modal */}
      <LeadModal
        isOpen={leadModal.isOpen}
        onClose={closeLeadModal}
        defaultPurpose={leadModal.purpose}
        defaultCourseId={leadModal.courseId}
        courses={store.courses}
        onLeadSubmit={handleLeadSubmit}
        currentLang={currentLang}
      />

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={courseModal.course}
        isOpen={courseModal.isOpen}
        onClose={closeCourseModal}
        onEnroll={(courseId) => openLeadModal('training', courseId)}
        currentLang={currentLang}
      />
    </div>
  );
}
