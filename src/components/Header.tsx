import React, { useState } from 'react';
import { PageId } from '../types/portfolio';
import { SkipLink } from './SkipLink';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isInspectSemantics: boolean;
  onOpenAudit: () => void;
}

const NAV_ITEMS: { id: PageId; label: string; description: string }[] = [
  { id: 'home', label: 'Overview', description: 'Systems overview, metrics, and summary' },
  { id: 'projects', label: 'Case Studies', description: 'WCAG 2.2 compliant architecture projects' },
  { id: 'about', label: 'Philosophy', description: 'Engineering background and certifications' },
  { id: 'articles', label: 'Standards & Articles', description: 'Deep-dives into semantic HTML and ARIA' },
  { id: 'contact', label: 'Contact', description: 'Accessible inquiry and consultation form' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  isInspectSemantics,
  onOpenAudit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    // Programmatically shift focus to the main heading or main content region for screen reader users
    setTimeout(() => {
      const heading = document.querySelector('main h1') as HTMLElement;
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      } else {
        const main = document.getElementById('main-content');
        if (main) {
          main.setAttribute('tabindex', '-1');
          main.focus();
        }
      }
    }, 50);
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-30 bg-slate-900 text-slate-100 border-b border-slate-800 transition-colors"
    >
      <SkipLink />

      {/* Semantic Landmark Visual Inspector Badge */}
      {isInspectSemantics && (
        <div
          className="bg-sky-950 text-sky-200 border-b border-sky-600 px-4 py-1 text-xs font-mono flex items-center justify-between"
          aria-hidden="true"
        >
          <span>&lt;header role="banner"&gt;</span>
          <span>Landmark: banner</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Site Identity / Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="group flex flex-col focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-md p-1 -m-1"
              aria-label="Elena Rostova, Senior Accessibility Engineer &amp; Systems Architect – Return to Home Overview"
            >
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Elena Rostova
              </span>
              <span className="text-xs text-slate-400 font-mono tracking-normal">
                WCAG 2.2 AAA · Systems Architect
              </span>
            </a>
          </div>

          {/* Primary Navigation (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1"
          >
            {isInspectSemantics && (
              <span
                className="text-[10px] font-mono text-emerald-400 mr-2 px-1.5 py-0.5 border border-emerald-500 rounded"
                aria-hidden="true"
              >
                &lt;nav aria-label="Primary Navigation"&gt;
              </span>
            )}
            <ul className="flex items-center gap-1 list-none m-0 p-0" role="list">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden ${
                        isActive
                          ? 'text-white bg-slate-800'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-400 rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Quick Lighthouse Score Pill Button */}
            <div className="ml-4 pl-4 border-l border-slate-800">
              <button
                type="button"
                onClick={onOpenAudit}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-700/60 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden transition-colors"
                aria-label="Open Lighthouse 100/100 and WCAG Compliance Audit Details"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>100 A11y &amp; SEO</span>
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-primary-navigation"
              aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-primary-navigation"
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-5"
        >
          <ul className="flex flex-col gap-1 list-none p-0 m-0" role="list">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden flex items-center justify-between ${
                      isActive
                        ? 'bg-slate-800 text-white font-semibold text-emerald-400'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-500 font-normal">{item.description}</span>
                  </button>
                </li>
              );
            })}
            <li className="pt-2 border-t border-slate-800 mt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAudit();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  Lighthouse 100/100 Audit Verification
                </span>
                <span className="font-mono">100/100</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
