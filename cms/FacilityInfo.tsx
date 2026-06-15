import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * Facility Info — a two-column section: grayscale image left, structured info
 * blocks (hours, parking) + disclaimer right. Reproduces FacilityInfo.tsx.
 */
export const FacilityInfoContentType = contentType({
  key: 'BannerDemoFacilityInfo',
  baseType: '_component',
  displayName: 'Facility Info',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    image: {
      type: 'contentReference',
      displayName: 'Image',
      allowedTypes: ['_image'],
      group: 'demo',
      isLocalized: true,
    },
    imageUrl: {
      type: 'string',
      displayName: 'Image URL',
      description: 'Optional. A full image URL — overrides the Image asset when set.',
      group: 'demo',
      isLocalized: true,
    },
    imageAlt: { type: 'string', displayName: 'Image Alt Text', group: 'demo', isLocalized: true },
    heading: { type: 'string', displayName: 'Heading', group: 'demo', isLocalized: true },
    infoOneLabel: { type: 'string', displayName: 'Info 1 — Label', group: 'demo', isLocalized: true },
    infoOnePrimary: { type: 'string', displayName: 'Info 1 — Primary', group: 'demo', isLocalized: true },
    infoOneSecondary: { type: 'string', displayName: 'Info 1 — Secondary', group: 'demo', isLocalized: true },
    infoTwoLabel: { type: 'string', displayName: 'Info 2 — Label', group: 'demo', isLocalized: true },
    infoTwoPrimary: { type: 'string', displayName: 'Info 2 — Primary', group: 'demo', isLocalized: true },
    infoTwoSecondary: { type: 'string', displayName: 'Info 2 — Secondary', group: 'demo', isLocalized: true },
    disclaimer: { type: 'string', displayName: 'Disclaimer', group: 'demo', isLocalized: true },
  },
});

type Props = { content: ContentProps<typeof FacilityInfoContentType> };

/** One label / primary / secondary info block. */
function InfoBlock({ label, primary, secondary }: { label?: string | null; primary?: string | null; secondary?: string | null }) {
  if (!label && !primary && !secondary) return null;
  return (
    <div>
      {label ? (
        <h4 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">{label}</h4>
      ) : null}
      {primary ? <p className="text-lg font-bold text-[#00205C]">{primary}</p> : null}
      {secondary ? <p className="text-slate-500 font-medium">{secondary}</p> : null}
    </div>
  );
}

export default function FacilityInfo({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const usingUrl = !!content.imageUrl;
  const imageSrc = usingUrl ? content.imageUrl : content.image ? src(content.image) : undefined;

  return (
    <section {...pa(block)} className="py-24 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 aspect-video bg-slate-100 rounded-[40px] overflow-hidden shadow-inner border border-gray-200">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...pa(usingUrl ? 'imageUrl' : 'image')}
              src={imageSrc}
              alt={content.imageAlt ?? ''}
              className="w-full h-full object-cover opacity-50 grayscale"
            />
          ) : null}
        </div>
        <div className="lg:col-span-5">
          {content.heading ? (
            <h2 {...pa('heading')} className="text-4xl font-serif font-bold text-[#00205C] mb-8">
              {content.heading}
            </h2>
          ) : null}
          <div className="space-y-8">
            <InfoBlock label={content.infoOneLabel} primary={content.infoOnePrimary} secondary={content.infoOneSecondary} />
            <InfoBlock label={content.infoTwoLabel} primary={content.infoTwoPrimary} secondary={content.infoTwoSecondary} />
            {content.disclaimer ? (
              <div className="pt-8 border-t border-gray-100">
                <p {...pa('disclaimer')} className="text-sm text-slate-400 leading-relaxed font-medium">
                  {content.disclaimer}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
