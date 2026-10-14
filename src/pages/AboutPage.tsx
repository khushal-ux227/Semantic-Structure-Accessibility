import React from 'react';
import { EXPERIENCES, CERTIFICATIONS, PERSONAL_INFO } from '../data/portfolioData';
import { LandmarkTag } from '../components/LandmarkTag';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageId } from '../types/portfolio';
import { Award, Briefcase, Cpu, CheckCircle2, HeartHandshake, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: PageId) => void;
  isInspectSemantics: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setCurrentPage,
  isInspectSemantics
}) => {
  return (
    <div className="space-y-12">
      <Breadcrumbs
        currentPage="about"
        setCurrentPage={setCurrentPage}
        pageTitle="About & Engineering Philosophy"
      />

      {/* Main Intro Article */}
      <article
        aria-labelledby="about-main-heading"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6"
      >
        <LandmarkTag
          tag="article aria-labelledby='about-main-heading'"
          className="text-pink-600 dark:text-pink-400"
        />

        <header className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h1
            id="about-main-heading"
            tabIndex={-1}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white focus:outline-hidden"
          >
            Engineering for the Outer Margins of Human Ability
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            My engineering philosophy is rooted in a fundamental truth: disability is not an individual deficit; it is an artifact of careless interface architecture. When software breaks for a screen reader user or keyboard navigator, the software is defective.
          </p>
        </header>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          <p>
            Trained as a systems architect at the University of Washington, I have spent the last ten years shifting accessibility from a late-stage audit ticket to a core architectural constraint. Just as security and performance must be baked into the compiler and continuous integration pipeline, accessibility semantics must be non-negotiable primitives.
          </p>
          <p>
            I specialize in replacing brittle, JavaScript-heavy ARIA polyfills with pure HTML5 primitives. When you utilize the platform's native features—such as <code className="font-mono text-emerald-600 dark:text-emerald-400">&lt;dialog&gt;</code>, <code className="font-mono text-emerald-600 dark:text-emerald-400">&lt;details&gt;</code>, <code className="font-mono text-emerald-600 dark:text-emerald-400">&lt;main&gt;</code>, and native form elements—the browser itself assumes responsibility for accessibility trees, focus management, and speech synthesis.
          </p>
        </div>
      </article>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Career Timeline Section (8 columns) */}
        <section
          aria-labelledby="experience-heading"
          className="lg:col-span-8 space-y-6"
        >
          <LandmarkTag
            tag="section aria-labelledby='experience-heading'"
            className="text-indigo-600 dark:text-indigo-400"
          />

          <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2
              id="experience-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2"
            >
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Professional Trajectory</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">10+ Years Experience</span>
          </div>

          {/* Semantic Ordered List for Chronological Timeline */}
          <ol className="space-y-8 list-none p-0 m-0" role="list">
            {EXPERIENCES.map((exp, idx) => (
              <li
                key={idx}
                className="relative pl-6 sm:pl-8 border-l-2 border-emerald-600 dark:border-emerald-500 space-y-3"
              >
                {/* Dot marker */}
                <span
                  className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-emerald-600 dark:border-emerald-400"
                  aria-hidden="true"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <time dateTime={exp.period}>{exp.period}</time>
                    <span aria-hidden="true">·</span>
                    <span>{exp.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {exp.organization}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  {exp.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Standards:</span>
                  <span>{exp.standards.join(' · ')}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Certifications & Aside Column (4 columns) */}
        <aside
          aria-labelledby="aside-credentials-heading"
          className="lg:col-span-4 space-y-6"
        >
          <LandmarkTag
            tag="aside aria-labelledby='aside-credentials-heading'"
            className="text-purple-600 dark:text-purple-400"
          />

          {/* Certifications Card */}
          <section
            aria-labelledby="aside-credentials-heading"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs"
          >
            <h2
              id="aside-credentials-heading"
              className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Industry Certifications</span>
            </h2>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{cert.issuer}</span>
                    <time dateTime={cert.year}>{cert.year}</time>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    ID: {cert.credentialId}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Accessibility Statement Card */}
          <section
            aria-labelledby="a11y-statement-heading"
            className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-5 sm:p-6 space-y-3"
          >
            <h2
              id="a11y-statement-heading"
              className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Conformance Statement</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Elena Rostova is dedicated to ensuring equal digital access for people with disabilities. We continually review this site against WCAG 2.2 Level AAA success criteria and welcome feedback on any accessibility barriers encountered.
            </p>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-emerald-300 font-semibold underline hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
            >
              Report an Accessibility Friction Point
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};
