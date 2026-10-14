import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { LandmarkTag } from '../components/LandmarkTag';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageId } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Clock, KeyRound, MapPin, HelpCircle, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  setCurrentPage: (page: PageId) => void;
  isInspectSemantics: boolean;
  announceMessage: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  setCurrentPage,
  isInspectSemantics,
  announceMessage
}) => {
  return (
    <div className="space-y-12">
      <Breadcrumbs
        currentPage="contact"
        setCurrentPage={setCurrentPage}
        pageTitle="Contact & Consultation Inquiries"
      />

      {/* Header section */}
      <section aria-labelledby="contact-heading" className="space-y-3">
        <LandmarkTag
          tag="section aria-labelledby='contact-heading'"
          className="text-indigo-600 dark:text-indigo-400"
        />

        <div className="max-w-3xl">
          <h1
            id="contact-heading"
            tabIndex={-1}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white focus:outline-hidden"
          >
            Initiate an Accessibility Consultation
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Whether preparing for a federal Section 508 VPAT filing, refactoring a design system to WCAG 2.2 AAA, or training your frontend squads, submit your architectural requirements below.
          </p>
        </div>
      </section>

      {/* Two-column layout: Accessible Form (8 cols) & Office Colophon (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Form Column */}
        <section
          aria-labelledby="contact-form-heading"
          className="lg:col-span-8 space-y-4"
        >
          <LandmarkTag
            tag="section aria-labelledby='contact-form-heading'"
            className="text-indigo-600 dark:text-indigo-400"
          />

          <div className="flex items-center justify-between pb-2">
            <h2
              id="contact-form-heading"
              className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Consultation Specification Form
            </h2>
            <span className="text-xs text-slate-500 font-mono">Tab-Navigable · ARIA 1.2</span>
          </div>

          <ContactForm
            announceMessage={announceMessage}
            isInspectSemantics={isInspectSemantics}
          />
        </section>

        {/* Aside Column: Office Details, Encryption & Policies */}
        <aside
          aria-labelledby="office-colophon-heading"
          className="lg:col-span-4 space-y-6"
        >
          <LandmarkTag
            tag="aside aria-labelledby='office-colophon-heading'"
            className="text-purple-600 dark:text-purple-400"
          />

          {/* Office Details Card with Semantic <address> */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h2
              id="office-colophon-heading"
              className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Office Hours &amp; Response SLA</span>
            </h2>

            <address className="not-italic text-xs text-slate-600 dark:text-slate-300 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Location</strong>
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Direct Email</strong>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-emerald-600 dark:text-emerald-400 underline focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Working Hours</strong>
                  <span>Mon — Fri: 08:30 — 17:30 PT</span>
                </div>
              </div>
            </address>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-300">
              <strong className="block text-slate-900 dark:text-white font-medium mb-1">Standard Response SLA:</strong>
              All verified inquiries receive a scoping breakdown and calendar availability link within 24 business hours.
            </div>
          </div>

          {/* Secure PGP Block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-3 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Encrypted Communications</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              For confidential vulnerability disclosures, security audits, or sensitive government RFPs, please encrypt transmissions with Elena's public OpenPGP key:
            </p>
            <pre
              tabIndex={0}
              className="p-3 bg-slate-950 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto border border-slate-800 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
              aria-label="OpenPGP Fingerprint"
            >
              <code>4F89 B21C 8892 01FA 72EE 1993 42B1 CE99 873A 021F</code>
            </pre>
          </div>
        </aside>
      </div>

      {/* Semantic Native <details> and <summary> FAQ Section */}
      <section
        aria-labelledby="faq-heading"
        className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6"
      >
        <LandmarkTag
          tag="section aria-labelledby='faq-heading'"
          className="text-indigo-600 dark:text-indigo-400"
        />

        <div className="max-w-2xl">
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2"
          >
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>Consultation &amp; Engagement FAQs</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Accessible disclosures using native HTML5 <code className="font-mono text-emerald-600 dark:text-emerald-400">&lt;details&gt;</code> and <code className="font-mono text-emerald-600 dark:text-emerald-400">&lt;summary&gt;</code> elements with built-in keyboard support.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl">
          <details className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all">
            <summary className="font-semibold text-sm text-slate-900 dark:text-white cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-md list-none flex items-center justify-between">
              <span>What is your methodology for automated vs manual screen reader testing?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform font-mono text-xs">▼</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
              Automated tools like axe-core and Lighthouse only detect approximately 30-40% of WCAG violations (such as contrast, basic labeling, and duplicate IDs). Elena's audits always pair automated CI gating with rigorous human protocol testing across JAWS, NVDA, and VoiceOver on actual hardware with braille displays and switch controllers.
            </p>
          </details>

          <details className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all">
            <summary className="font-semibold text-sm text-slate-900 dark:text-white cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-md list-none flex items-center justify-between">
              <span>Do you provide Section 508 VPAT / ACR documentation?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform font-mono text-xs">▼</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
              Yes. As a DHS Section 508 Trusted Tester, Elena authors formal Voluntary Product Accessibility Templates (VPAT 2.5) across WCAG 2.1 AA, WCAG 2.2 AA/AAA, and EN 301 549 specifications for submission in federal and European procurement tenders.
            </p>
          </details>

          <details className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all">
            <summary className="font-semibold text-sm text-slate-900 dark:text-white cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-md list-none flex items-center justify-between">
              <span>Can you audit Figma design tokens prior to frontend implementation?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform font-mono text-xs">▼</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
              Absolutely. Eliminating contrast errors and defining focus order in the design token phase prevents 70% of downstream engineering rework. We test token contrast pairs, typography scaling, and component states before code is written.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
};
