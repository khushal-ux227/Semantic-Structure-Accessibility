import React, { useState } from 'react';
import { Eye, SunMoon, Type, CheckCircle2, Sliders, X } from 'lucide-react';

interface A11yToolbarProps {
  isHighContrast: boolean;
  setIsHighContrast: (val: boolean | ((prev: boolean) => boolean)) => void;
  isTextSpacing: boolean;
  setIsTextSpacing: (val: boolean | ((prev: boolean) => boolean)) => void;
  isInspectSemantics: boolean;
  setIsInspectSemantics: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenAudit: () => void;
  announceMessage: (msg: string) => void;
}

export const A11yToolbar: React.FC<A11yToolbarProps> = ({
  isHighContrast,
  setIsHighContrast,
  isTextSpacing,
  setIsTextSpacing,
  isInspectSemantics,
  setIsInspectSemantics,
  onOpenAudit,
  announceMessage
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContrast = () => {
    setIsHighContrast((prev) => {
      const next = !prev;
      announceMessage(next ? 'High contrast mode enabled' : 'Default contrast restored');
      return next;
    });
  };

  const toggleSpacing = () => {
    setIsTextSpacing((prev) => {
      const next = !prev;
      announceMessage(next ? 'WCAG 1.4.12 text spacing mode enabled' : 'Default text spacing restored');
      return next;
    });
  };

  const toggleSemantics = () => {
    setIsInspectSemantics((prev) => {
      const next = !prev;
      announceMessage(next ? 'Semantic HTML5 landmark inspection overlay activated' : 'Semantic inspection overlay disabled');
      return next;
    });
  };

  return (
    <aside
      aria-label="Accessibility & Semantic Inspection Controls"
      className="fixed bottom-4 right-4 z-40"
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            announceMessage('Accessibility and inspection controls drawer opened');
          }}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-700 rounded-lg shadow-lg text-xs font-medium focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden transition-colors"
          aria-expanded="false"
          aria-haspopup="dialog"
          aria-controls="a11y-controls-panel"
        >
          <Sliders className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span>A11y &amp; Semantic Controls</span>
          {(isHighContrast || isTextSpacing || isInspectSemantics) && (
            <span
              className="w-2 h-2 rounded-full bg-emerald-400"
              title="Active accessibility overrides"
              aria-label="Active accessibility overrides enabled"
            />
          )}
        </button>
      ) : (
        <div
          id="a11y-controls-panel"
          role="region"
          aria-label="Accessibility Settings Panel"
          className="w-80 p-4 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-700 flex flex-col gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                A11y &amp; Semantic Tools
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                announceMessage('Accessibility controls panel closed');
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
              aria-label="Close accessibility controls panel"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Verify WCAG 2.2 AAA accommodations, landmark structures, and audit reports in real time.
          </p>

          <div className="flex flex-col gap-2" role="group" aria-label="Accessibility toggles">
            {/* Semantic Inspector Toggle */}
            <button
              type="button"
              onClick={toggleSemantics}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                isInspectSemantics
                  ? 'bg-emerald-950 text-emerald-200 border-emerald-500 ring-1 ring-emerald-500'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              } focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden`}
              aria-pressed={isInspectSemantics}
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-emerald-400">&lt;/&gt;</span>
                Inspect HTML5 Landmarks
              </span>
              <span className="text-[11px] font-mono">
                {isInspectSemantics ? 'ACTIVE' : 'OFF'}
              </span>
            </button>

            {/* High Contrast Mode Toggle */}
            <button
              type="button"
              onClick={toggleContrast}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                isHighContrast
                  ? 'bg-emerald-950 text-emerald-200 border-emerald-500 ring-1 ring-emerald-500'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              } focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden`}
              aria-pressed={isHighContrast}
            >
              <span className="flex items-center gap-2">
                <SunMoon className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                Enhanced Contrast (AAA)
              </span>
              <span className="text-[11px] font-mono">
                {isHighContrast ? 'ACTIVE' : 'OFF'}
              </span>
            </button>

            {/* Relaxed Spacing Toggle */}
            <button
              type="button"
              onClick={toggleSpacing}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                isTextSpacing
                  ? 'bg-emerald-950 text-emerald-200 border-emerald-500 ring-1 ring-emerald-500'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              } focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden`}
              aria-pressed={isTextSpacing}
            >
              <span className="flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                WCAG 1.4.12 Text Spacing
              </span>
              <span className="text-[11px] font-mono">
                {isTextSpacing ? 'ACTIVE' : 'OFF'}
              </span>
            </button>

            {/* Open Lighthouse & WCAG Audit Report */}
            <button
              type="button"
              onClick={() => {
                onOpenAudit();
                setIsOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                View 100/100 Lighthouse Audit
              </span>
              <span className="text-[11px] font-mono bg-emerald-700/60 px-1.5 py-0.5 rounded">
                100/100
              </span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
