import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { MapPin } from 'lucide-react';

/**
 * Location Search Hero — the navy "Urgent Care Near You" hero with a (decorative)
 * location input + CTA. Reproduces app/mock/locations UrgentCareSearch as an
 * editable element block. Distinct from ServicesHero (the light A-Z search hero).
 */
export const LocationSearchHeroContentType = contentType({
  key: 'BannerDemoLocationSearchHero',
  baseType: '_component',
  displayName: 'Banner: Location Search Hero',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    headline: { type: 'string', displayName: 'Headline', group: 'demo', isLocalized: true },
    searchPlaceholder: { type: 'string', displayName: 'Search Placeholder', group: 'demo', isLocalized: true },
    ctaLabel: { type: 'string', displayName: 'CTA Label', group: 'demo', isLocalized: true },
  },
});

type Props = { content: ContentProps<typeof LocationSearchHeroContentType> };

export default function LocationSearchHero({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const placeholder = content.searchPlaceholder || 'Phoenix, AZ';

  return (
    <section {...pa(block)} className="bg-[#00205C] text-white py-12">
      <div className="container mx-auto px-4">
        <h1 {...pa('headline')} className="text-4xl font-serif font-bold mb-8">
          {content.headline}
        </h1>
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
          {/* Decorative location input (presentational only). */}
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder={placeholder}
              readOnly
              className="w-full bg-white text-slate-900 px-6 py-4 rounded-xl font-medium focus:ring-4 focus:ring-yellow-400 outline-none"
            />
            <MapPin size={20} className="absolute right-4 top-4 text-blue-600" />
          </div>
          <button className="bg-[#FFD100] text-[#00205C] px-10 py-4 rounded-xl font-bold uppercase hover:bg-yellow-400 transition-colors">
            {content.ctaLabel || 'Update Location'}
          </button>
        </div>
      </div>
    </section>
  );
}
