import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * Stage 1 — "Template Power". The reusable Hero block the demo opens on: a
 * single, brand-enforcing component editors drop onto a page instead of
 * hard-coding a banner. Mixes the core property types — string, link (CTA),
 * and a DAM asset reference (contentReference → _image).
 */
export const HeroContentType = contentType({
  key: 'BannerDemoHero',
  baseType: '_component',
  displayName: 'Hero Banner',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    kicker: { type: 'string', displayName: 'Kicker', group: 'demo' },
    headline: { type: 'string', displayName: 'Headline', group: 'demo' },
    description: { type: 'string', displayName: 'Description', group: 'demo' },
    primaryCta: { type: 'link', displayName: 'Primary CTA', group: 'demo' },
    secondaryCta: { type: 'link', displayName: 'Secondary CTA', group: 'demo' },
    image: {
      type: 'contentReference',
      displayName: 'Background Image',
      allowedTypes: ['_image'],
      group: 'demo',
    },
    imageUrl: {
      type: 'string',
      displayName: 'Background Image URL',
      description: 'Optional. A full image URL — overrides the Background Image asset when set.',
      group: 'demo',
    },
    imageAlt: { type: 'string', displayName: 'Image Alt Text', group: 'demo' },
  },
});

type Props = { content: ContentProps<typeof HeroContentType> };

export default function Hero({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  // Grid elements aren't wrapped by OptimizelyGridSection, so mark our own
  // editable block boundary from the composition node (no-op outside the grid).
  const block = (content as { __composition?: { key: string } }).__composition;

  // In edit/VB mode, suppress href/target so clicking a CTA to edit it doesn't
  // navigate away (no-op on the published site, where __context.edit is false).
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const primaryHref = edit ? undefined : content.primaryCta?.url?.default ?? undefined;
  const primaryLabel = content.primaryCta?.text || content.primaryCta?.title;
  const secondaryHref = edit ? undefined : content.secondaryCta?.url?.default ?? undefined;
  const secondaryLabel = content.secondaryCta?.text || content.secondaryCta?.title;

  // Background image priority: the `imageUrl` string overrides the DAM `image`
  // asset; if neither is set the section falls back to the bare gradient.
  const usingUrl = !!content.imageUrl;
  const imageSrc = usingUrl ? content.imageUrl : content.image ? src(content.image) : undefined;

  return (
    <section
      {...pa(block)}
      className="relative w-full h-[600px] overflow-hidden bg-slate-900"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 opacity-80 transition-transform duration-700 hover:scale-105">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            {...pa(usingUrl ? 'imageUrl' : 'image')}
            src={imageSrc}
            alt={content.imageAlt ?? ''}
            className="w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          {content.kicker ? (
            <span
              {...pa('kicker')}
              className="inline-block px-3 py-1 bg-yellow-500 text-blue-950 font-bold text-xs uppercase tracking-widest rounded mb-4"
            >
              {content.kicker}
            </span>
          ) : null}
          <h1
            {...pa('headline')}
            className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6"
          >
            {content.headline}
          </h1>
          <p
            {...pa('description')}
            className="text-xl text-slate-100 mb-8 leading-relaxed max-w-xl"
          >
            {content.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {primaryHref || primaryLabel ? (
              <a
                {...pa('primaryCta')}
                href={primaryHref}
                target={edit ? undefined : content.primaryCta?.target ?? undefined}
                className="px-8 py-4 bg-yellow-500 text-blue-950 font-bold rounded-full text-lg hover:bg-yellow-400 transform transition-all hover:scale-105 shadow-lg active:scale-95"
              >
                {primaryLabel || 'Learn more'}
              </a>
            ) : null}
            {secondaryHref || secondaryLabel ? (
              <a
                {...pa('secondaryCta')}
                href={secondaryHref}
                target={edit ? undefined : content.secondaryCta?.target ?? undefined}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-blue-950 transition-all"
              >
                {secondaryLabel || 'Learn more'}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
