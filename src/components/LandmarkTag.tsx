import React from 'react';

interface LandmarkTagProps {
  tag: string;
  role?: string;
  ariaLabel?: string;
  className?: string;
}

export const LandmarkTag: React.FC<LandmarkTagProps> = ({
  tag,
  role,
  ariaLabel,
  className = ''
}) => {
  return (
    <div
      className={`semantic-inspector-badge hidden items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono font-medium rounded border border-current shadow-xs opacity-90 transition-opacity ${className}`}
      aria-hidden="true"
    >
      <span className="font-bold">&lt;{tag}&gt;</span>
      {role && <span className="opacity-75">role="{role}"</span>}
      {ariaLabel && <span className="opacity-75">aria-label="{ariaLabel}"</span>}
    </div>
  );
};
