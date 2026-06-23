import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { authoringMetadata } from './authoringMetadata';

/**
 * Dynamic Hero — the primary visual element on a page (homepage / campaign /
 * landing). Establishes page intent, audience relevance, and the primary action.
 * Properties per demo-notes/052a. Image and video each come as a CMS media
 * reference plus a `Url` string override (the override wins when set).
 */
export const DynamicHeroContentType = contentType({
  key: 'DynamicHeroBlock',
  baseType: '_component',
  displayName: 'Dynamic Hero (v1)',
  description: 'High-impact hero with kicker, title, subtitle, media background and up to two CTAs.',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    SuperHeader: {
      type: 'string',
      displayName: 'Super Header',
      description: 'Small kicker above the headline. generate · brand_guidelines · ≤40 chars.',
      maxLength: 40,
      isLocalized: true,
      sortOrder: 10,
    },
    MainTitle: {
      type: 'string',
      displayName: 'Main Title',
      description: 'H1 hero title. generate · brand_guidelines · ≤72 chars · required.',
      maxLength: 72,
      isRequired: true,
      isLocalized: true,
      sortOrder: 20,
    },
    SubTitle: {
      type: 'string',
      displayName: 'Sub Title',
      description: 'Supporting message. generate · brand_guidelines · ≤180 chars.',
      maxLength: 180,
      isLocalized: true,
      sortOrder: 30,
    },
    HeroImage: {
      type: 'contentReference',
      displayName: 'Hero Image',
      description: 'Background image asset. suggest · approved_content_only.',
      allowedTypes: ['_image'],
      isLocalized: true,
      sortOrder: 40,
    },
    HeroImageUrl: {
      type: 'url',
      displayName: 'Hero Image URL',
      description: 'Optional. Full image URL — overrides the Hero Image asset when set.',
      isLocalized: true,
      sortOrder: 50,
    },
    HeroVideo: {
      type: 'contentReference',
      displayName: 'Hero Video',
      description: 'Optional MP4 background loop asset. suggest · approved_content_only.',
      allowedTypes: ['_video'],
      isLocalized: true,
      sortOrder: 60,
    },
    HeroVideoUrl: {
      type: 'url',
      displayName: 'Hero Video URL',
      description: 'Optional. Full video URL — overrides the Hero Video asset when set.',
      isLocalized: true,
      sortOrder: 70,
    },
    PrimaryCTA: {
      type: 'link',
      displayName: 'Primary CTA',
      description: 'Core action button. suggest · approved_content_only · required.',
      isRequired: true,
      isLocalized: true,
      sortOrder: 80,
    },
    SecondaryCTA: {
      type: 'link',
      displayName: 'Secondary CTA',
      description: 'Alternate action button. suggest · approved_content_only.',
      isLocalized: true,
      sortOrder: 90,
    },
    ContrastMode: {
      type: 'boolean',
      displayName: 'Contrast Mode',
      description: 'High-contrast accessible layout. select · accessibility_rule. Default: off.',
      isLocalized: true,
      sortOrder: 100,
    },
    ...authoringMetadata({
      purpose: 'page_introduction',
      intents: ['educate', 'convert', 'announce', 'route'],
      pageTypes: ['landing', 'campaign', 'workspace', 'search'],
      audiences: ['member', 'employer', 'provider', 'broker', 'medicare'],
      position: 'first_content',
      priority: 'high',
      governance: ['accessibility_review', 'brand_review'],
    }),
  },
});

type Props = { content: ContentProps<typeof DynamicHeroContentType> };

export default function DynamicHero({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;

  // Media precedence: the `Url` override wins, else resolve the DAM reference.
  const imgUrl = content.HeroImageUrl?.default ?? undefined;
  const usingImgUrl = !!imgUrl;
  const imageSrc = usingImgUrl
    ? imgUrl
    : content.HeroImage
      ? src(content.HeroImage)
      : undefined;
  const vidUrl = content.HeroVideoUrl?.default ?? undefined;
  const usingVidUrl = !!vidUrl;
  const videoSrc = usingVidUrl
    ? vidUrl
    : content.HeroVideo
      ? src(content.HeroVideo)
      : undefined;

  const contrast = content.ContrastMode === true;
  const primaryHref = edit ? undefined : content.PrimaryCTA?.url?.default ?? undefined;
  const primaryLabel = content.PrimaryCTA?.text || content.PrimaryCTA?.title || 'Learn more';
  const secondaryHref = edit ? undefined : content.SecondaryCTA?.url?.default ?? undefined;
  const secondaryLabel = content.SecondaryCTA?.text || content.SecondaryCTA?.title;

  return (
    <section
      {...pa(block)}
      className={`relative w-full overflow-hidden ${contrast ? 'bg-stone-200 text-stone-900' : 'bg-blue-950 text-white'}`}
    >
      {/* Media background (image or looping video) */}
      {!contrast && (
        <div className="absolute inset-0 opacity-80">
          {videoSrc ? (
            <video
              {...pa(usingVidUrl ? 'HeroVideoUrl' : 'HeroVideo')}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...pa(usingImgUrl ? 'HeroImageUrl' : 'HeroImage')}
              src={imageSrc}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-900/50 to-transparent" />
        </div>
      )}

      <div className="relative mx-auto flex min-h-[480px] max-w-6xl items-center px-6 py-16">
        <div className="max-w-2xl">
          {content.SuperHeader ? (
            <span
              {...pa('SuperHeader')}
              className={`mb-4 inline-block rounded px-3 py-1 text-xs font-bold uppercase tracking-widest ${contrast ? 'bg-blue-800 text-white' : 'bg-blue-400 text-blue-950'}`}
            >
              {content.SuperHeader}
            </span>
          ) : null}
          <h1 {...pa('MainTitle')} className="text-4xl font-bold leading-tight md:text-5xl">
            {content.MainTitle}
          </h1>
          {content.SubTitle ? (
            <p
              {...pa('SubTitle')}
              className={`mt-5 max-w-xl text-lg leading-relaxed ${contrast ? 'text-stone-700' : 'text-slate-100'}`}
            >
              {content.SubTitle}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryHref || primaryLabel ? (
              <a
                {...pa('PrimaryCTA')}
                href={primaryHref}
                target={edit ? undefined : content.PrimaryCTA?.target ?? undefined}
                className="rounded-full bg-blue-600 px-7 py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-500"
              >
                {primaryLabel}
              </a>
            ) : null}
            {secondaryHref || secondaryLabel ? (
              <a
                {...pa('SecondaryCTA')}
                href={secondaryHref}
                target={edit ? undefined : content.SecondaryCTA?.target ?? undefined}
                className={`rounded-full border-2 px-7 py-3.5 text-lg font-bold transition-all ${contrast ? 'border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white' : 'border-white text-white hover:bg-white hover:text-blue-950'}`}
              >
                {secondaryLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
