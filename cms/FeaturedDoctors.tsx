import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Star, ChevronRight } from 'lucide-react';
import { expandReferences, previewContextOf } from './expandRefs';

/**
 * Doctor — a reusable specialist card (name, specialty, rating, reviews, image,
 * profile/book links). A library block referenced by Featured Doctors, rendered
 * by its parent; also registered so it renders if dropped directly.
 */
export const DoctorContentType = contentType({
  key: 'BannerDemoDoctor',
  baseType: '_component',
  displayName: 'Banner: Doctor',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    name: { type: 'string', displayName: 'Name', group: 'demo', isLocalized: true },
    specialty: { type: 'string', displayName: 'Specialty', group: 'demo', isLocalized: true },
    rating: { type: 'string', displayName: 'Rating', group: 'demo', isLocalized: true },
    reviews: { type: 'string', displayName: 'Reviews', group: 'demo', isLocalized: true },
    description: { type: 'string', displayName: 'Description', group: 'demo', isLocalized: true },
    image: {
      type: 'contentReference',
      displayName: 'Photo',
      allowedTypes: ['_image'],
      group: 'demo',
      isLocalized: true,
    },
    imageUrl: {
      type: 'string',
      displayName: 'Photo URL',
      description: 'Optional. A full image URL — overrides the Photo asset when set.',
      group: 'demo',
      isLocalized: true,
    },
    imageAlt: { type: 'string', displayName: 'Photo Alt Text', group: 'demo', isLocalized: true },
    profileLink: { type: 'link', displayName: 'Profile Link', group: 'demo', isLocalized: true },
    bookLink: { type: 'link', displayName: 'Book Link', group: 'demo', isLocalized: true },
  },
});

/**
 * Featured Doctors — heading + "view directory" link over a 2-column grid of
 * referenced Doctor cards. Reproduces FeaturedDoctors.tsx.
 */
export const FeaturedDoctorsContentType = contentType({
  key: 'BannerDemoFeaturedDoctors',
  baseType: '_component',
  displayName: 'Banner: Featured Doctors',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    heading: { type: 'string', displayName: 'Heading', group: 'demo', isLocalized: true },
    directoryLabel: { type: 'string', displayName: 'Directory Label', group: 'demo', isLocalized: true },
    directoryLink: { type: 'link', displayName: 'Directory Link', group: 'demo', isLocalized: true },
    doctors: {
      type: 'array',
      displayName: 'Doctors',
      group: 'demo',
      isLocalized: true,
      items: { type: 'contentReference', allowedTypes: [DoctorContentType] },
    },
  },
});

type DoctorContent = ContentProps<typeof DoctorContentType>;
type CardProps = { content: DoctorContent };
type Props = { content: ContentProps<typeof FeaturedDoctorsContentType> };

/** A single Doctor card. Registered as `BannerDemoDoctor`. */
export function Doctor({ content }: CardProps) {
  const { pa, src } = getPreviewUtils(content);
  const usingUrl = !!content.imageUrl;
  const imageSrc = usingUrl ? content.imageUrl : content.image ? src(content.image) : undefined;
  const description =
    content.description ||
    (content.specialty ? `Expert care specializing in ${content.specialty.toLowerCase()}.` : '');
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const profileHref = edit ? undefined : content.profileLink?.url?.default ?? undefined;
  const bookHref = edit ? undefined : content.bookLink?.url?.default ?? undefined;
  const block = (content as { __composition?: { key: string } }).__composition;

  return (
    <div {...pa(block)} className="group flex gap-8 rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-2xl">
      <div className="h-32 w-32 shrink-0 overflow-hidden rounded-3xl shadow-lg">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            {...pa(usingUrl ? 'imageUrl' : 'image')}
            src={imageSrc}
            alt={content.imageAlt ?? content.name ?? ''}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        ) : null}
      </div>
      <div className="flex-grow">
        <div className="mb-2 flex items-start justify-between">
          <h3 {...pa('name')} className="text-2xl font-bold text-[#00205C]">
            {content.name}
          </h3>
          {content.rating ? (
            <div className="flex items-center gap-1.5 rounded-lg bg-yellow-50 px-3 py-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-black text-[#00205C]">{content.rating}</span>
            </div>
          ) : null}
        </div>
        {content.specialty ? (
          <p {...pa('specialty')} className="mb-4 text-[10px] font-black uppercase tracking-widest text-blue-600">
            {content.specialty}
          </p>
        ) : null}
        {description ? <p className="mb-6 text-sm font-medium text-slate-500">{description}</p> : null}
        <div className="flex gap-4">
          <a
            {...pa('profileLink')}
            href={profileHref}
            className="rounded-full bg-slate-50 px-6 py-2.5 text-xs font-bold uppercase tracking-tighter text-[#00205C] transition-colors hover:bg-[#FFD100]"
          >
            {content.profileLink?.text || 'Profile'}
          </a>
          <a
            {...pa('bookLink')}
            href={bookHref}
            className="flex-grow rounded-full border-2 border-[#00205C] px-6 py-2.5 text-center text-xs font-bold uppercase tracking-widest text-[#00205C] transition-all hover:bg-[#00205C] hover:text-white"
          >
            {content.bookLink?.text || 'Book Online'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function FeaturedDoctors({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const dirHref = edit ? undefined : content.directoryLink?.url?.default ?? undefined;

  const doctors = await expandReferences<DoctorContent>(
    content.doctors as unknown as { key?: string | null }[],
    previewContextOf(content),
  );

  return (
    <section {...pa(block)} className="bg-[#f8fafc] py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex items-end justify-between border-b-2 border-gray-200 pb-8">
          {content.heading ? (
            <h2 {...pa('heading')} className="font-serif text-4xl font-bold text-[#00205C]">
              {content.heading}
            </h2>
          ) : null}
          <a
            {...pa('directoryLink')}
            href={dirHref}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00205C] hover:underline"
          >
            {content.directoryLabel || 'View Full Directory'} <ChevronRight size={14} />
          </a>
        </div>

        <div {...pa('doctors')} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {doctors.map((doc, i) => (
            <Doctor key={i} content={doc} />
          ))}
        </div>
      </div>
    </section>
  );
}
