import React from 'react';
import { PageId } from '../types/portfolio';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  pageTitle: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  setCurrentPage,
  pageTitle
}) => {
  if (currentPage === 'home') return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 list-none p-0 m-0" role="list">
        <li>
          <button
            type="button"
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-xs"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </button>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </li>
        <li>
          <span
            aria-current="page"
            className="font-semibold text-slate-800 dark:text-slate-200"
          >
            {pageTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
};
