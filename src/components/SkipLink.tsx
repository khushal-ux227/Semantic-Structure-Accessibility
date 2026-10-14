import React from 'react';

export const SkipLink: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainElement = document.getElementById('main-content');
    if (mainElement) {
      mainElement.setAttribute('tabindex', '-1');
      mainElement.focus();
      mainElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-slate-900 focus:text-white focus:text-sm focus:font-medium focus:rounded-md focus:shadow-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden focus:border focus:border-slate-700"
    >
      Skip to main content (Press Enter)
    </a>
  );
};
