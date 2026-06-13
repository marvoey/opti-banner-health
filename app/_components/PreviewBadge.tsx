'use client';

import { useState } from 'react';
import { X, Eye } from 'lucide-react';

type PreviewBadgeProps = {
  label: string;
  /** "corner" = small top-left tag (homepage); "ribbon" = centered top banner. */
  variant?: 'corner' | 'ribbon';
  /** Tailwind bg/text/border color classes for the badge surface. */
  className?: string;
  /** Tailwind color + animation classes for the ribbon status dot. */
  dotClassName?: string;
};

/**
 * Internal-only simulation label shown on mockup pages. Includes a toggle so
 * the badge can be dismissed (and brought back via a small re-show handle).
 */
const PreviewBadge = ({
  label,
  variant = 'ribbon',
  className = 'bg-blue-600 text-white',
  dotClassName,
}: PreviewBadgeProps) => {
  const [visible, setVisible] = useState(true);

  const isRibbon = variant === 'ribbon';
  const anchor = isRibbon
    ? 'fixed top-0 left-1/2 -translate-x-1/2 z-[200]'
    : 'fixed top-4 left-4 z-[100]';

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        aria-label="Show preview badge"
        className={`${anchor} ${className} ${
          isRibbon ? 'rounded-b-[20px] border px-3 py-1.5 shadow-2xl' : 'rounded p-1.5 shadow-lg'
        } hover:opacity-90 transition-opacity`}
      >
        <Eye size={12} />
      </button>
    );
  }

  return (
    <div
      className={`${anchor} ${className} text-[10px] font-bold uppercase flex items-center ${
        isRibbon
          ? 'pl-10 pr-6 py-2 rounded-b-[20px] border tracking-[0.25em] gap-4 shadow-2xl'
          : 'pl-2 pr-1 py-1 rounded tracking-widest gap-1.5 shadow-lg'
      }`}
    >
      {isRibbon && dotClassName && <span className={`w-2 h-2 rounded-full ${dotClassName}`} />}
      <span>{label}</span>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Hide preview badge"
        className="hover:bg-black/10 rounded p-0.5 transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  );
};

export default PreviewBadge;
