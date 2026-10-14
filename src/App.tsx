import React, { useState, useEffect } from 'react';
import { PageId } from './types/portfolio';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { A11yToolbar } from './components/A11yToolbar';
import { AuditPanel } from './components/AuditPanel';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isTextSpacing, setIsTextSpacing] = useState<boolean>(false);
  const [isInspectSemantics, setIsInspectSemantics] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

  const announceMessage = (message: string) => {
    setLiveAnnouncement('');
    // Use timeout to ensure screen reader detects mutation
    setTimeout(() => {
      setLiveAnnouncement(message);
    }, 40);
  };

  // Sync hash with current page for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'projects', 'about', 'articles', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check initial hash
    const initialHash = window.location.hash.replace('#', '') as PageId;
    if (['home', 'projects', 'about', 'articles', 'contact'].includes(initialHash)) {
      setCurrentPage(initialHash);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (newPage: PageId) => {
    setCurrentPage(newPage);
    window.location.hash = newPage;
    const pageTitles: Record<PageId, string> = {
      home: 'Overview – Elena Rostova Portfolio',
      projects: 'WCAG 2.2 Case Studies – Elena Rostova',
      about: 'Philosophy & Credentials – Elena Rostova',
      articles: 'Standards & Technical Writing – Elena Rostova',
      contact: 'Accessible Contact & Consultation – Elena Rostova',
      audit: 'Audit Matrix – Elena Rostova'
    };
    document.title = pageTitles[newPage] || 'Elena Rostova – Senior Accessibility Engineer';
    announceMessage(`Navigated to ${newPage} page. ${pageTitles[newPage]}`);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isHighContrast ? 'high-contrast-mode bg-black text-white' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'
      } ${isTextSpacing ? 'accessible-text-spacing' : ''} ${
        isInspectSemantics ? 'semantic-inspect-active' : ''
      }`}
    >
      {/* ARIA Live Region for Screen Reader Announcements (WCAG 4.1.3) */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="a11y-announcer"
      >
        {liveAnnouncement}
      </div>

      {/* Semantic Landmark: <header role="banner"> */}
      <Header
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        isInspectSemantics={isInspectSemantics}
        onOpenAudit={() => setIsAuditModalOpen(true)}
      />

      {/* Semantic Landmark: <main role="main"> */}
      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 focus:outline-hidden"
      >
        {isInspectSemantics && (
          <div
            className="mb-6 p-2 bg-amber-950 text-amber-200 border-2 border-amber-600 rounded-lg text-xs font-mono flex items-center justify-between"
            aria-hidden="true"
          >
            <span className="font-bold">&lt;main id="main-content" role="main" tabIndex="-1"&gt;</span>
            <span className="text-[11px] bg-amber-900/60 px-2 py-0.5 rounded">
              Active Page: {currentPage.toUpperCase()}
            </span>
          </div>
        )}

        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={handlePageChange}
            isInspectSemantics={isInspectSemantics}
            onOpenAudit={() => setIsAuditModalOpen(true)}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            setCurrentPage={handlePageChange}
            isInspectSemantics={isInspectSemantics}
            announceMessage={announceMessage}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            setCurrentPage={handlePageChange}
            isInspectSemantics={isInspectSemantics}
          />
        )}

        {currentPage === 'articles' && (
          <ArticlesPage
            setCurrentPage={handlePageChange}
            isInspectSemantics={isInspectSemantics}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            setCurrentPage={handlePageChange}
            isInspectSemantics={isInspectSemantics}
            announceMessage={announceMessage}
          />
        )}
      </main>

      {/* Semantic Landmark: <footer role="contentinfo"> */}
      <Footer
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        isInspectSemantics={isInspectSemantics}
        onOpenAudit={() => setIsAuditModalOpen(true)}
      />

      {/* Floating Accessibility Controls & Inspector Toolbar */}
      <A11yToolbar
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isTextSpacing={isTextSpacing}
        setIsTextSpacing={setIsTextSpacing}
        isInspectSemantics={isInspectSemantics}
        setIsInspectSemantics={setIsInspectSemantics}
        onOpenAudit={() => setIsAuditModalOpen(true)}
        announceMessage={announceMessage}
      />

      {/* Interactive 100/100 Lighthouse & WCAG Audit Modal */}
      <AuditPanel
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        announceMessage={announceMessage}
      />
    </div>
  );
}
