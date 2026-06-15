import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { MapPin, Phone, ChevronRight } from 'lucide-react';

/**
 * Facility Hero — navy two-column institute hero: breadcrumb + headline +
 * address + phone + CTAs on the left, a "specializations" card on the right.
 * Reproduces app/mock/locations/.../InstituteHero (no image — distinct from DetailHero).
 */
export const FacilityHeroContentType = contentType({
  key: 'BannerDemoFacilityHero',
  baseType: '_component',
  displayName: 'Banner: Facility Hero',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    breadcrumb: {
      type: 'array',
      displayName: 'Breadcrumb',
      group: 'demo',
      isLocalized: true,
      items: { type: 'string' },
    },
    headline: { type: 'string', displayName: 'Headline', group: 'demo', isLocalized: true },
    addressLine1: { type: 'string', displayName: 'Address Line 1', group: 'demo', isLocalized: true },
    addressLine2: { type: 'string', displayName: 'Address Line 2', group: 'demo', isLocalized: true },
    phone: { type: 'string', displayName: 'Phone', group: 'demo', isLocalized: true },
    primaryCta: { type: 'link', displayName: 'Primary CTA', group: 'demo', isLocalized: true },
    secondaryCta: { type: 'link', displayName: 'Secondary CTA', group: 'demo', isLocalized: true },
    specializationsTitle: { type: 'string', displayName: 'Specializations Title', group: 'demo', isLocalized: true },
    specializations: {
      type: 'array',
      displayName: 'Specializations',
      group: 'demo',
      isLocalized: true,
      items: { type: 'string' },
    },
  },
});

type Props = { content: ContentProps<typeof FacilityHeroContentType> };

export default function FacilityHero({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const crumbs = (content.breadcrumb ?? []) as string[];
  const specializations = (content.specializations ?? []) as string[];

  const primaryHref = edit ? undefined : content.primaryCta?.url?.default ?? undefined;
  const primaryLabel = content.primaryCta?.text || 'Schedule Appointment';
  const secondaryHref = edit ? undefined : content.secondaryCta?.url?.default ?? undefined;
  const secondaryLabel = content.secondaryCta?.text || 'Get Directions';

  return (
    <section {...pa(block)} className="bg-[#00205C] text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {crumbs.length ? (
          <nav className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={i === crumbs.length - 1 ? 'text-white' : ''}>{c}</span>
                {i < crumbs.length - 1 ? <ChevronRight size={10} /> : null}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h1 {...pa('headline')} className="text-5xl font-serif font-bold leading-tight mb-8">
              {content.headline}
            </h1>
            <div className="flex flex-col gap-6 mb-12">
              {content.addressLine1 || content.addressLine2 ? (
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="text-[#FFD100] mt-1 shrink-0" />
                  <div>
                    {content.addressLine1 ? (
                      <p {...pa('addressLine1')} className="text-xl font-bold">
                        {content.addressLine1}
                      </p>
                    ) : null}
                    {content.addressLine2 ? (
                      <p {...pa('addressLine2')} className="text-blue-200 font-medium">
                        {content.addressLine2}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
              {content.phone ? (
                <div className="flex items-center gap-4">
                  <Phone size={24} className="text-[#FFD100] shrink-0" />
                  <p {...pa('phone')} className="text-xl font-bold">
                    {content.phone}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-4">
              {primaryHref || primaryLabel ? (
                <a
                  {...pa('primaryCta')}
                  href={primaryHref}
                  className="bg-[#FFD100] text-[#00205C] px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl"
                >
                  {primaryLabel}
                </a>
              ) : null}
              {secondaryHref || secondaryLabel ? (
                <a
                  {...pa('secondaryCta')}
                  href={secondaryHref}
                  className="border-2 border-white/20 hover:bg-white/10 px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all"
                >
                  {secondaryLabel}
                </a>
              ) : null}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-8 border border-white/10">
            {content.specializationsTitle ? (
              <h3 {...pa('specializationsTitle')} className="text-[#FFD100] font-black uppercase tracking-widest text-xs mb-8">
                {content.specializationsTitle}
              </h3>
            ) : null}
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              {specializations.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FFD100] rounded-full shrink-0" />
                  <span className="font-bold text-sm text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
