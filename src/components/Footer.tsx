import React from 'react';
import { PageId } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Mail, MapPin, CheckCircle, ExternalLink } from 'lucide-react';

interface FooterProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isInspectSemantics: boolean;
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  isInspectSemantics,
  onOpenAudit
}) => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.getElementById('main-content');
    if (mainEl) {
      mainEl.setAttribute('tabindex', '-1');
      mainEl.focus();
    }
  };

  return (
    <footer
      role="contentinfo"
      className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors"
    >
      {/* Semantic Landmark Visual Inspector Badge */}
      {isInspectSemantics && (
        <div
          className="bg-red-950 text-red-200 border-b border-red-700 px-4 py-1 text-xs font-mono flex items-center justify-between"
          aria-hidden="true"
        >
          <span>&lt;footer role="contentinfo"&gt;</span>
          <span>Landmark: contentinfo</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Identity & Bio */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <p className="text-xs text-emerald-400 font-mono mt-0.5">
                {PERSONAL_INFO.role}
              </p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Committed to eliminating digital friction for disabled users through native HTML5 semantics, robust ARIA contracts, and mathematically verified contrast.
            </p>

            {/* Semantic Address Element */}
            <address className="not-italic text-xs text-slate-400 flex flex-col gap-2 mt-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-slate-300 hover:text-emerald-400 underline decoration-slate-600 underline-offset-4 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </address>
          </div>

          {/* Quick Links Nav */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h2>
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-col gap-2 text-sm list-none p-0 m-0" role="list">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs text-left"
                  >
                    Home Overview
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs text-left"
                  >
                    WCAG Case Studies
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs text-left"
                  >
                    Philosophy &amp; Credentials
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('articles');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs text-left"
                  >
                    Standards &amp; Articles
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs text-left"
                  >
                    Accessible Contact Form
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social Profiles & Compliance */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Profiles &amp; Standards
            </h2>
            <nav aria-label="External Profiles">
              <ul className="flex flex-col gap-2 text-sm list-none p-0 m-0" role="list">
                {PERSONAL_INFO.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs"
                      aria-label={`${social.label} (opens in a new window)`}
                    >
                      <span>{social.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                <span>WCAG 2.2 Level AAA Statement</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                This website is validated against W3C HTML5 semantics, WAI-ARIA 1.2, and Section 508.
              </p>
              <button
                type="button"
                onClick={onOpenAudit}
                className="mt-1 text-xs text-emerald-300 hover:text-emerald-200 text-left underline font-medium focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
              >
                Inspect Automated Audit Check (100 / 100)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright and back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {PERSONAL_INFO.name}. Built with semantic HTML5, zero AI-slop pills, and strict WCAG accessibility guidelines.
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
