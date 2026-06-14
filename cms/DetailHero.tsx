import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Heart, ChevronRight } from 'lucide-react';

/**
 * Detail Hero — a reusable two-column specialty/detail-page hero: breadcrumb,
 * headline + description + CTA on the left, a framed image with an overlay
 * "badge" card on the right. Reproduces app/mock/services/heart HeartHero, but
 * generic (not heart-specific).
 */
export const DetailHeroContentType = contentType({
  key: 'BannerDemoDetailHero',
  baseType: '_component',
  displayName: 'Detail Hero',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    breadcrumbParent: { type: 'string', displayName: 'Breadcrumb Parent', group: 'demo' },
    breadcrumbCurrent: { type: 'string', displayName: 'Breadcrumb Current', group: 'demo' },
    headline: { type: 'string', displayName: 'Headline', group: 'demo' },
    description: { type: 'string', displayName: 'Description', group: 'demo' },
    cta: { type: 'link', displayName: 'CTA', group: 'demo' },
    image: {
      type: 'contentReference',
      displayName: 'Image',
      allowedTypes: ['_image'],
      group: 'demo',
    },
    imageUrl: {
      type: 'string',
      displayName: 'Image URL',
      description: 'Optional. A full image URL — overrides the Image asset when set.',
      group: 'demo',
    },
    imageAlt: { type: 'string', displayName: 'Image Alt Text', group: 'demo' },
    badgeTitle: { type: 'string', displayName: 'Badge Title', group: 'demo' },
    badgeText: { type: 'string', displayName: 'Badge Text', group: 'demo' },
  },
});

type Props = { content: ContentProps<typeof DetailHeroContentType> };

export default function DetailHero({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const href = edit ? undefined : content.cta?.url?.default ?? undefined;
  const label = content.cta?.text || content.cta?.title;

  // Image priority: `imageUrl` string overrides the DAM `image` asset (see cms/Hero.tsx).
  const usingUrl = !!content.imageUrl;
  const imageSrc = usingUrl ? content.imageUrl : content.image ? src(content.image) : undefined;

  return (
    <section {...pa(block)} className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          {content.breadcrumbParent ? (
            <span {...pa('breadcrumbParent')} className="hover:text-[#00205C]">
              {content.breadcrumbParent}
            </span>
          ) : null}
          {content.breadcrumbParent && content.breadcrumbCurrent ? <ChevronRight size={10} /> : null}
          {content.breadcrumbCurrent ? (
            <span {...pa('breadcrumbCurrent')} className="text-[#00205C]">
              {content.breadcrumbCurrent}
            </span>
          ) : null}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1
              {...pa('headline')}
              className="text-5xl lg:text-6xl font-serif font-bold text-[#00205C] leading-tight mb-8"
            >
              {content.headline}
            </h1>
            <p
              {...pa('description')}
              className="text-xl text-[#4A4A4A] leading-relaxed mb-10 font-medium max-w-xl"
            >
              {content.description}
            </p>
            {href || label ? (
              <div className="flex gap-4">
                <a
                  {...pa('cta')}
                  href={href}
                  className="px-10 py-5 bg-[#FFD100] text-[#00205C] font-bold rounded-full text-base hover:shadow-xl transition-all"
                >
                  {label || 'Learn more'}
                </a>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...pa(usingUrl ? 'imageUrl' : 'image')}
                  src={imageSrc}
                  alt={content.imageAlt ?? ''}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            {content.badgeTitle || content.badgeText ? (
              <div className="absolute -bottom-8 -left-8 bg-[#00205C] text-white p-8 rounded-2xl shadow-2xl max-w-xs">
                <Heart size={32} className="text-[#FFD100] mb-4" />
                {content.badgeTitle ? (
                  <h3 {...pa('badgeTitle')} className="text-xl font-bold mb-2 tracking-tight">
                    {content.badgeTitle}
                  </h3>
                ) : null}
                {content.badgeText ? (
                  <p {...pa('badgeText')} className="text-sm text-blue-100/70 font-medium lowercase">
                    {content.badgeText}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
