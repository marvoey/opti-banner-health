import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Phone } from 'lucide-react';
import { expandReferences, previewContextOf } from './expandRefs';

const DEFAULT_MAP_IMAGE = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1';

/**
 * Location — a reusable urgent-care location card (name, address, wait, status,
 * schedule link, phone). A library block referenced by Location Results, rendered
 * by its parent; also registered so it renders if dropped directly.
 */
export const LocationContentType = contentType({
  key: 'BannerDemoLocation',
  baseType: '_component',
  displayName: 'Banner: Location',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    name: { type: 'string', displayName: 'Name', group: 'demo', isLocalized: true },
    address: { type: 'string', displayName: 'Address', group: 'demo', isLocalized: true },
    wait: { type: 'string', displayName: 'Wait Time', group: 'demo', isLocalized: true },
    status: { type: 'string', displayName: 'Status', group: 'demo', isLocalized: true },
    scheduleLink: { type: 'link', displayName: 'Schedule Link', group: 'demo', isLocalized: true },
    phone: { type: 'string', displayName: 'Phone', group: 'demo', isLocalized: true },
  },
});

/**
 * Location Results — the split list+map section: a list of referenced Location
 * cards on the left, a static map placeholder on the right.
 */
export const LocationResultsContentType = contentType({
  key: 'BannerDemoLocationResults',
  baseType: '_component',
  displayName: 'Banner: Location Results',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    locations: {
      type: 'array',
      displayName: 'Locations',
      group: 'demo',
      isLocalized: true,
      items: { type: 'contentReference', allowedTypes: [LocationContentType] },
    },
    sortLabel: { type: 'string', displayName: 'Sort Label', group: 'demo', isLocalized: true },
    mapImageUrl: {
      type: 'string',
      displayName: 'Map Image URL',
      description: 'Background image for the static map placeholder.',
      group: 'demo',
      isLocalized: true,
    },
    mapLoadingLabel: { type: 'string', displayName: 'Map Loading Label', group: 'demo', isLocalized: true },
  },
});

type LocationContent = ContentProps<typeof LocationContentType>;
type CardProps = { content: LocationContent };
type Props = { content: ContentProps<typeof LocationResultsContentType> };

/** A single Location card. Registered as `BannerDemoLocation`. */
export function Location({ content }: CardProps) {
  const { pa } = getPreviewUtils(content);
  // No-op when rendered from an expanded reference (no composition node).
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const href = edit ? undefined : content.scheduleLink?.url?.default ?? undefined;
  const label = content.scheduleLink?.text || 'Schedule Online';
  const Root = (edit ? 'div' : 'a') as 'a';

  return (
    <Root
      {...pa(block)}
      href={href}
      className="group relative block overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:border-[#FFD100]"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="max-w-[70%]">
          <h3 {...pa('name')} className="mb-2 text-xl font-bold text-[#00205C]">
            {content.name}
          </h3>
          <p {...pa('address')} className="text-sm font-medium italic leading-relaxed text-slate-500">
            {content.address}
          </p>
        </div>
        <div className="text-right">
          {content.wait ? (
            <div className="mb-2 rounded-2xl border border-green-100 bg-green-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-green-700">
              {content.wait} Wait
            </div>
          ) : null}
          {content.status ? (
            <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
              {content.status}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-4 border-t border-slate-50 pt-6">
        <span className="flex-grow rounded-full bg-[#00205C] py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors group-hover:bg-blue-800">
          {label}
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-100 transition-colors group-hover:bg-slate-50">
          <Phone size={18} className="text-[#00205C]" />
        </span>
      </div>
    </Root>
  );
}

export default async function LocationResults({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;

  const locations = await expandReferences<LocationContent>(
    content.locations as unknown as { key?: string | null }[],
    previewContextOf(content),
  );
  const mapImage = content.mapImageUrl || DEFAULT_MAP_IMAGE;

  return (
    <main {...pa(block)} className="container mx-auto grid grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-12">
      {/* Location list */}
      <div className="space-y-6 lg:col-span-5">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {locations.length} Locations Found
          </span>
          <span className="text-xs font-bold uppercase text-[#00205C]">
            {content.sortLabel || 'Sort by Distance'}
          </span>
        </div>
        <div {...pa('locations')} className="space-y-6">
          {locations.map((loc, i) => (
            <Location key={i} content={loc} />
          ))}
        </div>
      </div>

      {/* Static map placeholder */}
      <div className="relative h-[600px] overflow-hidden rounded-[40px] border border-slate-300 bg-slate-200 shadow-inner lg:col-span-7 lg:h-auto">
        <div className="absolute inset-0 opacity-40 grayscale">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mapImage} className="h-full w-full object-cover" alt="Map View" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-4 rounded-full border border-white bg-white/80 px-10 py-6 shadow-xl backdrop-blur-md">
            <div className="h-4 w-4 animate-ping rounded-full bg-blue-600" />
            <span className="text-sm font-black uppercase tracking-widest text-[#00205C]">
              {content.mapLoadingLabel || 'Real-Time Map Data Loading...'}
            </span>
          </div>
        </div>
        <div className="absolute top-1/3 left-1/2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#FFD100] shadow-lg">
          <div className="h-2 w-2 rounded-full bg-[#00205C]" />
        </div>
        <div className="absolute top-1/2 left-1/4 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#00205C] shadow-lg">
          <div className="h-2 w-2 rounded-full bg-[#FFD100]" />
        </div>
      </div>
    </main>
  );
}
