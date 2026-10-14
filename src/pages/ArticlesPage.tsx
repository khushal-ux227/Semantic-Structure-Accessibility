import React, { useState } from 'react';
import { ARTICLES } from '../data/portfolioData';
import { LandmarkTag } from '../components/LandmarkTag';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageId } from '../types/portfolio';
import { BookOpen, Calendar, Clock, Code, ArrowRight } from 'lucide-react';

interface ArticlesPageProps {
  setCurrentPage: (page: PageId) => void;
  isInspectSemantics: boolean;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  setCurrentPage,
  isInspectSemantics
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(ARTICLES[0].id);

  const activeArticle = ARTICLES.find((a) => a.id === selectedArticleId) || ARTICLES[0];

  return (
    <div className="space-y-12">
      <Breadcrumbs
        currentPage="articles"
        setCurrentPage={setCurrentPage}
        pageTitle="Standards & Technical Writing"
      />

      {/* Header section */}
      <section aria-labelledby="articles-heading" className="space-y-3">
        <LandmarkTag
          tag="section aria-labelledby='articles-heading'"
          className="text-indigo-600 dark:text-indigo-400"
        />

        <div className="max-w-3xl">
          <h1
            id="articles-heading"
            tabIndex={-1}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white focus:outline-hidden"
          >
            Technical Standards &amp; Architecture Notes
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Practical guidelines on semantic HTML5 implementation, screen reader heuristics, and avoiding ARIA over-engineering in modern web development.
          </p>
        </div>
      </section>

      {/* Two-column layout: Article index nav & active article reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Article Navigation List (4 cols) */}
        <aside
          aria-labelledby="article-index-heading"
          className="lg:col-span-4 space-y-4"
        >
          <LandmarkTag
            tag="aside aria-labelledby='article-index-heading'"
            className="text-purple-600 dark:text-purple-400"
          />

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
            <h2
              id="article-index-heading"
              className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Published Monographs</span>
            </h2>

            <nav aria-label="Monographs and Technical Guides">
              <ul className="space-y-2 list-none p-0 m-0" role="list">
                {ARTICLES.map((art) => {
                  const isCurrent = art.id === selectedArticleId;
                  return (
                    <li key={art.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedArticleId(art.id)}
                        aria-current={isCurrent ? 'true' : undefined}
                        className={`w-full text-left p-3 rounded-lg text-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden flex flex-col gap-1 ${
                          isCurrent
                            ? 'bg-slate-100 dark:bg-slate-800 border-l-4 border-emerald-600 dark:border-emerald-400 text-slate-900 dark:text-white font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="line-clamp-2">{art.title}</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-normal">
                          <time dateTime={art.isoDate}>{art.publishDate}</time>
                          <span aria-hidden="true">·</span>
                          <span>{art.readTime}</span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Selected Article Reading View (8 cols) */}
        <article
          aria-labelledby={`article-title-${activeArticle.id}`}
          className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8"
        >
          <LandmarkTag
            tag={`article aria-labelledby='article-title-${activeArticle.id}'`}
            className="text-pink-600 dark:text-pink-400"
          />

          <header className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <time dateTime={activeArticle.isoDate}>{activeArticle.publishDate}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{activeArticle.readTime}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Author: Elena Rostova</span>
            </div>

            <h2
              id={`article-title-${activeArticle.id}`}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug"
            >
              {activeArticle.title}
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
              {activeArticle.summary}
            </p>

            {/* Clean tag list (unboxed, Anti-Slop rule) */}
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Topics:</span>
              <span>{activeArticle.tags.join(' / ')}</span>
            </div>
          </header>

          {/* Article Sections */}
          <div className="space-y-8">
            {activeArticle.contentSections.map((sec, idx) => (
              <section key={idx} aria-labelledby={`sec-head-${idx}`} className="space-y-4">
                <h3
                  id={`sec-head-${idx}`}
                  className="text-xl font-bold text-slate-900 dark:text-white tracking-tight"
                >
                  {sec.heading}
                </h3>

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.codeBlock && (
                  <figure className="space-y-2 pt-2">
                    <figcaption className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                      <span>{sec.codeBlock.caption}</span>
                    </figcaption>
                    <pre
                      tabIndex={0}
                      className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
                      aria-label={sec.codeBlock.caption}
                    >
                      <code>{sec.codeBlock.code}</code>
                    </pre>
                  </figure>
                )}
              </section>
            ))}
          </div>

          {/* Article Footer */}
          <footer className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Cite as: Rostova, E. (2026). "{activeArticle.title}". Accessible Systems Press.</span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs"
            >
              <span>Discuss Article With Elena</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
};
