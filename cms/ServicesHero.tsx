import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Search } from 'lucide-react';

/**
 * Services Hero — the light "Conditions & Services" heading + description + a
 * (decorative) search box that opens the /services directory. Reproduces
 * app/services/_components/ServicesHero.tsx as an editable element block.
 */
export const ServicesHeroContentType = contentType({
  key: 'BannerDemoServicesHero',
  baseType: '_component',
  displayName: 'Services Hero',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    headline: { type: 'string', displayName: 'Headline', group: 'demo', isLocalized: true },
    description: { type: 'string', displayName: 'Description', group: 'demo', isLocalized: true },
    searchPlaceholder: { type: 'string', displayName: 'Search Placeholder', group: 'demo', isLocalized: true },
  },
});

type Props = { content: ContentProps<typeof ServicesHeroContentType> };

export default function ServicesHero({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  // Grid elements aren't wrapped by OptimizelyGridSection, so mark our own
  // editable block boundary from the composition node (no-op outside the grid).
  const block = (content as { __composition?: { key: string } }).__composition;
  const placeholder =
    content.searchPlaceholder || 'Search for a service or condition (e.g. Cardiology)';

  return (
    <section {...pa(block)} className="bg-slate-50 py-20 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1
            {...pa('headline')}
            className="text-5xl lg:text-6xl font-serif font-bold text-[#00205C] leading-tight mb-8"
          >
            {content.headline}
          </h1>
          <p
            {...pa('description')}
            className="text-xl text-[#4A4A4A] leading-relaxed mb-12 font-medium"
          >
            {content.description}
          </p>

          {/* Decorative search box (presentational only — no handler). */}
          <div className="relative max-w-xl group">
            <input
              type="text"
              placeholder={placeholder}
              readOnly
              className="w-full bg-white border-2 border-gray-200 rounded-2xl py-5 pl-14 pr-6 text-lg font-medium shadow-sm group-hover:border-[#FFD100] transition-all outline-none"
            />
            <Search
              size={24}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#00205C] transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 px-3 py-1 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              A-Z Index
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
