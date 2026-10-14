import React from 'react';
import { PageId } from '../types/portfolio';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { LandmarkTag } from '../components/LandmarkTag';
import { ArrowRight, ShieldCheck, CheckCircle2, FileCode2, Terminal, ExternalLink } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: PageId) => void;
  isInspectSemantics: boolean;
  onOpenAudit: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  isInspectSemantics,
  onOpenAudit
}) => {
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section */}
      <section
        aria-labelledby="hero-title"
        className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs transition-colors"
      >
        <LandmarkTag
          tag="section aria-labelledby='hero-title'"
          className="text-indigo-600 dark:text-indigo-400 mb-4"
        />

        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/70 px-3 py-1.5 rounded-md border border-emerald-300 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>WCAG 2.2 AAA &amp; Section 508 Validated Architect</span>
          </div>

          <h1
            id="hero-title"
            tabIndex={-1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] focus:outline-hidden"
          >
            Engineering semantic web systems where accessibility is structural, not an afterthought.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I am <strong className="font-semibold text-slate-900 dark:text-white">{PERSONAL_INFO.name}</strong>, a {PERSONAL_INFO.role}. I build, audit, and refactor mission-critical digital interfaces to guarantee complete barrier-free parity for screen reader, keyboard, switch-access, and neurodivergent users.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:outline-hidden transition-colors"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden transition-colors"
            >
              <span>Request Accessibility Audit</span>
            </button>

            <button
              type="button"
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
              aria-label="Inspect 100/100 Lighthouse Audit Scores"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <span>Audit: 100 A11y / 100 SEO</span>
            </button>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section with Semantic <dl> */}
      <section
        aria-labelledby="metrics-title"
        className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-800"
      >
        <LandmarkTag
          tag="section aria-labelledby='metrics-title'"
          className="text-indigo-400 mb-3"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 id="metrics-title" className="text-xl font-bold text-white tracking-tight">
              Measurable Engineering Impact
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Verified outcomes across enterprise portals, health systems, and federal agencies.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800/80">
            WCAG 2.2 AAA Verified
          </span>
        </div>

        {/* Semantic Definition List */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <dt className="text-xs font-medium text-slate-400 order-2">
                {stat.label}
              </dt>
              <dd className="text-3xl sm:text-4xl font-extrabold text-white font-mono order-1">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Main Grid: Featured Case Studies + Colophon Aside */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Featured Case Studies (8 columns) */}
        <section
          aria-labelledby="featured-projects-title"
          className="lg:col-span-8 space-y-8"
        >
          <LandmarkTag
            tag="section aria-labelledby='featured-projects-title'"
            className="text-indigo-600 dark:text-indigo-400"
          />

          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2
                id="featured-projects-title"
                className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                Featured WCAG 2.2 Case Studies
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-world accessibility transformations with zero-compromise UX.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs"
            >
              <span>View all 4 projects</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                aria-labelledby={`project-${project.id}-title`}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 rounded-xl p-6 sm:p-7 shadow-xs transition-all"
              >
                <LandmarkTag
                  tag={`article aria-labelledby='project-${project.id}-title'`}
                  className="text-pink-600 dark:text-pink-400 mb-3"
                />

                {/* Clean unboxed metadata with typographic separators (Anti-Slop Rule) */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.client}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={project.year}>{project.year}</time>
                </div>

                <h3
                  id={`project-${project.id}-title`}
                  className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                >
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                  {project.summary}
                </p>

                {/* Accessible Metrics Summary */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-left">
                      <span className="block text-base font-bold text-slate-900 dark:text-white font-mono">
                        {metric.value}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span>Stack:</span>
                    <span>{project.technologies.slice(0, 3).join(' · ')}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs"
                    aria-label={`Read full case study for ${project.title}`}
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Semantic <aside> Column (4 columns) */}
        <aside
          aria-labelledby="aside-principles-title"
          className="lg:col-span-4 space-y-6"
        >
          <LandmarkTag
            tag="aside aria-labelledby='aside-principles-title'"
            className="text-purple-600 dark:text-purple-400"
          />

          {/* Architecture Principles Card */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2
              id="aside-principles-title"
              className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2"
            >
              <FileCode2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>The Semantic First Manifesto</span>
            </h2>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 list-none p-0 m-0" role="list">
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">01.</span>
                <span>
                  <strong className="text-slate-900 dark:text-white font-medium">Native tags over ARIA:</strong> Never use a custom <code className="font-mono">&lt;div&gt;</code> when <code className="font-mono">&lt;button&gt;</code> or <code className="font-mono">&lt;details&gt;</code> exists.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">02.</span>
                <span>
                  <strong className="text-slate-900 dark:text-white font-medium">Keyboard parity:</strong> Every interactive feature must be 100% operable with <kbd className="font-mono px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px]">Tab</kbd>, <kbd className="font-mono px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px]">Enter</kbd>, and <kbd className="font-mono px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px]">Esc</kbd>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">03.</span>
                <span>
                  <strong className="text-slate-900 dark:text-white font-medium">Contrast math:</strong> WCAG AAA requires 7:1 for normal text and 4.5:1 for large text. No unreadable gray-on-gray.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">04.</span>
                <span>
                  <strong className="text-slate-900 dark:text-white font-medium">Predictable navigation:</strong> Strict heading hierarchy with exactly one H1 per page and zero skipped heading levels.
                </span>
              </li>
            </ul>
          </div>

          {/* Assistive Hardware & Test Bench */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>A11y Test Rig</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Elena tests all production releases on native assistive hardware:
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Freedom Scientific Focus 40 Braille Display</li>
              <li>NVDA 2026 + Firefox on Windows 11</li>
              <li>JAWS 2026 on Chromium</li>
              <li>VoiceOver on macOS Sonoma &amp; iOS 19</li>
              <li>Ablenet Dual-Switch Access System</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
