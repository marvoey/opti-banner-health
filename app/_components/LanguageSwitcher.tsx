'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react';
import { LOCALES, localizePath, stripLocale, findLocale } from '@/lib/locales';

/**
 * Language switcher driven by the CMS-enabled locales (lib/locales.generated.ts).
 * Derives the current locale from the URL and links to the same page in each
 * other locale, keeping the user on their current path. Renders nothing when
 * only one locale is enabled.
 */
export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';

  if (LOCALES.length < 2) return null;

  const { localeKey, cleanPath } = stripLocale(pathname);
  const current = findLocale(localeKey) ?? LOCALES[0];

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-blue-800 hover:underline"
      >
        <Globe size={14} />
        <span>{current.displayName}</span>
        <ChevronDown size={14} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-[60] mt-1 min-w-[10rem] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {LOCALES.map((locale) => {
            const active = locale.key === current.key;
            return (
              <li key={locale.key} role="option" aria-selected={active}>
                <Link
                  href={localizePath(cleanPath, locale.key)}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-sm transition-colors hover:bg-slate-50 ${
                    active ? 'font-bold text-blue-800' : 'text-slate-600'
                  }`}
                >
                  {locale.displayName}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
