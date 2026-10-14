import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { LandmarkTag } from '../components/LandmarkTag';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageId } from '../types/portfolio';
import { CheckCircle, Code, Layers, FileText } from 'lucide-react';

interface ProjectsPageProps {
  setCurrentPage: (page: PageId) => void;
  isInspectSemantics: boolean;
  announceMessage: (msg: string) => void;
}

const CATEGORIES = ['All', 'Web Accessibility', 'Design Systems', 'Healthcare Systems', 'Core Web Vitals'] as const;

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  setCurrentPage,
  isInspectSemantics,
  announceMessage
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCodeId, setExpandedCodeId] = useState<string | null>('gov-portal-redesign');

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleFilterClick = (cat: string) => {
    setSelectedCategory(cat);
    const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
    announceMessage(`Filtered case studies by ${cat}. Showing ${count} projects.`);
  };

  return (
    <div className="space-y-10">
      <Breadcrumbs
        currentPage="projects"
        setCurrentPage={setCurrentPage}
        pageTitle="Case Studies & Architecture"
      />

      {/* Page Heading Section */}
      <section aria-labelledby="projects-page-heading" className="space-y-4">
        <LandmarkTag
          tag="section aria-labelledby='projects-page-heading'"
          className="text-indigo-600 dark:text-indigo-400"
        />

        <div className="max-w-3xl">
          <h1
            id="projects-page-heading"
            tabIndex={-1}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white focus:outline-hidden"
          >
            WCAG 2.2 AAA Architecture Case Studies
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            In-depth documentation of complex digital transformations, zero-violation design system libraries, and high-density telemetry dashboards built to survive rigorous human and automated accessibility testing.
          </p>
        </div>

        {/* Filter Toolbar (Segmented Controls) */}
        <div
          role="toolbar"
          aria-label="Filter case studies by category"
          className="pt-2 flex flex-wrap items-center gap-2"
        >
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1" id="filter-label">
            Filter Domain:
          </span>
          <div className="inline-flex flex-wrap p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFilterClick(cat)}
                  aria-pressed={isSelected}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section
        aria-label="Case Studies Results"
        aria-live="polite"
        className="space-y-12"
      >
        <LandmarkTag
          tag="section aria-label='Case Studies Results'"
          className="text-indigo-600 dark:text-indigo-400"
        />

        {filteredProjects.map((project) => (
          <article
            key={project.id}
            aria-labelledby={`case-study-${project.id}`}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
          >
            <LandmarkTag
              tag={`article aria-labelledby='case-study-${project.id}'`}
              className="text-pink-600 dark:text-pink-400"
            />

            {/* Article Header */}
            <header className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              {/* Clean unboxed metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>Client: {project.client}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={project.year}>Completed {project.year}</time>
              </div>

              <h2
                id={`case-study-${project.id}`}
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
                {project.subtitle}
              </p>
            </header>

            {/* Executive Summary */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.summary}
            </p>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-rose-50/50 dark:bg-rose-950/20 border-l-3 border-rose-500 rounded-r-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-200 mb-2">
                  The Accessibility Challenge
                </h3>
                <p className="text-xs sm:text-sm text-rose-950 dark:text-rose-100/90 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 border-l-3 border-emerald-500 rounded-r-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200 mb-2">
                  The Semantic Engineering Solution
                </h3>
                <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100/90 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* WCAG Criteria Satisfied (Zero-Pill Compliance) */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Primary WCAG 2.2 Criteria Addressed
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                {project.wcagCriteria.map((criterion, idx) => (
                  <React.Fragment key={idx}>
                    <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 inline shrink-0" aria-hidden="true" />
                      {criterion}
                    </span>
                    {idx < project.wcagCriteria.length - 1 && (
                      <span aria-hidden="true" className="text-slate-400">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-white">
                    {m.value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Code Snippet Figure (if available) */}
            {project.codeSnippet && (
              <figure className="space-y-2 pt-2">
                <figcaption className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    <span>Implementation: {project.codeSnippet.caption}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedCodeId((prev) => (prev === project.id ? null : project.id));
                    }}
                    aria-expanded={expandedCodeId === project.id}
                    className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs"
                  >
                    {expandedCodeId === project.id ? 'Collapse Code' : 'Expand Code'}
                  </button>
                </figcaption>

                {expandedCodeId === project.id && (
                  <pre
                    tabIndex={0}
                    className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
                    aria-label={`Code snippet for ${project.title}`}
                  >
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                )}
              </figure>
            )}

            {/* Article Footer */}
            <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Verification Tech: {project.technologies.join(' · ')}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs"
              >
                <span>Request Similar Architecture Review</span>
              </button>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
};
