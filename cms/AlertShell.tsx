'use client';

import { useState } from 'react';

/**
 * Client shell for NetworkStatusAlert — owns the dismiss state so the close
 * button can actually hide the banner. The server component renders the alert
 * content (with on-page-editing `pa` attributes) as children.
 */
export function AlertShell({
  dismissible,
  className,
  children,
}: {
  dismissible: boolean;
  className: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div role="alert" className={className}>
      <div className="flex-1">{children}</div>
      {dismissible ? (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
          className="shrink-0 rounded p-1 text-current/70 transition-colors hover:text-current"
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
